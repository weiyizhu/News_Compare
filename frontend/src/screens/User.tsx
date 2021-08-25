import {
  Avatar,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { AccountCircle, Search, Description } from "@material-ui/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Account from "../components/Account";
import SavedNews from "../components/SavedNews";
import SavedSearches from "../components/SavedSearches";
import { actionCreators } from "../state";
import { UserTabVal } from "../state/action-types/userActionTypes";
import { RootState } from "../state/reducers";
import userTheme from "../themes/userTheme";
import styles from "./styles";

const useStyles = makeStyles(styles);

const User = () => {
  const classes = makeStyles(styles)();
  const tabVal = useSelector<RootState, number>((state) => state.user.tabVal);
  const email = useSelector<RootState, string>((state) => state.user.email);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    let newTabVal = UserTabVal.ACCOUNT;
    if (newValue === 2) {
      newTabVal = UserTabVal.SAVEDSEARCHES;
    } else if (newValue === 4) {
      newTabVal = UserTabVal.SAVEDNEWS;
    }
    dispatch(actionCreators.toggleUserTabVal(newTabVal));
  };
  const title =
    tabVal === 0 ? "Account" : tabVal === 2 ? "Saved Searches" : "Saved News";

  return (
    <ThemeProvider theme={userTheme}>
      <Container>
        <Grid container direction="column" spacing={2}>
          <Grid
            item
            container
            alignItems="center"
            spacing={2}
            style={{ minHeight: "100px" }}
          >
            <Grid item>
              <Avatar alt={email[0].toUpperCase()} src="/" />
            </Grid>
            <Grid item>
              <Typography>{email}</Typography>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item container justify="center" className={classes.x}>
              <Grid item>
                <Paper elevation={3}>
                  <Tabs
                    orientation="vertical"
                    value={tabVal}
                    onChange={handleChange}
                  >
                    <Tab icon={<AccountCircle />} label="Account" />
                    <Divider />
                    <Tab icon={<Search />} label="Saved Searches" />
                    <Divider />
                    <Tab icon={<Description />} label="Saved News" />
                  </Tabs>
                </Paper>
              </Grid>
            </Grid>
            <Grid item style={{ width: "auto" }} xs>
              <Typography variant="h5" paragraph>
                {title}
              </Typography>
              <Divider style={{ marginBottom: "1em" }} />
              {tabVal === 0 ? (
                <Account />
              ) : tabVal === 2 ? (
                <SavedSearches />
              ) : (
                <SavedNews />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default User;
