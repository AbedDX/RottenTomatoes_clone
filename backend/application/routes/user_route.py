from flask import Blueprint, request, jsonify, session
from application.models.user import User

user_api = Blueprint('user', __name__)

@user_api.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    existing_user = User.find_by_username(username)
    if existing_user:
        return jsonify({'error': 'Username already exists'}), 409

    new_user = User(username, password)
    new_user.save()

    return jsonify({'message': 'Registration successful'}), 201

@user_api.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    user = User.find_by_username(username)
    if not user or not user.check_password(password):
        return jsonify({'error': 'Invalid username or password'}), 401

    # For simplicity, you might want to use Flask-Login for session management
    session['user_id'] = str(user.get_id())

    return jsonify({'message': 'Login successful'}), 200

@user_api.route('/logout')
def logout():
    # For simplicity, this clears the user_id from the session
    session.pop('user_id', None)
    return jsonify({'message': 'Logout successful'}), 200