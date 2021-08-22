import { useSelector } from "react-redux";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import StatusAlert from "./components/StatusAlert";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import ResetPassword from "./components/ResetPassword";
import SignUp from "./components/SignUp";
import News from "./screens/News";
import { RootState } from "./state/reducers";
import ForgotPassword from "./components/ForgotPassword";
import { Status } from "./state/action-types/statusActionTypes";

function App() {
  const showStatus = useSelector<RootState, boolean>(
    (state) => state.status.status === Status.ERROR || state.status.status === Status.SUCCESS
  );
  return (
    <Router>
      <NavBar />
      {showStatus && <StatusAlert />}

      <Switch>
        <Route exact path="/" component={News} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route
          exact
          path="/reset/:email/:resetToken"
          component={ResetPassword}
        />
        <Route path="/forgot" component={ForgotPassword} />
      </Switch>
    </Router>
  );
}

export default App;
