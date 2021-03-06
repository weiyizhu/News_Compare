import { useRef } from "react";
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
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../state";
import { Status } from "../../state/action-types/statusActionTypes";
import React from "react";

export const isValidEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

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
        const res = await axios
          .post("/users/signup", {
            email: email.current.value,
            password: password.current.value,
          })
          .catch((err: AxiosError) => {
            console.log(err.message);
            dispatch(
              actionCreators.updateStatus(Status.ERROR, err.response?.data.msg)
            );
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
