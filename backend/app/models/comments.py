from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import User
from .photos import Photo


class Comment(db.Model):
    __tablename__ = 'comments'
    
    
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    photo_id = db.Column(db.Integer, db.ForeignKey('photos.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    
    photo = db.relationship('Photo', back_populates='comments')
    user = db.relationship('User', back_populates='comments')

