// QuestionDetail.tsx
import React from 'react';
import { Question } from '../mocks/course'; // ปรับ path ตามโครงสร้างไฟล์ของคุณ

interface QuestionDetailProps {
  questions: Question[];
}

const QuestionDetail: React.FC<QuestionDetailProps> = ({ questions }) => {
  return (
    <div className="questions-section">
      {questions.map((question) => (
        <div key={question.id} className="question-item">
          <p className="question-text">{question.questionText}</p>
          {question.answers && question.answers.map((answer) => (
            <p key={answer.id} className="answer-text">{answer.answerText}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default QuestionDetail;