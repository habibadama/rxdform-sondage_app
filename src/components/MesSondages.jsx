import React, { useState, useEffect } from "react";

const MesSondages = () => {
  const [sondages, setSondages] = useState([]);

  useEffect(() => {
    const fetchSondages = async () => {
      try {
        const token = localStorage.getItem("token");

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
      <h2 className="text-3xl font-bold mb-10">Liste des Sondages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
