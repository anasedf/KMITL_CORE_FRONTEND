import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../Component/Nav/Header';
import Footer from '../Component/Nav/Footer';
import ReviewDetail from '../Component/CourseReviews';
import QuestionDetail from '../Component/CourseQuestions';
import { Question, Answer } from '../mocks/course'; // นำเข้า interface จากไฟล์นี้
import '../Styles/Coursedetail.css';

interface Review {
  id: number;
  reviewerName: string;
  reviewText: string;
  homeScore: number;
  interestScore: number;
  grade: string;
  academicYear: string;
  section: string;
  courseId: number;
  passcode_pin: string;
}

interface Course {
  id: number;
  course_id: number;
  name: string;
  description: string;
  image: string | null;
  reviews: Review[];
  questions: Question[]; // ใช้ Question จาก ../mocks/course
}

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [homeScore, setHomeScore] = useState(0);
  const [interestScore, setInterestScore] = useState(0);
  const [grade, setGrade] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [section, setSection] = useState('');
  const [passcodePin, setPasscodePin] = useState(''); // สำหรับรีวิว
  const [expandedReviewId, setExpandedReviewId] = useState<number | null>(null);
  const [showReviews, setShowReviews] = useState(true);
  const [showQuestions, setShowQuestions] = useState(false);

  // สำหรับการเพิ่มคำถาม
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [questionerName, setQuestionerName] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [questionPasscodePin, setQuestionPasscodePin] = useState(''); // สำหรับคำถาม

  // Fetch course data from API
  const fetchCourse = async () => {
    try {
      const response = await axios.get(
        `https://course-review-back-app-741869911637.asia-southeast1.run.app/api/courses/${courseId}`,
        {
          headers: {
            'ngrok-skip-browser-warning': '69420',
          },
        }
      );
      setCourse(response.data); // Update course state
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  // คำนวณค่าเฉลี่ยและแปลงเป็นเปอร์เซ็นต์
  const calculateAverageScore = (scoreType: 'homeScore' | 'interestScore') => {
    if (!course?.reviews.length) return 0;
    const totalScore = course.reviews.reduce((sum, review) => sum + review[scoreType], 0);
    const averageScore = totalScore / course.reviews.length;
    return Math.round((averageScore / 5) * 100); // แปลงเป็นเปอร์เซ็นต์
  };

  const homeScoreAverage = calculateAverageScore('homeScore');
  const interestScoreAverage = calculateAverageScore('interestScore');

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();

    const newReview = {
      courseId: course?.course_id,
      reviewerName,
      reviewText,
      homeScore,
      interestScore,
      grade,
      academicYear,
      section,
      passcode_pin: passcodePin, // เพิ่ม passcode_pin
    };

    try {
      await axios.post(
        `https://course-review-back-app-741869911637.asia-southeast1.run.app/api/reviews/`,
        newReview,
        {
          headers: {
            'ngrok-skip-browser-warning': '69420',
          },
        }
      );
      await fetchCourse(); // Refresh course data after submitting review

      setIsModalOpen(false);
      setReviewerName('');
      setReviewText('');
      setHomeScore(0);
      setInterestScore(0);
      setGrade('');
      setAcademicYear('');
      setSection('');
      setPasscodePin('');
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("เกิดข้อผิดพลาดในการส่งรีวิว กรุณาลองอีกครั้ง");
    }
  };

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();

    const newQuestion = {
      courseId: course?.course_id,
      questionerName,
      questionText,
      passcode_pin: questionPasscodePin, // เพิ่ม passcode_pin
    };

    try {
      await axios.post(
        `https://course-review-back-app-741869911637.asia-southeast1.run.app/api/questions/`,
        newQuestion,
        {
          headers: {
            'ngrok-skip-browser-warning': '69420',
          },
        }
      );
      await fetchCourse(); // Refresh course data after submitting question

      setIsQuestionModalOpen(false);
      setQuestionerName('');
      setQuestionText('');
      setQuestionPasscodePin('');
    } catch (error) {
      console.error("Error submitting question:", error);
      alert("เกิดข้อผิดพลาดในการส่งคำถาม กรุณาลองอีกครั้ง");
    }
  };

  const handleDeleteReview = async (reviewId: number, passcode_pin: string) => {
    try {
      console.log("Deleting review with ID:", reviewId);
      console.log("Using passcode_pin:", passcode_pin);

      const response = await axios.delete(
        `https://course-review-back-app-741869911637.asia-southeast1.run.app/api/reviews/${reviewId}`,
        {
          headers: {
            'ngrok-skip-browser-warning': '69420',
          },
          data: { passcode_pin }, // ส่ง passcode_pin ไปกับ request
        }
      );

      console.log("API Response:", response.data); // Debug: ตรวจสอบ response จาก API

      await fetchCourse(); // Refresh course data after deleting review
    } catch (error) {
      console.error("Error deleting review:", error);
      if (axios.isAxiosError(error)) {
        console.error("API Error Response:", error.response?.data); // Debug: ตรวจสอบข้อผิดพลาดจาก API
      }
      alert("เกิดข้อผิดพลาดในการลบรีวิว กรุณาตรวจสอบ passcode และลองอีกครั้ง");
    }
  };

  const handleDeleteQuestion = async (questionId: number, passcode_pin: string) => {
    try {
      console.log("Deleting question with ID:", questionId);
      console.log("Using passcode_pin:", passcode_pin);

      const response = await axios.delete(
        `https://course-review-back-app-741869911637.asia-southeast1.run.app/api/questions/${questionId}`,
        {
          headers: {
            'ngrok-skip-browser-warning': '69420',
          },
          data: { passcode_pin }, // ส่ง passcode_pin ไปกับ request
        }
      );

      console.log("API Response:", response.data); // Debug: ตรวจสอบ response จาก API

      await fetchCourse(); // Refresh course data after deleting question
    } catch (error) {
      console.error("Error deleting question:", error);
      if (axios.isAxiosError(error)) {
        console.error("API Error Response:", error.response?.data); // Debug: ตรวจสอบข้อผิดพลาดจาก API
      }
      alert("เกิดข้อผิดพลาดในการลบคำถาม กรุณาตรวจสอบ passcode และลองอีกครั้ง");
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <main className="course-detail">
        <div className="course-header">
          <h1>{course.name}</h1>
          <p className="course-description">{course.description}</p>
          {course.image && (
            <img src={course.image} alt={course.name} className="course-image" />
          )}
        </div>

        <div className="score-summary">
          <Link to="/" className="home-button">Home</Link>
          <h2>คะแนนภาพรวม</h2>
          <div className="score-bars">
            <div className="score-bar">
              <label>จำนวนงานและการบ้าน</label>
              <div className="bar">
                <div className="fill" style={{ width: `${homeScoreAverage}%` }}></div>
              </div>
              <span className="score">{homeScoreAverage}%</span>
            </div>
            <div className="score-bar">
              <label>ความน่าสนใจของเนื้อหา</label>
              <div className="bar">
                <div className="fill" style={{ width: `${interestScoreAverage}%` }}></div>
              </div>
              <span className="score">{interestScoreAverage}%</span>
            </div>
            <div className="score-bar">
              <label>การสอนของอาจารย์</label>
              <div className="bar">
                <div className="fill" style={{ width: `${(homeScoreAverage + interestScoreAverage) / 2}%` }}></div>
              </div>
              <span className="score">{(homeScoreAverage + interestScoreAverage) / 2}%</span>
            </div>
          </div>
        </div>

        <div className="toggle-sections">
          <button
            className={`toggle-button ${showReviews ? 'active' : ''}`}
            onClick={() => {
              setShowReviews(true);
              setShowQuestions(false);
            }}
          >
            รีวิวทั้งหมด
          </button>
          <button
            className={`toggle-button ${showQuestions ? 'active' : ''}`}
            onClick={() => {
              setShowReviews(false);
              setShowQuestions(true);
            }}
          >
            คำถามทั้งหมด
          </button>
        </div>

        {showReviews && (
          <div className="reviews-section">
            <div className="reviews-header">
              <h2>รีวิวทั้งหมด</h2>
              <button className="add-review-button" onClick={() => setIsModalOpen(true)}>รีวิววิชานี้</button>
            </div>
            {course.reviews.length > 0 ? (
              <ReviewDetail
                reviews={course.reviews}
                expandedReviewId={expandedReviewId}
                handleExpandReview={(reviewId: number) =>
                  setExpandedReviewId(expandedReviewId === reviewId ? null : reviewId)
                }
                handleDeleteReview={handleDeleteReview} // ส่งฟังก์ชันลบรีวิว
              />
            ) : (
              <p>ไม่มีรีวิวสำหรับคอร์สนี้</p>
            )}
          </div>
        )}

        {showQuestions && (
          <div className="questions-section">
            <div className="questions-header">
              <h2>คำถามทั้งหมด</h2>
              <button
                className="add-question-button"
                onClick={() => setIsQuestionModalOpen(true)}
              >
                เพิ่มคำถาม
              </button>
            </div>
            {course.questions.length > 0 ? (
              <QuestionDetail
                questions={course.questions}
                courseId={course.course_id}
                fetchCourse={fetchCourse}
                handleDeleteQuestion={handleDeleteQuestion} // ส่งฟังก์ชันลบคำถาม
              />
            ) : (
              <p>ไม่มีคำถามสำหรับคอร์สนี้</p>
            )}
          </div>
        )}
      </main>
      <Footer />

      {/* Modal สำหรับเพิ่มรีวิว */}
      {isModalOpen && (
  <div className="modal-overlay">
    <div className="modal">
      <h2>เพิ่มรีวิว</h2>
      <form onSubmit={handleAddReview}>
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
          />
        </div>
        <div className="form-group">
          <label>คะแนนงานและการบ้าน:</label>
          <select
            value={homeScore}
            onChange={(e) => setHomeScore(Number(e.target.value))}
            required
          >
            {Array.from({ length: 6 }, (_, score) => (
              <option key={score} value={score}>
                {score}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>คะแนนความน่าสนใจ:</label>
          <select
            value={interestScore}
            onChange={(e) => setInterestScore(Number(e.target.value))}
            required
          >
            {Array.from(Array(6).keys()).map((score) => (
              <option key={score} value={score}>
                {score}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>เกรดที่ได้:</label>
          <input
            type="text"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>ปีการศึกษา:</label>
          <input
            type="text"
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Section:</label>
          <input
            type="text"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Passcode:</label>
          <input
            type="password"
            value={passcodePin}
            onChange={(e) => setPasscodePin(e.target.value)}
            required
          />
        </div>
        <div className="form-buttons">
          <button type="submit">ส่งรีวิว</button>
          <button type="button" onClick={() => setIsModalOpen(false)}>
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  </div>
)}
      {isQuestionModalOpen && (
  <div className="modal-overlay">
    <div className="modal">
      <h2>เพิ่มคำถาม</h2>
      <form onSubmit={handleAddQuestion}>
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
          <button type="submit">ส่งคำถาม</button>
          <button type="button" onClick={() => setIsQuestionModalOpen(false)}>
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

export default CourseDetail;