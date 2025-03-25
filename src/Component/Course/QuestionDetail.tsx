import React, { useState } from 'react';
import { QuestionDetailProps } from '../../mocks/types';
import '../../Styles/QuestionDetail.css';
import { postAnswer, deleteQuestionById } from '../../services/api';

const QuestionDetail: React.FC<QuestionDetailProps> = ({
  questions,
  courseId,
  fetchCourse,
  handleDeleteQuestion,
}) => {
  const [answers, setAnswers] = useState<{ [questionId: number]: { answerText: string, answererName: string } }>({});

  const handleAnswerChange = (questionId: number, field: string, value: string) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: {
        ...prevAnswers[questionId],
        [field]: value,
      },
    }));
  };

  const handleAddAnswer = async (questionId: number) => {
    const answer = answers[questionId];
    if (!answer?.answerText || answer.answerText.trim() === '') {
      alert('กรุณากรอกคำตอบ');
      return;
    }
    if (!answer?.answererName || answer.answererName.trim().length < 3) {
      alert('ชื่อผู้ตอบต้องมีความยาวอย่างน้อย 3 ตัวอักษร');
      return;
    }

    const newAnswer = {
      questionId: questionId,
      answerText: answer.answerText,
      answererName: answer.answererName,
    };

    console.log('Data being sent to API:', newAnswer);

    try {
      await postAnswer(newAnswer);
      await fetchCourse();
      setAnswers(prevAnswers => ({
        ...prevAnswers,
        [questionId]: {
          answerText: '',
          answererName: '',
        },
      }));
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('เกิดข้อผิดพลาดในการส่งคำตอบ กรุณาลองอีกครั้ง');
    }
  };

  const sortedQuestions = [...questions].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());


  return (
    <div className="ques-list">
      {sortedQuestions.map((question) => {
        const createdAtDate = new Date(question.createdAt);
        const localCreatedAt = createdAtDate.toLocaleDateString();

        return (
          <div key={question.id} className="ques-card">

            <div className="quas-top">
              <div className='ques-head'>
                <p>{question.questionerName}</p>
              </div>

              <div
                className="delete-button"
                onClick={() => {
                  const passcode_pin = prompt(
                    'กรุณาใส่รหัสผ่าน (passcode_pin) เพื่อลบคำถาม'
                  );
                  if (passcode_pin) {
                    deleteQuestionById(question.id, passcode_pin);
                  }
                }}
              >
                🗙
              </div>
            </div>

            <div className='ques-mid'>
              <p className="question-text">{question.questionText}</p>
            </div>


            {question.answers && question.answers.length > 0 && (
              <div className="answers-list">
                {question.answers.map((answer) => (
                  <div key={answer.id} className="answer-item">
                    <p className="answer-text">
                      {answer.answererName || 'ไม่ระบุชื่อ'} : {answer.answerText}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="question-actions">
              <div className="answer-header">
                <span className="answer-label">ตอบคำถามนี้</span>
                <div className='answer-info'>
                  <input
                    type="text"
                    placeholder="ชื่อผู้ตอบ"
                    value={answers[question.id]?.answererName || ''}
                    onChange={(e) => handleAnswerChange(question.id, 'answererName', e.target.value)}
                  />
                  <div className="answer-button" onClick={() => handleAddAnswer(question.id)}>
                    ➤
                  </div>
                </div>
              </div>
              <textarea
                placeholder="คำตอบ"
                value={answers[question.id]?.answerText || ''}
                onChange={(e) => handleAnswerChange(question.id, 'answerText', e.target.value)}
              />
            </div>

            <div className='bot'>
              <p>{localCreatedAt}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionDetail;