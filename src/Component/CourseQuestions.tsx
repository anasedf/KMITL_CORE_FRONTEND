import React, { useState } from 'react';
import axios from 'axios';
import { Question, Answer } from '../mocks/course'; // ปรับ path ตามโครงสร้างไฟล์ของคุณ
import '../Styles/CourseQuestion.css';

interface QuestionDetailProps {
  questions: Question[];
  courseId: number;
  fetchCourse: () => void;
  handleDeleteQuestion: (questionId: number, passcode_pin: string) => void; // เพิ่ม prop นี้
}

const QuestionDetail: React.FC<QuestionDetailProps> = ({
  questions,
  courseId,
  fetchCourse,
  handleDeleteQuestion, // รับ prop นี้
}) => {
  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(null);
  const [answerText, setAnswerText] = useState('');
  const [answererName, setAnswererName] = useState('');

  const handleAddAnswer = async (e: React.FormEvent) => {
    e.preventDefault();

    // ตรวจสอบว่าข้อมูลครบถ้วนและถูกต้อง
    if (!currentQuestionId) {
      alert("ไม่พบคำถามที่ต้องการตอบ");
      return;
    }
    if (!answerText || answerText.trim() === "") {
      alert("กรุณากรอกคำตอบ");
      return;
    }
    if (!answererName || answererName.trim().length < 3) {
      alert("ชื่อผู้ตอบต้องมีความยาวอย่างน้อย 3 ตัวอักษร");
      return;
    }

    const newAnswer = {
      questionId: currentQuestionId,
      answerText,
      answererName: answererName, // ใช้ key ตามที่ API คาดหวัง
    };

    console.log("Data being sent to API:", newAnswer); // Debug: ตรวจสอบข้อมูลที่ส่งไป

    try {
      const response = await axios.post(
        `https://92f7-203-150-171-252.ngrok-free.app/api/answers/`,
        newAnswer,
        {
          headers: {
            'ngrok-skip-browser-warning': '69420',
          },
        }
      );
      console.log("API Response:", response.data); // Debug: ตรวจสอบ response จาก API

      await fetchCourse(); // Refresh course data after submitting answer

      setIsAnswerModalOpen(false);
      setAnswerText('');
      setAnswererName('');
    } catch (error) {
      console.error("Error submitting answer:", error);
      if (axios.isAxiosError(error)) {
        console.error("API Error Response:", error.response?.data); // Debug: ตรวจสอบข้อผิดพลาดจาก API
        if (error.response?.data.errors) {
          console.error("Validation Errors:", error.response.data.errors); // Debug: ตรวจสอบ validation errors
        }
      } else {
        console.error("Unexpected error:", error);
      }
      alert("เกิดข้อผิดพลาดในการส่งคำตอบ กรุณาลองอีกครั้ง");
    }
  };

  return (
    <div className="questions-section">
      {questions.map((question) => (
        <div key={question.id} className="question-item">
          {/* แยกชื่อคนถามและคำถาม */}
          <div className="question-header">
            <p className="questioner-name">{question.questionerName}</p>
            <p className="question-text">{question.questionText}</p>
          </div>

          {/* ย้ายปุ่มไปไว้ที่มุมขวา */}
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
                const passcode_pin = prompt('กรุณาใส่รหัสผ่าน (passcode_pin) เพื่อลบคำถาม');
                if (passcode_pin) {
                  handleDeleteQuestion(question.id, passcode_pin);
                }
              }}
            >
              ลบ
            </button>
          </div>

          {/* แสดงคำตอบ */}
          {question.answers && question.answers.map((answer) => (
            <p key={answer.id} className="answer-text">
              <strong>{answer.answererName || "ไม่ระบุชื่อ"}:</strong> {answer.answerText}
            </p>
          ))}
        </div>
      ))}

      {/* ฟอร์มตอบคำถาม */}
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