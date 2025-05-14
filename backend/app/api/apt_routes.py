from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app import db
from app.models import Appointment
from datetime import datetime

apt_routes = Blueprint('appointments', __name__)

@apt_routes.route('/new', methods=['POST'])
@login_required
def book_appointment():
    data = request.get_json()

    try:
        appointment_date = datetime.strptime(data['date'], "%Y-%m-%d").date()
        appointment_time = datetime.strptime(data['time'], "%H:%M").time()
    except (KeyError, ValueError):
        return jsonify({"error": "Invalid date or time format"}), 400

    new_appointment = Appointment(
        user_id=current_user.id,
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        date=appointment_date,
        time=appointment_time,
        message=data.get('message', '')
    )

    db.session.add(new_appointment)
    db.session.commit()

    return jsonify(new_appointment.to_dict()), 201


@apt_routes.route('/my_appointments', methods=['GET'])
@login_required
def get_user_appointments():
    appointments = Appointment.query.filter_by(user_id=current_user.id).all()
    return jsonify({
        "appointments": [appointment.to_dict() for appointment in appointments]
    }), 200


@apt_routes.route('/my_appointments/<int:appointment_id>', methods=['DELETE'])
@login_required
def delete_appointment(appointment_id):
    appointment = Appointment.query.get(appointment_id)

    if not appointment or appointment.user_id != current_user.id:
        return jsonify({"error": "Appointment not found"}), 404

    db.session.delete(appointment)
    db.session.commit()

    return jsonify({"message": "Appointment deleted successfully"}), 200



@apt_routes.route('/my_appointments/<int:appointment_id>', methods=['PUT'])
@login_required
def update_appointment(appointment_id):
    data = request.get_json()
    appointment = Appointment.query.get(appointment_id)

    if not appointment or appointment.user_id != current_user.id:
        return jsonify({"error": "Appointment not found"}), 404

    try:
        appointment_date = datetime.strptime(data['date'], "%Y-%m-%d").date()
        appointment_time = datetime.strptime(data['time'], "%H:%M").time()
    except (KeyError, ValueError):
        return jsonify({"error": "Invalid date or time format"}), 400

    appointment.first_name = data['first_name']
    appointment.last_name = data['last_name']
    appointment.email = data['email']
    appointment.date = appointment_date
    appointment.time = appointment_time
    appointment.message = data.get('message', '')

    db.session.commit()

    return jsonify(appointment.to_dict()), 200