import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // or use localStorage
import { useNavigate } from "react-router-dom";

const CreateTest = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { text: "", answers: [{ text: "", is_correct: false }] },
  ]);
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", answers: [{ text: "", is_correct: false }] },
    ]);
  };

  const handleAddAnswer = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers.push({ text: "", is_correct: false });
    setQuestions(newQuestions);
  };

  const handleSubmit = () => {
    const token = Cookies.get("auth_token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .post(
        "http://127.0.0.1:8000/api/tests/",
        {
          title,
          questions,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Test created successfully:", response.data);
        navigate("/"); // Redirect to the homepage or test list
      })
      .catch((error) => {
        console.error("Error creating test:", error);
      });
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].text = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex].text = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, answerIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers = newQuestions[
      questionIndex
    ].answers.map((answer, idx) => ({
      ...answer,
      is_correct: idx === answerIndex,
    }));
    setQuestions(newQuestions);
  };

  return (
    <div className="create-test">
      <h2>Create New Test</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Test Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {questions.map((question, questionIndex) => (
          <div key={questionIndex}>
            <h3>Question {questionIndex + 1}</h3>
            <input
              type="text"
              placeholder="Enter question text"
              value={question.text}
              onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
            />
            {question.answers.map((answer, answerIndex) => (
              <div key={answerIndex}>
                <input
                  type="text"
                  placeholder="Enter answer text"
                  value={answer.text}
                  onChange={(e) =>
                    handleAnswerChange(questionIndex, answerIndex, e.target.value)
                  }
                />
                <label>
                  Correct Answer
                  <input
                    type="radio"
                    checked={answer.is_correct}
                    onChange={() => handleCorrectAnswerChange(questionIndex, answerIndex)}
                  />
                </label>
              </div>
            ))}
            <button type="button" onClick={() => handleAddAnswer(questionIndex)}>
              Add Answer
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddQuestion}>
          Add Question
        </button>
        <button type="button" onClick={handleSubmit}>
          Submit Test
        </button>
      </form>
    </div>
  );
};

export default CreateTest;
