import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  makeStyles,
  TextField,
  TextFieldProps,
} from "@material-ui/core";
import { useRef } from "react";
import styles from "./styles";

const Account = () => {
  const password = useRef<TextFieldProps>();
  const confirmPassword = useRef<TextFieldProps>();
  const classes = makeStyles(styles)();
  return (
    <Card>
      <CardHeader
        title="Change Password"
        titleTypographyProps={{ variant: "h6" }}
      />
      <Divider variant="middle" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="New Password"
              name="password"
              autoComplete="current-password"
              type="password"
              inputRef={password}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
          </Grid>
        </Grid>
      </CardContent>
      <Divider variant="middle" style={{ marginBottom: "1em" }} />
      <CardActions className={classes.x}>
        <Button color="primary" variant="contained">
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};

export default Account;
