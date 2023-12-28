from flask import Blueprint, request, jsonify
from application.models.movie import Movie
from cloudinary.uploader import upload


movies_api = Blueprint("movies", __name__)

# Add a new movie
@movies_api.route("/api/movies", methods=["POST"])
def add_movie():
    data = request.json
    title = data.get("title")
    description = data.get("description")
    genre = data.get("genre")
    release_date = data.get("release_date")
    rating = data.get("rating")
    youtube_link = data.get("youtube_link")
    cloudinary_url = data.get("cloudinary_url")

    if not title or not rating:
        return jsonify({"error": "Missing data"}), 400

    new_movie = Movie(title, description, genre, release_date, rating, youtube_link, cloudinary_url)
    inserted_id = new_movie.save()

    return jsonify({"message": "Movie added successfully", "movie_id": inserted_id}), 201

# List all movies
@movies_api.route("/api/movies", methods=["GET"])
def list_movies():
    movies = Movie.get_all_movies()
    movie_list = []

    for movie in movies:
        movie_list.append({
            "_id": str(movie["_id"]),
            "title": movie["title"],
            "rating": movie["rating"],
            "youtube": movie["youtube_link"],
            "cloudinary_url": movie["cloudinary_url"]
        })

    return jsonify({"movies": movie_list})

# Delete a movie by its ID
@movies_api.route("/api/movies/<string:movies_id>", methods=["DELETE"])
def delete_movie(movies_id):
    result = Movie.delete(movies_id)
    
    if result.deleted_count == 0:
        return jsonify({"error": "Movie not found"}), 404

    return jsonify({"message": "Movie deleted successfully"})

# Update an existing movie by its ID
@movies_api.route("/api/movies/<string:movies_id>", methods=["PUT"])
def update_movie(movies_id):
    data = request.json
    title = data.get("title")
    description = data.get("description")
    genre = data.get("genre")
    release_date = data.get("release_date")
    rating = data.get("rating")
    youtube_link = data.get("youtube_link")
    cloudinary_url = data.get("cloudinary_url")

    if not title or not rating:
        return jsonify({"error": "Missing data"}), 400

    movie = Movie.get_by_id(movies_id)

    if not movie:
        return jsonify({"error": "Movie not found"}), 404

    movie.title = title
    movie.description = description
    movie.genre = genre
    movie.release_date = release_date
    movie.rating = rating
    movie.youtube_link = youtube_link
    movie.cloudinary_url= cloudinary_url

    movie.save()

    return jsonify({"message": "Movie updated successfully"}, 200)

# New route to fetch YouTube links for movies
@movies_api.route("/api/movies/<string:movies_id>/youtube_link", methods=["GET"])
def get_movie_youtube_link(movies_id):
    movie = Movie.get_movie_by_id(movies_id)
    print(movies_id)

    if not movie:
        return jsonify({"error": "Movie not found"}), 404

    youtube_link = movie["youtube_link"]

    return jsonify({"youtube_link": youtube_link})

# Endpoint to handle Cloudinary upload
# ... (other imports and configurations)

@movies_api.route("/upload", methods=["POST"])
def upload_image():
    try:
        # Check if the request contains a file
        if "file" not in request.files:
            return jsonify({"error": "No file provided"}), 400

        file = request.files["file"]

        # If the user does not select a file, the browser submits an empty file without a filename
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400

        folder = "movie_img/"  # Specify the folder name
        # Upload the file to Cloudinary with the specified folder
        upload_result = upload(file, folder=folder)

        # Check if the upload was successful
        if "secure_url" not in upload_result:
            return jsonify({"error": "Failed to upload image"}), 500

        # Return the Cloudinary URL
        return jsonify({"cloudinary_url": upload_result["secure_url"]})

    except Exception as e:
        # Handle any other exceptions that might occur during the upload
        return jsonify({"error": str(e)}), 500
