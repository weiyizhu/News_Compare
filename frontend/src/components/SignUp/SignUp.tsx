import React, { createRef, useRef, useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  Grid,
  Link,
  TextFieldProps,
} from "@material-ui/core";
import { Link as RouterLink, useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../state";
import { Status } from "../../state/action-types/statusActionTypes";

export const isValidEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const url = process.env.REACT_APP_PORT || process.env.REACT_APP_EXPRESS_PORT;
const SignUp = () => {
  const email = useRef<TextFieldProps>();
  const password = useRef<TextFieldProps>();
  const confirmPassword = useRef<TextFieldProps>();
  const history = useHistory();

  const dispatch = useDispatch();
  const signUp = async () => {
    if (email.current && password.current && confirmPassword.current) {
      let errorMsg = "";
      if (!isValidEmail(String(email.current.value))) {
        errorMsg = "Invalid email";
      } else if (password.current.value !== confirmPassword.current.value) {
        errorMsg = "Password and confirm password do not match";
      } else if (String(password.current.value).length <= 6) {
        errorMsg = "Password cannot be less than 6 characters";
      }
      if (errorMsg !== "") {
        dispatch(actionCreators.updateStatus(Status.ERROR, errorMsg));
      } else {
        console.log(url + "/users/signup");
        const res = await axios
          .post(url + "/users/signup", {
            email: email.current.value,
            password: password.current.value,
          })
          .catch((err) => {
            console.log(err.message);
            dispatch(actionCreators.updateStatus(Status.ERROR, err.message));
          });
        if (res) {
          dispatch(
            actionCreators.updateStatus(Status.SUCCESS, "Sign up successful!")
          );
          history.push("/login");
        }
      }
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: "4em" }}>
      <Grid container direction="column" alignItems="center">
        <Typography variant="h4" paragraph>
          Sign Up
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          inputRef={email}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password"
          name="password"
          autoComplete="current-password"
          type="password"
          inputRef={password}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Confirm Password"
          name="password"
          autoComplete="current-password"
          type="password"
          inputRef={confirmPassword}
        />
        <Button
          fullWidth
          variant="contained"
          type="submit"
          color="primary"
          style={{ margin: "1em 0em 1em" }}
          onClick={signUp}
        >
          Sign Up
        </Button>
        <Grid container>
          <Grid item xs></Grid>
          <Grid item>
            <Typography color="textSecondary" variant="body2">
              Already have an account?{" "}
              <Link variant="body2">
                <RouterLink to="/login">{"Login"}</RouterLink>
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignUp;
