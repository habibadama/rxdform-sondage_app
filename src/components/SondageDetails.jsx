import React, { useState, useEffect } from "react";

const SondageDetails = ({ sondageId }) => {
  const [sondage, setSondage] = useState(null);
  const [reponses, setReponses] = useState({});

  useEffect(() => {
    const fetchSondage = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/sondages/${sondageId}`
        );
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }
        const data = await response.json();
        setSondage(data);
      } catch (error) {
        console.error("Erreur lors de la récupération du sondage :", error);
      }
    };

    fetchSondage();
  }, [sondageId]);

  const handleChange = (e, questionId) => {
    setReponses({ ...reponses, [questionId]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/sondages/${sondageId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sondageId, reponses }),
        }
      );
      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
      }
      console.log("Réponses envoyées avec succès");
    } catch (error) {
      console.error("Erreur lors de l'envoi des réponses :", error);
    }
  };

  if (!sondage) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div>
      <h2>{sondage.subject}</h2>
      <form onSubmit={handleSubmit}>
        {sondage.questions.map((question) => (
          <div key={question.id}>
            <p>{question.text}</p>
            {question.type === "text" ? (
              <input
                type="text"
                value={reponses[question.id] || ""}
                onChange={(e) => handleChange(e, question.id)}
              />
            ) : (
              <select
                value={reponses[question.id] || ""}
                onChange={(e) => handleChange(e, question.id)}
              >
                {question.options.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            )}
          </div>
        ))}
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default SondageDetails;
