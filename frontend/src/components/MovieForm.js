import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Radio } from "semantic-ui-react";

const MovieForm = ({ open, onClose, movieDetails }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [rating, setRating] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [imageSource, setImageSource] = useState("file"); // 'file' or 'url'
  const [imageUrl, setImageUrl] = useState("");
  const [cloudinaryUrl, setCloudinaryUrl] = useState("");

  useEffect(() => {
    if (movieDetails) {
      setTitle(movieDetails.title || "");
      setDescription(movieDetails.description || "");
      setGenre(movieDetails.genre || "");
      setReleaseDate(movieDetails.release_date || "");
      setRating(movieDetails.rating || "");
      setYoutubeLink(movieDetails.youtube_link || "");
      setCloudinaryUrl(movieDetails.cloudinary_url || "");
      // Check if the movieDetails has a valid cloudinary_url or an image_url property
      if (movieDetails.cloudinary_url) {
        setImageSource("file");
      } else if (movieDetails.image_url) {
        setImageSource("url");
        setImageUrl(movieDetails.image_url);
      }
    } else {
      setTitle("");
      setDescription("");
      setGenre("");
      setReleaseDate("");
      setRating("");
      setYoutubeLink("");
      setSelectedImageFile(null);
      setImageSource("file");
      setImageUrl("");
      setCloudinaryUrl("");
    }
  }, [open, movieDetails]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImageFile(file);
  };

  const handleSubmit = async () => {
    try {
      let finalCloudinaryUrl = cloudinaryUrl;

      // If the user selected 'file', upload the file to Cloudinary
      if (imageSource === "file" && selectedImageFile) {
        const imageData = new FormData();
        imageData.append("file", selectedImageFile);
        const imageResponse = await fetch("/upload", {
          method: "POST",
          body: imageData,
        });

        if (!imageResponse.ok) {
          throw new Error(`Failed to upload image: ${imageResponse.statusText}`);
        }

        const imageResult = await imageResponse.json();
        finalCloudinaryUrl = imageResult.cloudinary_url;
      } else if (imageSource === "url" && imageUrl) {
        // Use the provided URL directly
        finalCloudinaryUrl = imageUrl;
      }

      const movieData = {
        title,
        description,
        genre,
        release_date: releaseDate,
        rating,
        youtube_link: youtubeLink,
        cloudinary_url: finalCloudinaryUrl,
      };

      const apiUrl = movieDetails ? `/api/movies/${movieDetails._id}` : "/api/movies";
      const method = movieDetails ? "PUT" : "POST";

      const response = await fetch(apiUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${movieDetails ? "update" : "add"} movie: ${response.statusText}`);
      }

      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <Modal open={open} onClose={onClose} size="small" background={"white"}style={{backgroundColor: 'white' }}>
      <Modal.Header style={{backgroundColor: 'white' }}>Add a New Movie</Modal.Header>
      <Modal.Content style={{backgroundColor: "white" }}>
        <Form background={"white"}>
          <Form.Input
            label="Title"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Form.TextArea
            label="Description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Form.Input
            label="Genre"
            placeholder="Enter genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <Form.Input
            label="Release Date"
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
          <Form.Input
            label="Rating"
            placeholder="Enter rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <Form.Input
            label="YouTube Link"
            placeholder="Enter YouTube link"
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
          />
          <Form.Field>
            <label>Image Source</label>
            <Radio
              label="File"
              name="imageSource"
              value="file"
              checked={imageSource === "file"}
              onChange={() => setImageSource("file")}
            />
            <Radio
              label="URL"
              name="imageSource"
              value="url"
              checked={imageSource === "url"}
              onChange={() => setImageSource("url")}
            />
          </Form.Field>
          {imageSource === "file" && (
            <Form.Input
              type="file"
              label="Image Banner"
              onChange={handleImageChange}
            />
          )}

          {imageSource === "url" && (
            <Form.Field
              control={Input}
              label="Image URL"
              placeholder="Enter image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          )}
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button primary onClick={handleSubmit}>
          {movieDetails ? "Update" : "Add"} Movie 🍅
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default MovieForm;




