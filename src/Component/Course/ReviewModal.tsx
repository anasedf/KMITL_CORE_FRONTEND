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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">เพิ่มรีวิว</h2>
        <form onSubmit={handleSubmit} className="review-form">
          <div className="form-group">
            <label>ชื่อผู้รีวิว:</label>
            <input 
              type="text" 
              value={reviewerName} 
              onChange={(e) => setReviewerName(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label>รีวิว:</label>
            <textarea 
              value={reviewText} 
              onChange={(e) => setReviewText(e.target.value)} 
              required 
              rows={4}
            />
          </div>

          <div className="score-row">
            <div className="form-group score-group">
              <label>คะแนนงานและการบ้าน:</label>
              <select 
                value={homeScore} 
                onChange={(e) => setHomeScore(Number(e.target.value))} 
                required
              >
                {[0, 1, 2, 3, 4, 5].map((score) => (
                  <option key={`home-${score}`} value={score}>
                    {score} ★
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group score-group">
              <label>คะแนนความน่าสนใจ:</label>
              <select 
                value={interestScore} 
                onChange={(e) => setInterestScore(Number(e.target.value))} 
                required
              >
                {[0, 1, 2, 3, 4, 5].map((score) => (
                  <option key={`interest-${score}`} value={score}>
                    {score} ★
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>เกรดที่ได้:</label>
              <input 
                type="text" 
                value={grade} 
                onChange={(e) => setGrade(e.target.value)} 
                required 
                placeholder="A, B+, etc."
              />
            </div>

            <div className="form-group">
              <label>ปีการศึกษา:</label>
              <input 
                type="text" 
                value={academicYear} 
                onChange={(e) => setAcademicYear(e.target.value)} 
                required 
                placeholder="เช่น 2566"
              />
            </div>

            <div className="form-group">
              <label>Section:</label>
              <input 
                type="text" 
                value={section} 
                onChange={(e) => setSection(e.target.value)} 
                required 
                placeholder="เช่น 1"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Passcode (สำหรับลบ):</label>
            <input 
              type="password" 
              value={passcodePin} 
              onChange={(e) => setPasscodePin(e.target.value)} 
              required 
              minLength={4}
              maxLength={6}
            />
            <small className="form-hint">รหัสผ่าน 4-6 ตัวอักษร</small>
          </div>

          <div className="form-buttons">
            <button type="button" className="cancel-btn" onClick={onClose}>
              ยกเลิก
            </button>
            <button type="submit" className="submit-btn">
              ส่งรีวิว
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;