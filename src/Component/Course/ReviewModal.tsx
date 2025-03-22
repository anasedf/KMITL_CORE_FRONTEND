import React from 'react';
import { ReviewModalProps } from '../../mocks/types';

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  reviewerName,
  setReviewerName,
  reviewText,
  setReviewText,
  homeScore,
  setHomeScore,
  interestScore,
  setInterestScore,
  grade,
  setGrade,
  academicYear,
  setAcademicYear,
  section,
  setSection,
  passcodePin,
  setPasscodePin,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>เพิ่มรีวิว</h2>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>ชื่อผู้รีวิว:</label>
            <input type="text" value={reviewerName} onChange={(e) => setReviewerName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>รีวิว:</label>
            <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>คะแนนงานและการบ้าน:</label>
            <select value={homeScore} onChange={(e) => setHomeScore(Number(e.target.value))} required>
              {Array.from({ length: 6 }, (_, score) => (
                <option key={score} value={score}>
                  {score}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>คะแนนความน่าสนใจ:</label>
            <select value={interestScore} onChange={(e) => setInterestScore(Number(e.target.value))} required>
              {Array.from(Array(6).keys()).map((score) => (
                <option key={score} value={score}>
                  {score}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>เกรดที่ได้:</label>
            <input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>ปีการศึกษา:</label>
            <input type="text" value={academicYear} onChange={(e) => setAcademicYear(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Section:</label>
            <input type="text" value={section} onChange={(e) => setSection(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Passcode:</label>
            <input type="password" value={passcodePin} onChange={(e) => setPasscodePin(e.target.value)} required />
          </div>
          <div className="form-buttons">
            <button type="submit">ส่งรีวิว</button>
            <button type="button" onClick={onClose}>
              ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;