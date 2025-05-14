from flask import Blueprint, jsonify, render_template, redirect, url_for, abort, request
from flask_login import login_required, current_user
from app.models import User, Photo
from app import db

user_routes = Blueprint('users', __name__)

@user_routes.route('/')
@login_required
def get_users():
    if not current_user.is_admin:  # Ensure the user is an admin
        return {'errors': {'message': 'Unauthorized'}}, 401
    
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get_or_404(id)
    return user.to_dict()

@user_routes.route('/photos/batch', methods=['POST'])
@login_required
def add_photo_with_user():
    url = request.json.get('url')
    new_photo = Photo(url=url, user_id=current_user.id)
    db.session.add(new_photo)
    db.session.commit()
    return new_photo.to_dict()

@user_routes.route('/photos/<int:photo_id>', methods=['DELETE'])
@login_required
def delete_photo_by_user(photo_id):
    photo = Photo.query.get(photo_id)

    if not photo:
        return {"error": "Photo not found"}, 404

    if photo.user_id != current_user.id:
        return {"error": "Unauthorized to delete this photo"}, 403

    db.session.delete(photo)
    db.session.commit()
    return {"message": "Photo deleted successfully"}, 200


@user_routes.route('/<int:user_id>', methods=['DELETE'])
@login_required
def delete_user(user_id):
    if not current_user.is_admin:
        return jsonify({"error": "Unauthorized"}), 403

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    if user.id == current_user.id:
        return jsonify({"error": "Admins cannot delete themselves"}), 400

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": f"User {user.username} deleted"}), 200