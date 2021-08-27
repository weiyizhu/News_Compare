import React, { useRef, useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  makeStyles,
  Grid,
  Link,
  Checkbox,
  FormControlLabel,
  TextFieldProps,
} from "@material-ui/core";
import { Link as RouterLink, useHistory } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../state";
import { isValidEmail } from "../SignUp/SignUp";
import { Status } from "../../state/action-types/statusActionTypes";
import { RootState } from "../../state/reducers";

const useStyle = makeStyles(() => ({
  outerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const url = process.env.REACT_APP_PORT || process.env.REACT_APP_EXPRESS_PORT;
const Login: React.FC = () => {
  const classes = useStyle();
  const email = useRef<TextFieldProps>();
  const pwd = useRef<TextFieldProps>();
  const [checked, setChecked] = useState(false);
  const history = useHistory();
  const isLoggedIn = useSelector<RootState, boolean>(
    (state) => state.user.isLoggedIn
  );

  const dispatch = useDispatch();
  const login: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (email.current && pwd.current) {
      let errorMsg = "";
      if (!isValidEmail(String(email.current.value))) {
        errorMsg = "Invalid email";
      } else if (String(pwd.current.value).length <= 6) {
        errorMsg = "Password cannot be less than 6 characters";
      }
      if (errorMsg !== "") {
        dispatch(actionCreators.updateStatus(Status.ERROR, errorMsg));
      } else {
        dispatch(
          actionCreators.login(
            String(email.current.value),
            String(pwd.current.value),
            checked
          )
        );
        if (isLoggedIn) history.push("/");
      }
    }
  };
  return (
    <Container maxWidth="xs" style={{ marginTop: "4em" }}>
      <Grid container direction="column" alignItems="center">
        <Typography variant="h4" paragraph>
          Login
        </Typography>
        <form onSubmit={login}>
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
            inputRef={pwd}
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                onChange={(event) => setChecked(event.target.checked)}
              />
            }
            label="Remember me for 7 days"
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            color="primary"
            style={{ margin: "1em 0em 1em" }}
          >
            Log In
          </Button>
        </form>
        <Grid container>
          <Grid item xs>
            <Typography color="textSecondary" variant="body2">
              <Link variant="body2">
                <RouterLink to="/forgot">{"Forgot password?"}</RouterLink>
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="textSecondary" variant="body2">
              Don't have an account?{" "}
              <Link variant="body2">
                <RouterLink to="/signup">{"Sign up"}</RouterLink>
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
