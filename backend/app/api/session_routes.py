from flask import Blueprint
from flask_login import login_required, current_user
from app.models import Photo as Images

session_routes = Blueprint('sessions', __name__)

@session_routes.route("/images")
@login_required
def get_current_images():
    """
    Get current user's images
    """
    images = Images.query.filter_by(user_id=current_user.id).all()

    # Convert images to dictionaries
    return {"images": [img.to_dict() for img in images]}, 200
