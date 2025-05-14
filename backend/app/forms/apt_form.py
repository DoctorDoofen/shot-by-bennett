from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField, DateField, TimeField
from wtforms.validators import DataRequired, Email

class AppointmentForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired(), Length(max=100)])
    last_name = StringField('Last Name', validators=[DataRequired(), Length(max=100)])
    email = StringField('Email', validators=[DataRequired(), Email(), Length(max=100)])
    
    date = DateField('Appointment Date', validators=[DataRequired()], format='%Y-%m-%d')
    time = TimeField('Appointment Time', validators=[DataRequired()], format='%H:%M')
    
    message = TextAreaField('Message (optional)', validators=[Length(max=500)])
    submit = SubmitField('Book Appointment')
