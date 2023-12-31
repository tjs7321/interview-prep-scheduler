#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from sqlalchemy import text
from flask_restful import Resource
from datetime import datetime

# Local imports
from config import app, db, api
# Add your model imports
from models import User, follow, PrepSession, PrepSessionUser

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class PrepSessions(Resource):
    def get(self):
        if (user_id := session.get('user_id')):
            user = User.find_by_id(user_id)
            response = [prep_session.to_dict() 
                        for prep_session in user.prep_sessions]
            return make_response(
                response, 
                200
            )
        else:
            return make_response(
                {'message': 'Must be logged in'},
                401
            )
        
    def post(self):
        if (user_id := session.get('user_id')):
            data = request.get_json()
            try:
                new_prep_session = PrepSession(
                    title=data['title'],
                    description=data['description'],
                    start=datetime.fromisoformat(data['start']),
                    end=datetime.fromisoformat(data['end'])
                )
                db.session.add(new_prep_session)
                db.session.commit()
                new_prep_session_user = PrepSessionUser(
                    user_id=user_id,
                    session_id=new_prep_session.id
                )
                db.session.add(new_prep_session_user)
                db.session.commit()                          ### Add validations?
                
                return make_response(
                    new_prep_session.to_dict(), 
                    201
                )
            except ValueError as e:
                return {'error':str(e)}, 422
        else:
            return make_response(
                {'message': 'Must be logged in'},
                401
            )

class PrepSessionByID(Resource):
    def get(self,id):
        if (prep_session:= PrepSession.find_by_id(id)):
            return prep_session.to_dict_full(), 200
        else:
            return {'error':'Resource not found'}, 404

    def patch(self,id):
        if (prep_session:= PrepSession.find_by_id(id)):
            try:
                data=request.get_json()
                prep_session.title = data['title']
                prep_session.description = data['description']
                prep_session.start = datetime.fromisoformat(data['start']) 
                prep_session.end = datetime.fromisoformat(data['end'])
                
                db.session.add(prep_session)
                db.session.commit()
                return prep_session.to_dict(), 202
            except ValueError as e:
                return {'error':str(e)}, 422
        else:
            return {'error':'Resource not found'}, 404

    def delete(self,id):
        if (prep_session:=PrepSession.find_by_id(id)):
            db.session.delete(prep_session)
            db.session.commit()
            return {}, 204
        else:
            return {'error':'Resource not found'}, 404

class Signup(Resource):
    
    def post(self):

        request_json = request.get_json()

        username = request_json.get('username')
        email = request_json.get('email')
        password = request_json.get('password')

        user = User(
            username=username,
            email=email,
        )

        user.password_hash = password

        try:
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id

            return user.to_dict(), 201

        except ValueError:
            
            return {'error': '422 Unprocessable Entity'}, 422

class Login(Resource):
    
    def post(self):

        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')

        user = User.query.filter(User.username == username).first()

        if user:
            if user.authenticate(password):

                session['user_id'] = user.id
                return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401
    
class Logout(Resource):
    
    def delete(self):
        if session.get('user_id'):
            session['user_id'] = None
            return {}, 204
        return {'error': '401 Unauthorized'}, 401
    
class CheckSession(Resource):
    
    def get(self):
        if session.get('user_id'):
            user = User.query.filter(User.id == session['user_id']).first()
            return user.to_dict(), 200
        return {'error': '401 Unauthorized'}, 401
    
