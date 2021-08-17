import React from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  makeStyles,
  Grid,
  Link,
} from "@material-ui/core";

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
    <Container maxWidth="xs">
      <Grid container direction="column" alignItems="center">
        <Typography>Login</Typography>
        <Typography>
          Don't have an account? <Link>Sign Up {"->"}</Link>{" "}
        </Typography>
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
            autoFocus
            type="password"
          />
          <Button fullWidth variant="contained" type="submit" color="primary">
            Log In
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link>Forgot Password?</Link>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
};

export default Login;
