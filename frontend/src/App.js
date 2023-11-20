import React, { useEffect, useState } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import MovieForm from "./components/MovieForm";
import { Container, Button } from "semantic-ui-react";
import Navbar from "./components/Navbar";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("/movies").then(response =>
      response.json().then(data => {
        setMovies(data.movies);
      })
    );
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
      <Navbar/>
    <Container style={{ marginTop: "20px" }} tyle={{marginLeft: "10px" }}>
    <Button primary onClick={openModal}>
        Open Movie Form
      </Button>
      <br/>
      <MovieForm open={isModalOpen} onClose={closeModal} />
      <br/>
      <Movies movies={movies} />

    </Container>
    </div>
  );
}

export default App;