class PrepSessionsHomeScreen(Resource):
    def get(self):
        if (user_id := session.get('user_id')):
            user = User.find_by_id(user_id)
            ## OPTION 1 - DIRECT SQL QUERY
            # today = datetime.now() #.split(' ')          ## THIS ISN"T WORKING
            # query = text(f"""
            #                 SELECT prep_sessions.id, prep_sessions.title, prep_sessions.start, prep_sessions.end 
            #                 FROM prep_session_users
            #                 JOIN prep_sessions 
            #                 ON prep_session_users.session_id = prep_sessions.id
            #                 WHERE prep_session_users.user_id = {user_id}
            #                 AND prep_sessions.start >= '{today}'
            #                 LIMIT 10
            #             """)
            # response = db.session.execute(query).all()
            # limited_prep_sessions = []
            # keys = ('id','title','start','end')
            # for prep_session in response:
            #     limited_prep_sessions.append(dict(zip(keys,prep_session)))
            # limited_prep_sessions.sort(key=lambda x: x['start'])
            ### end option 1

            ## OPTION 2 - FETCH ALL, THEN FILTER/SORT
            user_prep_sessions = [prep_session.to_dict() \
                                for prep_session in user.prep_sessions \
                                if prep_session.start >= datetime.now()]
            sorted_prep_sessions = sorted(user_prep_sessions, key=lambda x: x['start'])
            limited_prep_sessions = []
            for prep_session in sorted_prep_sessions:
                if len(limited_prep_sessions) < 10:
                    # print(prep_session)
                    limited_prep_sessions.append(prep_session)
            # ##

            return limited_prep_sessions, 200
        else:
            return {'message': 'Must be logged in'}, 401
        
class PrepSessionUsers(Resource):
    def post(self):
        data = request.get_json()
        try:
            new_prep_session_user = PrepSessionUser(user_id=data['user_id'], session_id=data['session_id'])
            db.session.add(new_prep_session_user)
            db.session.commit()
            return {'message':'success'}, 201
        except ValueError as e:
            return e, 422

class FollowingList(Resource):
    def get(self):
        if (id:=session.get('user_id')):
            user = User.find_by_id(id)
            return [following.to_dict() for following in user.following], 200
        else:
            return {'message': 'Must be logged in'}, 401

class FollowersList(Resource):
    
    def get(self):
        if session.get('user_id'):
            user = User.query.filter(
                User.id == session['user_id']).first()
            return [follower.to_dict() for follower in user.followers], 200
        return {'error': '401 Unauthorized'}, 401
    
    def post(self):
        if session.get('user_id'):
            user = User.query.filter(
                User.id == session['user_id']).first()
            data = request.get_json()
            try:
                id=data['id']
                pot_follow = User.query.filter_by(id=id).first()
                user.followers.append(pot_follow)
                db.session.commit()
                
                return make_response(
                    pot_follow.to_dict(),
                    201
                    )
            except ValueError as e:
                return {'error':str(e)}, 422
        else:
            return make_response(
                {'message': 'Must be logged in'},
                401
            )
    
    def delete(self):
        if session.get('user_id'):
            user = User.query.filter(
                User.id == session['user_id']).first()
            data = request.get_json()
            try:
                id=data['id']
                pot_remove = User.query.filter_by(id=id).first()
                user.followers.remove(pot_remove)
                db.session.commit()
                
                return make_response(
                    pot_remove.to_dict(),
                    201
                    )
            except ValueError as e:
                return {'error':str(e)}, 422
        else:
            return make_response(
                {'message': 'Must be logged in'},
                401
            )
    
class Users(Resource):
    def get(self):
        if (user_id := session.get('user_id')):
            user = User.find_by_id(user_id)
            response = [user.to_dict() 
                        for user in User.query.all()]
            return make_response(
                response, 
                200
            )
        else:
            return make_response(
                {'message': 'Must be logged in'},
                401
            )


api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(PrepSessions, '/prep_sessions', endpoint='prep_sessions')
api.add_resource(PrepSessionByID,'/prep_sessions/<int:id>')
api.add_resource(PrepSessionUsers, '/prep_session_users')
api.add_resource(PrepSessionsHomeScreen, '/prep_sessions_home_screen', endpoint='prep_sessions_home_screen')
api.add_resource(FollowersList, '/followers_list', endpoint='followers_list')
api.add_resource(FollowingList, '/following_list', endpoint='following_list')
api.add_resource(Users, '/users', endpoint='users')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

