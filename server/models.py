from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

follow = db.Table(
    'follow',
    db.Column('following_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('follower_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('created_at', db.DateTime, server_default=db.func.now()),
    db.Column('updated_at', db.DateTime, onupdate=db.func.now())
)


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String)
    email = db.Column(db.String, unique=True)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    prep_session_users = db.relationship('PrepSessionUser', backref='user', cascade='all, delete-orphan')
    prep_sessions = association_proxy('prep_session_users','prep_session')

    
    followers = db.relationship('User', 
                                secondary = follow, 
                                primaryjoin = (follow.c.following_id == id),
                                secondaryjoin = (follow.c.follower_id == id),
                                backref = 'following'
                                )
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    def __repr__(self):
        return f'<User {self.username}>'

    @classmethod
    def find_by_id(cls,id):
        return cls.query.filter_by(id=id).first()

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
        if User.query.filter_by(email=email).first():
            raise ValueError("A user with this email address already exists")
        else:
            return email
            ##  Any other validations? I think email regex validation is unnecessary/doesn't prevent typos    
    
class PrepSession(db.Model):
    __tablename__ = 'prep_sessions'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description = db.Column(db.String)
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    prep_session_users = db.relationship('PrepSessionUser', backref='prep_session', cascade='all, delete-orphan')
    users = association_proxy('prep_session_users', 'user')

    @classmethod
    def find_by_id(cls,id):
        return cls.query.filter_by(id=id)

    def __repr__(self):
        return f'< Session {self.title} from {self.start_time} to {self.end_time} >'
    ##  Add validator for end-time > start-time

    def to_dict(self):
        return {
            'id':self.id,
            'title':self.title,
            # 'description':self.description,
            'start':self.start_time.isoformat(),
            'end':self.end_time.isoformat()
        }

class PrepSessionUser(db.Model):
    __tablename__='prep_session_users'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    session_id = db.Column(db.Integer, db.ForeignKey('prep_sessions.id'))

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())


    @validates('user_id')
    def validate_follower(self,key,user_id):
        if User.find_by_id(user_id):
            return user_id
        else:
            raise ValueError("Not a valid user")
        
    @validates('session_id')
    def validate_follower(self,key,prep_session_id):
        if PrepSession.find_by_id(prep_session_id):
            return prep_session_id
        else:
            raise ValueError("Not a valid session")
        
    
    