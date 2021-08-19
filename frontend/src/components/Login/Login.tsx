import React from "react";
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
  CssBaseline,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const useStyle = makeStyles(() => ({
  outerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Login: React.FC = () => {
  const classes = useStyle();
  return (
    <Container maxWidth="xs" style={{ marginTop: "4em" }}>
      <Grid container direction="column" alignItems="center">
        <Typography variant="h4">Login</Typography>
        <form action="" method="post">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
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
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Typography color="textSecondary" variant="body2">
                Don't have an account?{" "}
                <Link href="#" variant="body2">
                  <RouterLink to="/signup">{"Sign Up"}</RouterLink>
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
};

export default Login;
