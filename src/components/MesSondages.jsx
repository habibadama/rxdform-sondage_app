import React, { useState, useEffect } from "react";
import Heading from "../layout/Heading";
import { Link } from "react-router-dom";

const MesSondages = () => {
  const [sondages, setSondages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchSondages = async () => {
      try {
        const token = localStorage.getItem("token");
        setIsConnected(token ? true : false);

        const response = await fetch("http://localhost:8000/api/mes-sondages", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

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
    <div className="min-h-screen flex flex-col items-center md:px-32 px-5 my-10">
      <Heading title1="Liste des Sondages" />
      {!isConnected && (
        <p className="my-4 ">
          Vous devez vous Vous devez vous{" "}
          <Link to="/login">
            <span className="text-blue-500 hover:underline">connecter</span>
          </Link>{" "}
          pour créer ou voir vos sondages.
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
        {sondages.map((sondage) => (
          <div key={sondage.id} className="bg-white rounded-md shadow-md p-4">
            <h3 className="text-lg font-semibold mb-2">{sondage.subject}</h3>
            <a
              href={`sondages/${sondage.id}`}
              className="text-blue-500 hover:underline"
            >
              Voir le sondage
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MesSondages;
