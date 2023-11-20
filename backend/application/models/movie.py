from application import mongodb
from cloudinary.uploader import upload
from bson import ObjectId
from datetime import datetime

class Movie:
    def __init__(self, title, description, genre, release_date, rating, youtube_link, cloudinary_url=None, image_file=None):
        self.title = title
        self.description = description
        self.genre = genre
        self.release_date = release_date
        self.rating = rating
        self.youtube_link = youtube_link
        self.cloudinary_url = cloudinary_url
        self.image_file = image_file
        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()

    def save(self):
        movie_data = {
            "title": self.title,
            "description": self.description,
            "genre": self.genre,
            "release_date": self.release_date,
            "rating": self.rating,
            "youtube_link": self.youtube_link,
            "cloudinary_url": self.cloudinary_url,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

        if self.image_file:
            cloudinary_response = upload(self.image_file)
            cloudinary_url = cloudinary_response['secure_url']
            movie_data['cloudinary_url'] = cloudinary_url

        result = mongodb.db.movies.insert_one(movie_data)

        return str(result.inserted_id)


    @staticmethod
    def get_all_movies():
        movies = list(mongodb.db.movies.find({}, {"_id": 1, "title": 1, "rating": 1, "youtube_link": 1, "cloudinary_url": 1}))
        return movies

    @staticmethod
    def get_movie_by_id(movie_id):
        movie = mongodb.db.movies.find_one({"_id": ObjectId(movie_id)})
        return movie

    def update(self, movie_id):
        updated_data = {
            "title": self.title,
            "description": self.description,
            "genre": self.genre,
            "release_date": self.release_date,
            "rating": self.rating,
            "youtube_link": self.youtube_link,
            "cloudinary_url": self.cloudinary_url,  # Added 'cloudinary_url' here
            "updated_at": datetime.utcnow()
        }
        mongodb.db.movies.update_one({"_id": ObjectId(movie_id)}, {"$set": updated_data})

    @staticmethod
    def delete(movie_id):
        result = mongodb.db.movies.delete_one({"_id": ObjectId(movie_id)})
        return result

    def to_dict(self):
        return {
            "title": self.title,
            "description": self.description,
            "genre": self.genre,
            "release_date": self.release_date,
            "rating": self.rating,
            "youtube_link": self.youtube_link,
            "cloudinary_url": self.cloudinary_url,  # Added 'cloudinary_url' here
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
