import { createStyles } from "@material-ui/core";
import theme from "../../themes/theme";

const styles = createStyles({
  card: {
    [theme.breakpoints.down("xs")]: {
      height: "auto"
    },
    height: "35em",
    marginTop: "2em",
  },
});

export default styles;
