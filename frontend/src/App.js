import React, { useEffect, useState } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import MovieForm from "./components/MovieForm";
import { Container, Button } from "semantic-ui-react";
import Navbar from "./components/Navbar";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Determine the base URL based on the environment
        const baseUrl =
          process.env.NODE_ENV === "development"
            ? "http://localhost:3001/api"
            : "/api";

        const response = await fetch(`${baseUrl}/movies`);
        const data = await response.json();
        setMovies(data.movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Navbar />
      <Container style={{ marginTop: "20px", marginLeft: "10px" }}>
        <Button primary onClick={openModal}>
          Open Movie Form
        </Button>
        <br />
        <MovieForm open={isModalOpen} onClose={closeModal} />
        <br />
        <Movies movies={movies} />
      </Container>
    </div>
  );
}

export default App;
