import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Grid, Paper } from "@mui/material";

const LoginForm = ({ setToken }) => {
  const navigate = useNavigate();

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log("Could not login");
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("booklibrary-user-token", token);
      navigate("/");
    }
  }, [result.data]); // eslint-disable-line

  const submit = async (e) => {
    e.preventDefault();

    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    console.log(username, password);
    login({ variables: { username, password } });
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="h5" align="center">
            Login
          </Typography>
          <form onSubmit={submit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Username"
                  fullWidth
                  name="username"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  name="password"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
