# Rotten Tomatoes clone Movie Database🍅

Rotten Tomatoes Movie Database is a web application that allows users to browse and manage a collection of movies. The app fetches information, rating, description, and youtube embed link from MongoDB.
Movie images are fetched from Cloudinary where cloudinary Url will be store in mongodb. The project is a work in progress, and its current features include:

- Browse a collection of movies
- View movie details, including title, description, genre, release date, and rating
- Add new movies to the database (work in progress)
- User authentication for login and signup (work in progress)

###Future Improvements 💻🤘🚀
This project is an ongoing endeavor, and there are several areas for improvement:

- Complete user authentication for login and signup.
- UI style improvement
- Docker contenarize
- Further understanding the fullstack concepts

## Demo🍅

![ezgif com-gif-maker](https://github.com/AbedDX/RottenTomatoes_clone/assets/123561100/1a44dae1-ef76-47f5-92aa-693abd609439)

## Prerequisites🍅💻🤘

#### Backend (Flask)

- [Flask](https://flask.palletsprojects.com/) Flask: A micro web framework for Python.
- [Flask-CORS](https://flask-cors.readthedocs.io/) Flask-CORS: Extension for handling Cross-Origin Resource Sharing.
- [Flask-PyMongo](https://flask-pymongo.readthedocs.io/) Flask-PyMongo: PyMongo integration with Flask.
- [python-dotenv](https://pypi.org/project/python-dotenv/) Load environment variables from a .env file.
- [Cloudinary](https://cloudinary.com/) Cloud storage for images.

#### Frontend (React and Semantic UI)

- [react](https://www.npmjs.com/package/react) JavaScript library for building user interfaces.
- [react-router-dom](https://www.npmjs.com/package/react-router-dom) React Router is a lightweight, fully-featured routing library for the React JavaScript library. 
- [semantic-ui](https://www.npmjs.com/package/semantic-ui) A UI framework for designing responsive and beautiful components.
- [semantic-ui-css](https://www.npmjs.com/package/semantic-ui-css)


### How to Start Backend🚀

1. Navigate to the `backend` directory.

2. Install the required dependencies:

    ```bash
    pip install -r requirements.txt
    ```

3. Set up environment variables by creating a `.env` file in the `backend` directory. Example:

    ```
    FLASK_APP=run.py
    FLASK_ENV=development
    SECRET_KEY=your_secret_key
    MONGO_URI=your_mongodb_uri
    CLOUDINARY_NAME=your_cloudinary_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

4. Run the Flask application:

    ```bash
    flask run
    ```

### Frontend

1. Navigate to the `frontend` directory.

2. Install the required dependencies:

    ```bash
    npm install react react-dom react-router-dom semantic-ui-react semantic-ui-css
    ```

3. Start the React application:

    ```bash
    npm start
    ```

4. Visit [http://localhost:3000](http://localhost:3000) in your web browser to explore the movie collection and use the application.

By following these steps, you should have both the backend and frontend running locally. Adjust the configuration files and environment variables according to your specific setup.

## Screenshots🍅

![App Screenshot](https://imgur.com/efNFWMK.jpg)
![App Screenshot](https://imgur.com/GqBnI04.jpg)
![App Screenshot](https://imgur.com/LL1iFGl.jpg)
![App Screenshot](https://imgur.com/ueCZSoQ.jpg)

##Learning Journey💻🤘🚀
This project is based on what I've learned from Opiframe Fullstack 2023, a comprehensive learning program. The knowledge gained includes practical experiences from building a Learning101Python Flask web server and hands-on learning with the Learning101 React shoppingAPP. The project also involves the application of JavaScript and HTML for frontend development.

The journey includes understanding the intricacies of building a full-stack web application, integrating backend technologies like Flask for a robust server and database setup, and utilizing frontend frameworks like React for creating interactive and responsive user interfaces.

Feel free to explore the movie collection and contribute to the project. Any suggestions or contributions are welcome!


