from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
from dotenv import load_dotenv
from flask_bcrypt import Bcrypt  # Import the Bcrypt class

import cloudinary
import os

app = Flask(__name__)

load_dotenv()

# Initialize MongoDB
MONGO_URI = os.getenv("MONGO_URI")
SECRET_KEY = os.getenv("SECRET_KEY")
app.config["MONGO_URI"] = MONGO_URI
app.config["SECRET_KEY"] = SECRET_KEY 

# Initialize Cloudinary
CLOUD_NAME = os.getenv("CLOUD_NAME")
CLOUD_API_KEY = os.getenv("CLOUD_API_KEY")
CLOUD_API_SECRET = os.getenv("CLOUD_API_SECRET")

# Check if Cloudinary configuration is set
if not all([CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET]):
    print("Cloudinary configuration is missing. Please check your environment variables.")
else:
    # Configure Cloudinary
    cloudinary.config(
        cloud_name=CLOUD_NAME,
        api_key=CLOUD_API_KEY,
        api_secret=CLOUD_API_SECRET,
    )
    print("Cloudinary configuration successful.")

# Initialize Bcrypt
bcrypt = Bcrypt(app)

# Initialize CORS
CORS(app)

# Setup MongoDB
mongodb = PyMongo(app)

# Create a connection checker function
def check_mongo_connection():
    try:
        # Attempt to establish a connection
        mongodb.cx.server_info()
        return True
    except Exception as e:
        print(f"MongoDB connection error: {e}")
        return False

# Check the MongoDB connection
if check_mongo_connection():
    print("MongoDB connection successful.")
else:
    print("MongoDB connection failed. Please check your configuration.")

# Import and register your blueprints
from application.routes import movie_route
from application.routes import user_route

app.register_blueprint(movie_route.movies_api)
app.register_blueprint(user_route.user_api)