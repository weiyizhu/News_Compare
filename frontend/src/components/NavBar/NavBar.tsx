import React from "react";
import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
});

const NavBar: React.FC = () => {
  const classes = useStyles();
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>News Compare</Typography>
        <Button color="inherit">Log In</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
