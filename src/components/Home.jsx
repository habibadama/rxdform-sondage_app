import React from "react";
import img from "../assets/hero.svg";
import Button from "../layout/Button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className=" min-h-[70vh] flex flex-col md:flex-row md:justify-between items-center md:mx-32 mx-5 mt-10">
      <div className=" md:w-2/4 text-center">
        <h2 className=" text-5xl font-semibold leading-tight">
          RxDForm
          <span className="text-brightGreen"> Application de Sondages</span>
        </h2>
        <p className=" text-lightText mt-5 text-start">
          Bienvenue sur RxDForm, l'application qui vous permet de créer,
          partager et visualiser rapidement les résultats de vos sondages en
          ligne.
        </p>
        <p className=" text-lightText mt-5 text-start">
          Connectez-vous et commencez à créer des sondages dès maintenant.
        </p>

        <Link to="login" spy={true} smooth={true} duration={500}>
          <Button title="Créer un compte" />
        </Link>
      </div>

      <div className=" w-full md:w-2/4">
        <img src={img} alt="img" />
      </div>
    </div>
  );
};

export default Home;
