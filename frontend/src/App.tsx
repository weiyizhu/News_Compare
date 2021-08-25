import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import StatusAlert from "./components/StatusAlert";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import ResetPassword from "./components/ResetPassword";
import SignUp from "./components/SignUp";
import News from "./screens/News";
import { RootState } from "./state/reducers";
import ForgotPassword from "./components/ForgotPassword";
import { Status } from "./state/action-types/statusActionTypes";
import User from "./screens/User";

function App() {
  const showStatus = useSelector<RootState, boolean>(
    (state) =>
      state.status.status === Status.ERROR ||
      state.status.status === Status.SUCCESS
  );
  const isLoggedIn = useSelector<RootState, boolean>(
    (state) => state.user.isLoggedIn
  );
  return (
    <Router>
      <NavBar />
      {showStatus && <StatusAlert />}

      <Switch>
        <Route exact path="/" component={News} />
        <Route exact path="/login">
          {isLoggedIn ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route exact path="/signup">
          {isLoggedIn ? <Redirect to="/" /> : <SignUp />}
        </Route>
        <Route
          exact
          path="/reset/:email/:resetToken"
          component={ResetPassword}
        />
        <Route exact path="/forgot" component={ForgotPassword} />
        <Route exact path="/user">
          {isLoggedIn ? <User /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
