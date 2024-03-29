import React, { useState } from "react";
import img from "../assets/contact.svg";
import Heading from "../layout/Heading";
import Button from "../layout/Button";
import axios from "axios";

const Register = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        formData
      );
      // setSuccessMessage("Inscription réussie !");
      // Réinitialisez le formulaire après une inscription réussie
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setErrorMessage("The email has already been taken.");
      console.error("Erreur lors de l'inscription : ", error.response.data);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center md:mx-32 mx-5 mt-10">
      <Heading title1="Créer un compte" />
      <div className="flex flex-col md:flex-row justify-between w-full">
        <form
          className="w-full md:w-2/5 space-y-5 pt-20"
          onSubmit={handleRegistration}
        >
          <div className="flex flex-col">
            <label htmlFor="name">Nom complet</label>
            <input
              className=" py-3 px-2 rounded-lg hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] transition-all"
              onChange={handleInputChange}
              type="text"
              placeholder="Nom complet"
              id="name"
              name="name"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              className=" py-3 px-2 rounded-lg hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] transition-all"
              onChange={handleInputChange}
              type="email"
              placeholder="johndoe@gmail.com"
              id="email"
              name="email"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Mot de passe</label>
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
          {(errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-3">
              {errorMessage}
            </div>
          )) ||
            (successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-3">
                {successMessage}
              </div>
            ))}

          <button
            className="hover:underline"
            onClick={() => props.onFormSwitch("login")}
          >
            Vous avez déjà un compte ? Connectez-vous ici.
          </button>
          <div className="flex flex-row justify-start">
            <Button type="submit" title="S'inscrire" />
          </div>
        </form>

        <div className="w-full md:w-2/4">
          <img src={img} alt="img" />
        </div>
      </div>
    </div>
  );
};

export default Register;
