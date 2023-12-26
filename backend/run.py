from application import app
import os



if __name__ == "__main__":
    port = port = int(os.environ.get("PORT", 3001))
    app.run(host="0.0.0.0", debug=True, port=port)
