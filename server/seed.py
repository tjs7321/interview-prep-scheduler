#!/usr/bin/env python3

from random import randint, choice as rc

from faker import Faker

from app import app
from models import db, PrepSession, User, PrepSessionUser

fake = Faker()

with app.app_context():

    print("Deleting all records...")
    PrepSession.query.delete()
    User.query.delete()
    PrepSessionUser.query.delete()

    fake = Faker()

    print("Creating users...")

    # make sure users have unique usernames
    users = []
    usernames = []

    for i in range(30):
        
        username = fake.name()
        while username in usernames:
            username = fake.name()
        usernames.append(username)

        user = User(
            username=username,
            email=fake.email(),
        )

        user.password_hash = user.username + 'password'

        users.append(user)

    db.session.add_all(users)

    print("Creating PrepSessions...")
    prep_sessions = []
    for i in range(300):
        description = fake.paragraph(nb_sentences=8)
        start = fake.future_datetime()
        end = fake.future_datetime()
        
        prep_session = PrepSession(
            title=fake.sentence(),
            description=description,
            start_time=start,
            end_time=end,
        )

        prep_sessions.append(prep_session)

    db.session.add_all(prep_sessions)
    
    print("Adding users to sessions...")
    prep_session_users = []
    for session in prep_sessions:
        user = rc(users)
        prep_session_users.append(
            PrepSessionUser(
                user=user,
                prep_session=session
            )
        )
    
    db.session.add_all(prep_session_users)

    db.session.commit()
    
    print("Complete.")
