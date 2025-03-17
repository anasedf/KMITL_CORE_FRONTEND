import React, { useState, useEffect } from 'react';
import { mockCourses, Question } from '../mocks/course';
import '../Styles/Questions.css';

const Questions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const questions: Question[] = mockCourses.flatMap((course) => course.questions);
    setAllQuestions(questions);
  }, []);

  const filteredQuestions = allQuestions.filter((question) => {
    const course = mockCourses.find((c) => c.questions.some((q) => q.id === question.id));
    if (!course) return false;

    return (
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.course_id.toString().includes(searchTerm) ||
      question.questionText.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="questions-page">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by course name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />
      </div>

      <div className="question-list">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => {
            const course = mockCourses.find((c) => c.questions.some((q) => q.id === question.id));
            if (!course) return null;

            return (
              <div key={question.id} className="question-card">
                <h3>
                  {course.course_id} | {course.name}
                </h3>
                <p>{question.questionText}</p>
                {question.answers && question.answers.length > 0 && question.answers.map((answer) => (
                  <p key={answer.id} className="answer">Answer: {answer.answerText}</p>
                ))}
              </div>
            );
          })
        ) : (
          <p className="no-questions">No questions found.</p>
        )}
      </div>
    </div>
  );
};

export default Questions;