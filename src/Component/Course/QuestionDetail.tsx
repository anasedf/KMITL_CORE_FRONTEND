import React, { useState } from 'react';
import { QuestionDetailProps } from '../../mocks/types';
import '../../Styles/CourseQuestion.css';
import { postAnswer, deleteQuestionById } from '../../services/api';

const QuestionDetail: React.FC<QuestionDetailProps> = ({
  questions,
  courseId,
  fetchCourse,
  handleDeleteQuestion,
}) => {
  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(null);
  const [answerText, setAnswerText] = useState('');
  const [answererName, setAnswererName] = useState('');

  const handleAddAnswer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentQuestionId) {
      alert('ไม่พบคำถามที่ต้องการตอบ');
      return;
    }
    if (!answerText || answerText.trim() === '') {
      alert('กรุณากรอกคำตอบ');
      return;
    }
    if (!answererName || answererName.trim().length < 3) {
      alert('ชื่อผู้ตอบต้องมีความยาวอย่างน้อย 3 ตัวอักษร');
      return;
    }

    const newAnswer = {
      questionId: currentQuestionId,
      answerText,
      answererName: answererName,
    };

    console.log('Data being sent to API:', newAnswer);

    try {
      await postAnswer(newAnswer);
      await fetchCourse();

      setIsAnswerModalOpen(false);
      setAnswerText('');
      setAnswererName('');
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('เกิดข้อผิดพลาดในการส่งคำตอบ กรุณาลองอีกครั้ง');
    }
  };

  return (
    <div className="questions-section">
      {questions.map((question) => (
        <div key={question.id} className="question-item">
          <div className="question-header">
            <p className="questioner-name">{question.questionerName}</p>
            <p className="question-text">{question.questionText}</p>
          </div>

          {question.answers && question.answers.length > 0 && (
            <div className="answers-list">
              {question.answers.map((answer) => (
                <div key={answer.id} className="answer-item">
                  <p className="answer-text">
                    <strong>{answer.answererName || 'ไม่ระบุชื่อ'}:</strong> {answer.answerText}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="question-actions">
            <button
              className="add-answer-button"
              onClick={() => {
                setCurrentQuestionId(question.id);
                setIsAnswerModalOpen(true);
              }}
            >
              ตอบ
            </button>
            <button
              className="delete-question-button"
              onClick={() => {
                const passcode_pin = prompt(
                  'กรุณาใส่รหัสผ่าน (passcode_pin) เพื่อลบคำถาม'
                );
                if (passcode_pin) {
                  deleteQuestionById(question.id, passcode_pin);
                }
              }}
            >
              ลบ
            </button>
          </div>
        </div>
      ))}

      {isAnswerModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>ตอบคำถาม</h2>
            <form onSubmit={handleAddAnswer}>
              <div className="form-group">
                <label>ชื่อผู้ตอบ:</label>
                <input
                  type="text"
                  value={answererName}
                  onChange={(e) => setAnswererName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>คำตอบ:</label>
                <textarea
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  required
                />
              </div>
              <div className="form-buttons">
                <button type="submit">ส่งคำตอบ</button>
                <button type="button" onClick={() => setIsAnswerModalOpen(false)}>
                  ยกเลิก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionDetail;