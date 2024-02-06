import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import SondageForm from "./components/SondageForm";
import MesSondages from "./components/MesSondages";

const App = () => {
  const [currentForm, setCurrentForm] = useState("login");
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="login"
            element={
              currentForm === "login" ? (
                <Login onFormSwitch={toggleForm} />
              ) : (
                <Register onFormSwitch={toggleForm} />
              )
            }
          />
          <Route path="/sondages" element={<SondageForm />} />
          <Route path="/mes-sondages" element={<MesSondages />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
