from application import mongodb
from flask_bcrypt import Bcrypt , check_password_hash
from bson import ObjectId
from datetime import datetime

bcrypt = Bcrypt()

class User:
    def __init__(self, username, password):
        self.username = username
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')
        self.created_at = datetime.utcnow()

    def save(self):
        user_data = {
            "username": self.username,
            "password": self.password,
            "created_at": self.created_at,
        }
        try:
            result = mongodb.db.users.insert_one(user_data)
        except Exception as e:
            # Handle the exception (e.g., log the error)
            print(f"Error saving user: {e}")

    @staticmethod
    def find_by_username(username):
        user_data = mongodb.db.users.find_one({'username': username})
        if user_data:
            return User(user_data['username'], user_data['password'])
        return None

    def check_password(self, password):
        return check_password_hash(self.password, password)
