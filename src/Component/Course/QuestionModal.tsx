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
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 style={{ marginBottom: '1.5rem' }}>เพิ่มคำถาม</h2>
        <form onSubmit={handleSubmit}>
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
            <textarea 
              value={questionText} 
              onChange={(e) => setQuestionText(e.target.value)} 
              required 
              rows={4}
            />
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
            <button type="button" onClick={onClose}>
              ยกเลิก
            </button>
            <button type="submit">
              ส่งคำถาม
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionModal;