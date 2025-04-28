import React, { useState, useEffect, useRef } from 'react';
import { Review, Course } from '../../mocks/types';
import { postReview } from '../../services/api';
import '../../Styles/course/AddReviewModal.css';

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newReview: Review) => void;
  courses: Course[];
}

const AddReviewModal: React.FC<AddReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  courses,
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [reviewerName, setReviewerName] = useState<string>('');
  const [reviewText, setReviewText] = useState<string>('');
  const [homeScore, setHomeScore] = useState<number>(3);
  const [interestScore, setInterestScore] = useState<number>(3);
  const [grade, setGrade] = useState<string>('');
  const [academicYear, setAcademicYear] = useState<string>('');
  const [section, setSection] = useState<string>('');
  const [passcodePin, setPasscodePin] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showCourseDropdown, setShowCourseDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCourses = courses.filter((course: Course) =>
    course.course_id.toString().includes(searchTerm) ||
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.nameTH.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCourse = courses.find((course: Course) => course.course_id === selectedCourseId);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCourseDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = [
      { field: 'courseId', value: selectedCourseId, name: 'วิชาที่ต้องการรีวิว' },
      { field: 'reviewerName', value: reviewerName, name: 'ชื่อผู้รีวิว' },
      { field: 'reviewText', value: reviewText, name: 'รายละเอียดรีวิว' },
      { field: 'grade', value: grade, name: 'เกรดที่ได้' },
      { field: 'academicYear', value: academicYear, name: 'ปีการศึกษา' },
      { field: 'section', value: section, name: 'Section' },
      { field: 'passcodePin', value: passcodePin, name: 'รหัสผ่าน' },
    ];

    const missingFields = requiredFields.filter(field => !field.value);
    if (missingFields.length > 0) {
      setError(`กรุณากรอกข้อมูลในช่อง: ${missingFields.map(f => f.name).join(', ')}`);
      return;
    }

    if (passcodePin.length < 4 || passcodePin.length > 6) {
      setError('รหัสผ่านต้องมีความยาว 4-6 ตัวอักษร');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const newReview = await postReview({
        reviewerName,
        reviewText,
        homeScore,
        interestScore,
        grade,
        academicYear,
        section,
        courseId: selectedCourseId, // ใช้ string ตาม interface
        passcode_pin: passcodePin,
      });
      
      onSubmit({
        ...newReview,
        id: newReview.id || Math.floor(Math.random() * 10000),
        createdAt: newReview.createdAt || new Date().toISOString(),
      });
      
      onClose();
    } catch (err: any) {
      console.error('Error creating review:', err);
      setError(err.message || 'เกิดข้อผิดพลาดในการส่งรีวิว');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="review-modal-overlay">
      <div className="review-modal-container">
        <div className="review-modal-header">
          <h2>เพิ่มรีวิว</h2>
          <button className="close-button" onClick={onClose} disabled={loading}>
            &times;
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="review-modal-form">
          <div className="form-section">
            <div className="form-group" ref={dropdownRef}>
              <label htmlFor="courseSearch">วิชาที่ต้องการรีวิว *</label>
              <div className="course-search-container">
                <input
                  id="courseSearch"
                  type="text"
                  placeholder="ค้นหาด้วยรหัสหรือชื่อวิชา"
                  value={showCourseDropdown ? searchTerm : (selectedCourse ? `${selectedCourse.course_id} - ${selectedCourse.nameTH}` : '')}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    if (!showCourseDropdown) setShowCourseDropdown(true);
                  }}
                  onFocus={() => setShowCourseDropdown(true)}
                  autoComplete="off"
                  required
                />
                {showCourseDropdown && (
                  <div className="course-dropdown">
                    {filteredCourses.length > 0 ? (
                      filteredCourses.map((course: Course) => (
                        <div
                          key={course.course_id}
                          className="course-option"
                          onClick={() => {
                            setSelectedCourseId(course.course_id);
                            setShowCourseDropdown(false);
                            setSearchTerm('');
                          }}
                        >
                          <strong>{course.course_id}</strong> - {course.nameTH} ({course.name})
                        </div>
                      ))
                    ) : (
                      <div className="no-course">ไม่พบวิชาที่ค้นหา</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="reviewerName">ชื่อผู้รีวิว *</label>
              <input
                id="reviewerName"
                type="text"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="reviewText">รายละเอียดรีวิว *</label>
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
              <label>คะแนนงานและการบ้าน *</label>
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
              <label>คะแนนความน่าสนใจ *</label>
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
              <label htmlFor="grade">เกรดที่ได้ *</label>
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
              <label htmlFor="academicYear">ปีการศึกษา *</label>
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
              <label htmlFor="section">Section *</label>
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
              <label htmlFor="passcodePin">รหัสผ่าน *</label>
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
              <p className="input-hint">สำหรับลบรีวิวในภายหลัง</p>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose} disabled={loading}>
              ยกเลิก
            </button>
            <button 
              type="submit" 
              className="submit-button"
              disabled={loading}
            >
              {loading ? 'กำลังส่ง...' : 'ส่งรีวิว'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviewModal;