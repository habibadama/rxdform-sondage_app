import React, { useState, useEffect } from "react";
import Heading from "../layout/Heading";

const Courses = () => {
  const userName = localStorage.getItem("username");
  const [DisplayUserName, setDisplayUserName] = useState("");

  useEffect(() => {
    if (userName) {
      // Mettez à jour la variable d'état avec le message de bienvenue
      <Heading title1="Créer" title2="un sondage" />;
      setDisplayUserName(`${userName} ! `);
    }
  }, []);
  return (
    <div className=" min-h-screen flex flex-col items-center md:px-32 px-5 my-10">
      {/* <Heading title1="Créer" title2="un sondage" /> */}

      <h2>
        Bienvenue,
        <span className="font-semibold text-lg mb-4"> {DisplayUserName}</span>
      </h2>

      <div className="my-4 text-center">
        <p className="text-gray-700 leading-relaxed">
          Sur cette page, vous pouvez créer vos propres sondages et collecter
          des réponses de manière simple et efficace. Utilisez le formulaire
          pour définir les questions de votre sondage, puis partagez-le avec
          d'autres utilisateurs. Vous pourrez voir les réponses en temps réel et
          analyser les résultats.
        </p>
      </div>
    </div>
  );
};

export default Courses;
