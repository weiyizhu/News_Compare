import { createStyles } from "@material-ui/core";
import theme from "../themes/theme";

const styles = createStyles({
  x: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginBottom: "2em",
      marginRight: "0px"
    },
    width: "auto",
    marginRight: "3em",
  },
});

export default styles;
