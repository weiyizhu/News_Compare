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
import axios from "axios";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../state";
import { Status } from "../../state/action-types/statusActionTypes";
import { RootState } from "../../state/reducers";
import styles from "./styles";

const url = process.env.REACT_APP_PORT || process.env.REACT_APP_EXPRESS_PORT;

const Account = () => {
  const password = useRef<TextFieldProps>();
  const confirmPassword = useRef<TextFieldProps>();
  const dispatch = useDispatch();
  const email = useSelector<RootState, string>((state) => state.user.email);
  const classes = makeStyles(styles)();
  const changePassword = async () => {
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
          .post(url + "/users/change-password", {
            email,
            password: password.current.value,
          })
          .catch((err) => {
            console.log(err.message);
            dispatch(actionCreators.updateStatus(Status.ERROR, err.message));
          });
        if (res) {
          dispatch(
            actionCreators.updateStatus(
              Status.SUCCESS,
              "Change password successful!"
            )
          );
        }
      }
    }
  };
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
        <Button color="primary" variant="contained" onClick={changePassword}>
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};

export default Account;
