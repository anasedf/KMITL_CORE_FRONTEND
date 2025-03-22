import React from 'react';
import { QuestionModalProps } from '../../mocks/types';

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

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>เพิ่มคำถาม</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>ชื่อผู้ถาม:</label>
            <input
              type="text"
              value={questionerName}
              onChange={(e) => setQuestionerName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>คำถาม:</label>
            <textarea value={questionText} onChange={(e) => setQuestionText(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Passcode:</label>
            <input
              type="password"
              value={questionPasscodePin}
              onChange={(e) => setQuestionPasscodePin(e.target.value)}
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit">ส่งคำถาม</button>
            <button type="button" onClick={onClose}>
              ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionModal;