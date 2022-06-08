import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact={true}
            path="/"
            element={<Homepage/>}
          />
          <Route
            exact={true}
            path="/login"
            element={<Login/>}
          />
          <Route
            exact={true}
            path="/signup"
            element={<Signup/>}
          />
          <Route
            exact={true}
            path="/feed"
            element={<Feed/>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
