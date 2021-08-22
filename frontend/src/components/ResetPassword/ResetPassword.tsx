import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  TextFieldProps,
} from "@material-ui/core";
import axios from "axios";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useHistory, useParams } from "react-router-dom";
import { actionCreators } from "../../state";
import { Status } from "../../state/action-types/statusActionTypes";

const url = process.env.REACT_APP_PORT || process.env.REACT_APP_EXPRESS_PORT;

interface Params {
  email: string;
  resetToken: string;
}

const ResetPassword = () => {
  const { email, resetToken } = useParams<Params>();
  const password = useRef<TextFieldProps>();
  const confirmPassword = useRef<TextFieldProps>();
  const history = useHistory();

  const dispatch = useDispatch();
  const resetPassword = async () => {
    if (password.current && confirmPassword.current) {
      let errorMsg = "";
      if (password.current.value !== confirmPassword.current.value) {
        errorMsg = "Password and confirm password do not match";
      } else if (String(password.current.value).length <= 6) {
        errorMsg = "Password cannot be less than 6 characters";
      }
      if (errorMsg !== "") {
        dispatch(actionCreators.updateStatus(Status.ERROR, errorMsg));
      } else {
        const res = await axios
          .post(url + "/users/reset", {
            email: email,
            password: password.current.value,
            resetToken: resetToken,
          })
          .catch((err) => {
            console.log(err.message);
            dispatch(actionCreators.updateStatus(Status.ERROR, err.message));
          });
        if (res) {
          dispatch(
            actionCreators.updateStatus(
              Status.SUCCESS,
              "Reset password successful!"
            )
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
          Reset Password
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Email Address"
          value={email}
          disabled
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
          autoFocus
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
          onClick={resetPassword}
        >
          Reset Password
        </Button>
        <Button variant="text" type="submit" color="primary">
          <RouterLink to="/login" style={{ textDecoration: "none" }}>
            Back to Login
          </RouterLink>
        </Button>
      </Grid>
    </Container>
  );
};

export default ResetPassword;
