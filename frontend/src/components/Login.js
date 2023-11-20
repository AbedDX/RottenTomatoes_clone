import React, { useState } from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleLogin = async () => {
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Successful login
        const data = await response.json();
        onLogin(data.message); // Pass any relevant login information
      } else {
        // Handle login error
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      console.error("An error occurred during login", error);
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Log-in to your account
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button color="teal" fluid size="large" onClick={handleLogin}>
              Login
            </Button>
          </Segment>
        </Form>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </Grid.Column>
    </Grid>
  );
};

export default Login;
