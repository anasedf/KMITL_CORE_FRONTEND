import React from 'react';
import { QuestionModalProps } from '../../mocks/types';
import '../../Styles/QuestionModal.css';

const QuestionModal: React.FC<QuestionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  questionerName,
  setQuestionerName,
  questionText,
  setQuestionText,
  questionPasscodePin,
  setQuestionPasscodePin,
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div className="question-modal-overlay">
      <div className="question-modal-container">
        <div className="question-modal-header">
          <h2>เพิ่มคำถาม</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="question-modal-form">
          <div className="form-group">
            <label htmlFor="questionerName">ชื่อผู้ถาม</label>
            <input
              id="questionerName"
              type="text"
              value={questionerName}
              onChange={(e) => setQuestionerName(e.target.value)}
              required
              placeholder="ชื่อของคุณ"
            />
          </div>

          <div className="form-group">
            <label htmlFor="questionText">คำถาม</label>
            <textarea
              id="questionText"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              required
              rows={5}
              placeholder="เขียนคำถามของคุณที่นี่..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="questionPasscodePin">รหัสผ่าน</label>
            <input
              id="questionPasscodePin"
              type="password"
              value={questionPasscodePin}
              onChange={(e) => setQuestionPasscodePin(e.target.value)}
              required
              minLength={4}
              maxLength={6}
              placeholder="4-6 ตัวอักษร"
            />
            <p className="input-hint">สำหรับลบคำถามในภายหลัง</p>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              ยกเลิก
            </button>
            <button type="submit" className="submit-button">
              ส่งคำถาม
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionModal;