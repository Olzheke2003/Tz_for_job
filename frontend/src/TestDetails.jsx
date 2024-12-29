import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Or use localStorage

const TestDetails = () => {
  const [test, setTest] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [results, setResults] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("auth_token");

    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch the test details by ID
    axios
      .get(`http://127.0.0.1:8000/api/tests/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((response) => {
        setTest(response.data);
      })
      .catch((error) => {
        console.error("Error fetching test details:", error);
      });
  }, [id, navigate]);

  const handleAnswerChange = (questionId, answerId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerId,
    });
  };

  const handleSubmitTest = () => {
    const token = Cookies.get("auth_token");
    if (!token) {
      navigate("/login");
      return;
    }
  
    // Формируем массив объектов [{ question: "4", answer: "5" }, ...]
    const payload = {
      answers: Object.entries(selectedAnswers).map(([questionId, answerId]) => ({
        question: `${questionId}`, // ID вопроса как строка
        answer: `${answerId}`, // ID ответа как строка
      })),
    };
  
    console.log("Answers being sent to server:", payload);
  
    // Отправка данных на сервер
    axios
      .post(
        `http://127.0.0.1:8000/api/tests/${id}/submit/`,
        payload,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Test submitted successfully:", response.data);
        setResults(response.data); // Установка результатов
        setIsModalOpen(true); // Открытие модального окна
      })
      .catch((error) => {
        console.error("Error submitting test:", error);
      });
  };
  
  
  
  
  
  
  

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    navigate("/"); // Redirect to homepage or any other page after closing the modal
  };

  if (!test) {
    return <div>Loading...</div>;
  }

  return (
    <div className="test-details">
      <h2>{test.title}</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        {test.questions.map((question) => (
          <div key={question.id}>
            <h3>{question.text}</h3>
            {question.answers.map((answer) => (
              <div key={answer.id}>
                <label>
                  <input
                    type="radio"
                    name={`question_${question.id}`}
                    value={answer.id}
                    checked={selectedAnswers[question.id] === answer.id}
                    onChange={() => handleAnswerChange(question.id, answer.id)}
                  />
                  {answer.text}
                </label>
              </div>
            ))}
          </div>
        ))}
        <button type="button" onClick={handleSubmitTest}>
          Submit Test
        </button>
      </form>

      {/* Modal for displaying the results */}
      {isModalOpen && results && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Test Results</h2>
            <p>Your score: {results.score}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestDetails;
