#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session

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
            print(type(datetime.date.fromisoformat(data['startTime'])))
            new_prep_session = PrepSession(
                title=data['title'],
                description=data['description'],
                start_time=datetime.fromisoformat(data['startTime']),
                end_time=datetime.fromisoformat(data['endTime'])
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
        else:
            return make_response(
                {'message': 'Must be logged in'},
                401
            )


api.add_resource(PrepSessions, '/prep_sessions')


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
    
class CheckSession(Resource):
    
    def get(self):
        if session.get('user_id'):
            user = User.query.filter(User.id == session['user_id']).first()
            return user.to_dict(), 200
        return {'error': '401 Unauthorized'}, 401

api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(Login, '/login', endpoint='login')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

