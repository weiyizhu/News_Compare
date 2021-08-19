import React from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  Grid,
  Link,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const SignUp: React.FC = () => {
  return (
    <Container maxWidth="xs" style={{ marginTop: "4em" }}>
      <Grid container direction="column" alignItems="center">
        <Typography variant="h4">Sign Up</Typography>
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            name="password"
            autoComplete="current-password"
            type="password"
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            color="primary"
            style={{ margin: "1em 0em 1em" }}
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
        </form>
      </Grid>
    </Container>
  );
};

export default SignUp;
