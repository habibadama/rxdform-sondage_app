import React, { useState, useEffect } from "react";
import Heading from "../layout/Heading";

// const userName = localStorage.getItem("username");
// const [DisplayUserName, setDisplayUserName] = useState("");

function SondageForm() {
  const userName = localStorage.getItem("username");
  const [DisplayUserName, setDisplayUserName] = useState("");

  useEffect(() => {
    if (userName) {
      setDisplayUserName(`, ${userName} ! `);
    }
  }, []);

  const [surveyData, setSurveyData] = useState({
    subject: "",
    questions: [{ text: "", type: "text", options: [""] }],
  });

  const handleChange = (e, index, optionIndex) => {
    const { name, value } = e.target;
    const updatedQuestions = [...surveyData.questions];

    if (name === "type") {
      updatedQuestions[index][name] = value;
      if (value === "multiple-choice") {
        updatedQuestions[index].options = [""];
      } else {
        updatedQuestions[index].options = [];
      }
    } else if (name === "options") {
      updatedQuestions[index].options[optionIndex] = value;
    } else {
      updatedQuestions[index][name] = value;
    }

    setSurveyData({ ...surveyData, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setSurveyData({
      ...surveyData,
      questions: [
        ...surveyData.questions,
        { text: "", type: "text", options: [""] },
      ],
    });
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...surveyData.questions];
    updatedQuestions.splice(index, 1);
    setSurveyData({ ...surveyData, questions: updatedQuestions });
  };

  const addOption = (index) => {
    const updatedQuestions = [...surveyData.questions];
    updatedQuestions[index].options.push("");
    setSurveyData({ ...surveyData, questions: updatedQuestions });
  };

  const removeOption = (index, optionIndex) => {
    const updatedQuestions = [...surveyData.questions];
    updatedQuestions[index].options.splice(optionIndex, 1);
    setSurveyData({ ...surveyData, questions: updatedQuestions });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8000/api/sondages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(surveyData),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error("Erreur lors de l'envoi des données", error);
    }
  };

  return (
    <div className=" min-h-[70vh] flex flex-col items-center md:px-32 px-5 my-10">
      <div className="my-4 text-center">
        <h2 className="text-2xl mb-5">
          Bienvenue
          <span className="font-semibold text-lg mb-4"> {DisplayUserName}</span>
        </h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          Sur cette page, vous pouvez créer vos propres sondages et collecter
          des réponses de manière simple et efficace. Utilisez le formulaire
          pour définir les questions de votre sondage, puis partagez-le avec
          d'autres utilisateurs. Vous pourrez voir les réponses en temps réel et
          analyser les résultats.
        </p>
      </div>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-md w-full md:w-[700px]">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Créer un sondage
        </h2>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Sujet du sondage
            </label>
            <input
              type="text"
              className="border rounded w-full py-2 px-3"
              name="subject"
              value={surveyData.subject}
              onChange={(e) =>
                setSurveyData({ ...surveyData, subject: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Questions
            </label>
            {surveyData.questions.map((question, index) => (
              <div key={index} className="mb-4">
                <div className="flex flex-col md:flex-row items-center mb-2">
                  <input
                    type="text"
                    className="border rounded w-full md:w-3/4 py-2 px-3 mb-2 md:mb-0 md:mr-2"
                    name="text"
                    placeholder="Saisir la question"
                    value={question.text}
                    onChange={(e) => handleChange(e, index)}
                  />
                  <button
                    type="button"
                    onClick={() => removeQuestion(index)}
                    className="text-red-500 font-bold md:ml-2"
                  >
                    Supprimer
                  </button>
                </div>
                <div className="mb-2">
                  <label className="mr-2">Type de question:</label>
                  <select
                    name="type"
                    value={question.type}
                    onChange={(e) => handleChange(e, index)}
                    className="border rounded py-2 px-3"
                  >
                    <option value="text">Texte</option>
                    <option value="multiple-choice">Choix multiple</option>
                  </select>
                </div>
                {question.type === "multiple-choice" && (
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Options
                    </label>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center mb-2">
                        <input
                          type="text"
                          className="border rounded w-full py-2 px-3 mr-2"
                          name="options"
                          placeholder="Saisir une option"
                          value={option}
                          onChange={(e) => handleChange(e, index, optionIndex)}
                        />
                        <button
                          type="button"
                          onClick={() => removeOption(index, optionIndex)}
                          className="text-red-500 font-bold"
                        >
                          Supprimer
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addOption(index)}
                      className="text-blue-500 font-bold"
                    >
                      Ajouter une option
                    </button>
                  </div>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addQuestion}
              className="text-blue-500 font-bold"
            >
              Ajouter une question
            </button>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded w-full md:w-auto"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}

export default SondageForm;
