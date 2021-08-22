import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  TextFieldProps,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios, { AxiosError } from "axios";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { actionCreators } from "../../state";
import { NewsActionType, NewsStatus } from "../../state/action-types/newsActionTypes";
import { isValidEmail } from "../SignUp/SignUp";

const url = process.env.REACT_APP_PORT || process.env.REACT_APP_EXPRESS_PORT;


const ForgotPassword = () => {
  const email = useRef<TextFieldProps>();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const resetPassword = async () => {
    if (email.current) {
      if (!isValidEmail(String(email.current.value))) {
        dispatch(
          actionCreators.updateStatus(NewsStatus.ERROR, "Invalid email")
        );
        return;
      }
      const res = await axios
        .post(url + "/users/forgot", {
          email: email.current.value,
        })
        .catch(() => {
          dispatch({
            type: NewsActionType.UPDATE_STATUS,
            payload: {
              status: NewsStatus.ERROR,
              errorMsg: "Error sending email",
            },
          });
        });
      if (res) {
        setOpen(true);
      }
    }
  };
  return (
    <Container maxWidth="xs" style={{ marginTop: "4em" }}>
      <Grid container direction="column" alignItems="center">
        <Typography variant="h4" paragraph>
          Forgot Password?
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
            Back
          </RouterLink>
        </Button>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => {
            setOpen(false);
          }}
        >
          {`We have sent a confirmation email to ${String(
            email.current?.value
          )}.`}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ForgotPassword;
