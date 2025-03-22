import React from 'react';
import { Link } from 'react-router-dom';
import { Question, Course } from '../../mocks/types';

interface QuestionCardProps {
  question: Question;
  courses: Course[];
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, courses }) => {
  const createdAtDate = new Date(question.createdAt);
  const formattedDate = createdAtDate.toLocaleDateString();
  const course = courses.find((c) => c.course_id === question.courseId);
  if (!course) return null;

  return (
    <div className="question-card">
      <h3>
        <Link to={`/course/${course.course_id}`}>
          {course.course_id} | {course.name}
        </Link>
        <br />
        <span>{course.nameTH}</span>
      </h3>
      <p className="question-detail">{question.questionText}</p>
      {/* The API response for questions doesn't include answers */}
      {/* {question.answers && question.answers.map((answer) => (
        <p key={answer.id} className="answer">Answer: {answer.answerText}</p>
      ))} */}
      <div className='question-buttom'>
        <span>{question.questionerName}</span>
        <span>{formattedDate}</span>
      </div>
    </div>
  );
};

export default QuestionCard;