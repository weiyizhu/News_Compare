import React, { useEffect } from "react";
import {
  AppBar,
  Avatar,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/reducers";
import { actionCreators } from "../../state";
import {
  AccountCircle,
  Description,
  ExitToApp,
  Search,
} from "@material-ui/icons";
import { NavLink, useHistory } from "react-router-dom";
import { UserTabVal } from "../../state/action-types/userActionTypes";

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoggedIn = useSelector<RootState, boolean>(
    (state) => state.user.isLoggedIn
  );
  const email = useSelector<RootState, string>((state) => state.user.email);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    dispatch(actionCreators.initialize());
  }, [dispatch]);

  const handleUserMenuClick = (tabVal: UserTabVal) => {
    setAnchorEl(null);
    dispatch(actionCreators.toggleUserTabVal(tabVal));
    history.push("/user");
  };

  const signOut = () => {
    setAnchorEl(null);
    dispatch(actionCreators.logout());
  };

  return (
    <AppBar position="sticky" style={{ marginBottom: "1em" }}>
      <Toolbar>
        <Typography
          variant="h6"
          style={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => history.push("/")}
        >
          News Compare
        </Typography>
        {isLoggedIn ? (
          <>
            <IconButton onClick={handleMenu} color="inherit">
              <Avatar alt={email[0].toUpperCase()} src="/" />
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
                <ListItem button onClick={signOut}>
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
