from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():

    admin = User(
        is_admin = True, 
        username='admin', 
        first_name="Andrew",
        last_name="Bennett", 
        email='camera@aa.io', 
        password='password')
    user1 = User(
        is_admin = False, 
        username='user1', 
        first_name="John",
        last_name="Bennett", 
        email='camera1@aa.io', 
        password='password')
    user2 = User(
        is_admin = False, 
        username='user2', 
        first_name="Matthew",
        last_name="Bennett", 
        email='camera2@aa.io', 
        password='password')
    user3 = User(
        is_admin = False, 
        username='user3', 
        first_name="Micah",
        last_name="Bennett", 
        email='camera3@aa.io', 
        password='password')
    

    db.session.add(admin)
    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
