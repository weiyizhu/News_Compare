import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";
import News from "./screens/News";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={News} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </Router>
  );
}

export default App;
