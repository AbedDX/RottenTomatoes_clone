import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "semantic-ui-react";
import Searchbar from "./Searchbar";
import MovieForm from "./MovieForm";
import Login from "./Login";
import "./Style.css";

const Navbar = ({ isLoggedIn, user, logout }) => {
  const [isMovieFormOpen, setIsMovieFormOpen] = useState(false);
  const [isLoginPageOpen, setIsLoginPageOpen] = useState(false);

  const openMovieForm = () => {
    setIsMovieFormOpen(true);
  };

  const closeMovieForm = () => {
    setIsMovieFormOpen(false);
  };

  const openLoginPage = () => {
    setIsLoginPageOpen(true);
  };

  const closeLoginPage = () => {
    setIsLoginPageOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <h1 className="navbar-brand" style={{ marginLeft: 10 }} size="30">
        Rotten Tomatoes
      </h1>

      <div className="navbar-buttons ml-auto" style={{ display: "flex", alignItems: "center",  position: "absolute", top: 50  , right: 600}}>
        <Searchbar />


        {!isLoggedIn ? (
          <Button primary onClick={openLoginPage} style={{position: "absolute", top: 5, left: 650 }} >
            Login/Signup
          </Button>
        ) : (
          <Button secondary onClick={logout}>
            Logout
          </Button>
        )}
      </div>

      {/* MovieForm Modal */}
      <Modal open={isMovieFormOpen} onClose={closeMovieForm} size="small">
        <Modal.Header>Add a New Movie</Modal.Header>
        <Modal.Content>
          <MovieForm onClose={closeMovieForm} />
        </Modal.Content>
      </Modal>

      {/* LoginPage Modal */}
      <Modal open={isLoginPageOpen} onClose={closeLoginPage} size="small" background style={{ background: "rgba(255, 255, 255, 0.0)" }} >
        <Modal.Header>Login/Signup</Modal.Header>
        <Modal.Content background style={{ background: "rgba(255, 255, 255, 0.0)"}} >
          <Login />
        </Modal.Content>
      </Modal>
    </nav>
  );
};

export default Navbar;
