import React, { useState } from "react";
import img from "../assets/contact.svg";
import Heading from "../layout/Heading";
import Button from "../layout/Button";
import axios from "axios";

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        formData
      );
      setSuccessMessage("Connexion réussie !");

      const token = response.data.token;

      // Stockez le token dans le localStorage pour une utilisation ultérieure
      localStorage.setItem("token", token);

      // Redirigez l'utilisateur vers la page de création de sondage
      // props.history.push("/create-survey");
      alert("Connexion réussie");
    } catch (error) {
      setErrorMessage("Identifiants invalides");
      console.error("Erreur lors de la connexion : ", error.response.data);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center md:mx-32 mx-5 mt-10">
      <Heading title1="Créer un compte" />
      <div className="flex flex-col md:flex-row justify-between w-full">
        <form
          className="w-full md:w-2/5 space-y-5 pt-20"
          onSubmit={handleLogin}
        >
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              className=" py-3 px-2 rounded-lg hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] transition-all"
              onChange={handleInputChange}
              type="email"
              placeholder="youremail@gmail.com"
              id="email"
              name="email"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              className=" py-3 px-2 rounded-lg hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] transition-all"
              onChange={handleInputChange}
              type="password"
              placeholder="**************"
              id="password"
              name="password"
              required
            />
          </div>
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-3">
              {errorMessage}
            </div>
          )}
          <button
            className="link-btn"
            onClick={() => props.onFormSwitch("register")}
          >
            Already have an account? Register.
          </button>
          <div className="flex flex-row justify-start">
            <Button type="submit" title="Log In" />
          </div>
        </form>
        <div className="w-full md:w-2/4">
          <img src={img} alt="img" />
        </div>
      </div>
    </div>
  );
};

export default Login;
