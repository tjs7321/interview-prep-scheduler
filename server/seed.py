#!/usr/bin/env python3

from random import randint, choice as rc

from faker import Faker

from app import app
from models import db, User, PrepSession, PrepSessionUser
fake = Faker()

with app.app_context():

    print("Deleting all records...")
    PrepSession.query.delete()
    User.query.delete()
    PrepSessionUser.query.delete()


    print("Creating users...")

    # make sure users have unique usernames
    users = []
    usernames = []

    for i in range(20):
        
        username = fake.android_platform_token()
        while username in usernames:
            username = fake.android_platform_token()
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
    for i in range(100):
        description = fake.paragraph(nb_sentences=8)
        start = fake.future_datetime()
        end = fake.future_datetime()
        
        prep_session = PrepSession(
            title=fake.sentence(),
            description=description,
            start_time=start,
            end_time=end,
        )

        prep_session.user = rc(users)

        prep_sessions.append(prep_session)

    db.session.add_all(prep_sessions)
    
    db.session.commit()
    print("Complete.")

