import React from 'react';
import { ReviewModalProps } from '../../mocks/types';
import '../../Styles/ReviewModal.css';

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
    <div className="review-modal-overlay">
      <div className="review-modal-container">
        <div className="review-modal-header">
          <h2>เพิ่มรีวิว</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="review-modal-form">
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="reviewerName">ชื่อผู้รีวิว</label>
              <input
                id="reviewerName"
                type="text"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reviewText">รายละเอียดรีวิว</label>
              <textarea
                id="reviewText"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
                rows={5}
              />
            </div>
          </div>

          <div className="form-section score-section">
            <div className="form-group">
              <label>คะแนนงานและการบ้าน</label>
              <div className="score-select-container">
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
            </div>

            <div className="form-group">
              <label>คะแนนความน่าสนใจ</label>
              <div className="score-select-container">
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
          </div>

          <div className="form-section grid-section">
            <div className="form-group">
              <label htmlFor="grade">เกรดที่ได้</label>
              <input
                id="grade"
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                required
                placeholder="เช่น A, B+"
              />
            </div>

            <div className="form-group">
              <label htmlFor="academicYear">ปีการศึกษา</label>
              <input
                id="academicYear"
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                required
                placeholder="เช่น 2566"
              />
            </div>

            <div className="form-group">
              <label htmlFor="section">Section</label>
              <input
                id="section"
                type="text"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                required
                placeholder="เช่น 1"
              />
            </div>
          </div>

          <div className="form-section">
            <div className="form-group">
              <label htmlFor="passcodePin">รหัสผ่าน</label>
              <input
                id="passcodePin"
                type="password"
                value={passcodePin}
                onChange={(e) => setPasscodePin(e.target.value)}
                required
                minLength={4}
                maxLength={6}
                placeholder="4-6 ตัวอักษร"
              />
              <p className="input-hint">สำหรับแก้ไข/ลบรีวิวในภายหลัง</p>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              ยกเลิก
            </button>
            <button type="submit" className="submit-button">
              ส่งรีวิว
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;