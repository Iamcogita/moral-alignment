import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mockQuestions from './mockQuestionnaire.json';
import './index.css';

const LandingPage = () => {
  const [responses, setResponses] = useState({});
  const navigate = useNavigate();

  const handleChange = (questionId, value) => {
    setResponses({ ...responses, [questionId]: value });
  };

  const handleSubmit = async () => {
    const formattedResponses = mockQuestions.map(q => ({
      ...q,
      response: Number(responses[q.question_id] || q.response),
    }));

    try {
      await fetch('http://localhost:5000/save-responses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedResponses),
      });
      navigate('/results');
    } catch (error) {
      console.error('Error saving responses:', error);
    }
  };

  return (
    <div className='landing-page'>
      <h1>Moral Alignment Questionnaire</h1>
      <form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
        {mockQuestions.map((question) => (
          <div key={question.question_id}>
            <p>{question.question}</p>
            <span>{question.x} - </span>
            {[...Array(6).keys()].map(value => (
              <label key={value }>
                <input
                  type="radio"
                  name={`question-${question.question_id}`}
                  value={value}
                  checked={responses[question.question_id] === String(value)}
                  onChange={e => handleChange(question.question_id, e.target.value)}
                />
                {value + 1}
              </label>
            ))}
            <span> - {question.y}</span>
          </div>
        ))}
        <button className="submitButton" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LandingPage;
