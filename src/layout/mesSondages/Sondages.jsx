// Sondages.js

import React, { useState, useEffect } from "react";

const Sondages = () => {
  const [sondages, setSondages] = useState([]);

  useEffect(() => {
    // Charger les sondages depuis l'API lorsque le composant est monté
    const fetchSondages = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/sondages");
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }

        const data = await response.json();
        setSondages(data);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des sondages :",
          error.message
        );
      }
    };

    fetchSondages();
  }, []);

  return (
    <div>
      <h2>Liste des Sondages</h2>
      <ul>
        {sondages.map((sondage) => (
          <li key={sondage.id}>
            <a href={`/sondages/${sondage.id}`}>{sondage.subject}</a>
          </li>
          // Ajoutez ici le rendu des autres détails du sondage que vous souhaitez afficher
        ))}
      </ul>
    </div>
  );
};

export default Sondages;
