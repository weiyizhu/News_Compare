import { createMuiTheme } from "@material-ui/core/styles";
import theme from "./theme";

const userTheme = createMuiTheme(theme, {
  overrides: {
    MuiTab: {
      wrapper: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
      },
    },
    MuiSvgIcon: {
      root: {
        marginTop: "6px",
      },
    },
    MuiTabs: {
      root: {
        minWidth: "200px",
      },
    },
  },
  props: {},
});

export default userTheme;
