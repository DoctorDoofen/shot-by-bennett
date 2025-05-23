from flask_wtf import FlaskForm
from wtforms import TextAreaField, SubmitField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    text = TextAreaField('Your Comment', validators=[DataRequired()])
    submit = SubmitField('Post Comment')