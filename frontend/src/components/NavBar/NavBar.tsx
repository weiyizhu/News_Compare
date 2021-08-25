import React, { useEffect } from "react";
import {
  AppBar,
  Avatar,
  Button,
  ClickAwayListener,
  Divider,
  Grow,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Popover,
  Popper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/reducers";
import { actionCreators } from "../../state";
import {
  AccountCircle,
  Apps,
  ChromeReaderMode,
  Dashboard,
  Description,
  Drafts,
  ExitToApp,
  Inbox,
  Search,
  Send,
} from "@material-ui/icons";
import { Link, NavLink, useHistory } from "react-router-dom";
import { id } from "date-fns/locale";
import { UserTabVal } from "../../state/action-types/userActionTypes";

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
});

const NavBar: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory()
  const isLoggedIn = useSelector<RootState, boolean>(
    (state) => state.user.loggedIn
  );

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    dispatch(actionCreators.checkLoggedInStatus());
  }, []);
  
  const handleUserMenuClick = (tabVal: UserTabVal) => {
    dispatch(actionCreators.toggleUserTabVal(tabVal))
    history.push("/user")
  }

  return (
    <AppBar position="sticky" style={{ marginBottom: "1em" }}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          News Compare
        </Typography>
        {isLoggedIn ? (
          <>
            <IconButton onClick={handleMenu} color="inherit">
              <Avatar>H</Avatar>
            </IconButton>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={() => {
                setAnchorEl(null);
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <List>
                <ListItem
                  button
                  onClick={() => handleUserMenuClick(UserTabVal.ACCOUNT)}
                >
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary="Account" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => handleUserMenuClick(UserTabVal.SAVEDSEARCHES)}
                >
                  <ListItemIcon>
                    <Search />
                  </ListItemIcon>
                  <ListItemText primary="Saved Searches" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => handleUserMenuClick(UserTabVal.SAVEDNEWS)}
                >
                  <ListItemIcon>
                    <Description />
                  </ListItemIcon>
                  <ListItemText primary="Saved News" />
                </ListItem>
                <Divider />
                <ListItem
                  button
                  onClick={() => dispatch(actionCreators.logout())}
                >
                  <ListItemIcon>
                    <ExitToApp />
                  </ListItemIcon>
                  <ListItemText primary="Sign out" />
                </ListItem>
              </List>
            </Popover>
          </>
        ) : (
          <Button color="inherit">
            <NavLink
              to="/login"
              activeStyle={{ color: "white" }}
              style={{ textDecoration: "none", color: "white" }}
            >
              {"Log In/Sign Up"}
            </NavLink>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
