from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates

from config import db



class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    # password
    email = db.Column(db.String, unique=True)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    @classmethod
    def find_by_id(cls,id):
        return cls.query.filter_by(id=id)

    def to_dict(self):
        return {
            'id':self.id,
            'username':self.username,
            'email': self.email  # password, also created_at maybe for page stats?
        }

    @validates('username')
    def validate_username(self, key, username):
        if not (8 <= len(username) <= 20):
            raise ValueError("Username must be between 8 and 20 characters")
        elif User.query.filter_by(username=username).first():
            raise ValueError("Username is already taken")
        else:
            return username
        
    @validates('email')
    def validate_email(self,key,email):
        if User.query.filter_by(email=email):
            raise ValueError("A user with this email address already exists")
        else:
            return email
            ##  Any other validations? I think email regex validation is unnecessary/doesn't prevent typos    
    

class Follow(db.Model):
    __tablename__ = 'follows'

    id = db.Column(db.Integer, primary_key=True)
    follower_id = db.Column(db.Integer)
    user_followed_id = db.Column(db.Integer)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    @validates('follower_id', 'user_followed_id')
    def validate_follower(self,key,user_id):
        if User.find_by_id(user_id):
            return user_id
        else:
            raise ValueError("Not a valid user")
        

class Session(db.model):
    __tablename__ = 'sessions'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description = db.Column(db.String)
    all_day = db.Column(db.Boolean)
    time = db.Column(db.DateTime)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    @classmethod
    def find_by_id(cls,id):
        return cls.query.filter_by(id=id)


class SessionUser(db.Model):
    __tablename__='session_users'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    session_id = db.Column(db.Integer, db.ForeignKey('sessions.id'))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())


    @validates('user_id')
    def validate_follower(self,key,user_id):
        if User.find_by_id(user_id):
            return user_id
        else:
            raise ValueError("Not a valid user")
        
    @validates('session_id')
    def validate_follower(self,key,session_id):
        if Session.find_by_id(session_id):
            return session_id
        else:
            raise ValueError("Not a valid session")
        
    
    