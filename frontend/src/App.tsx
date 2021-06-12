import React from "react";
import Login from "./components/Login";
import NavBar from './components/NavBar'
import Search from "./components/Search/Search";

function App() {
  return (
    <div className="App">
      {/* <Login /> */}
      <NavBar />
      <Login />
      <Search />
    </div>
  );
}

export default App;
