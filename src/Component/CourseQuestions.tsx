import React, { useState } from 'react';
import axios from 'axios';
import { Question, Answer } from '../mocks/course'; // ปรับ path ตามโครงสร้างไฟล์ของคุณ

interface QuestionDetailProps {
  questions: Question[];
  courseId: number; // เพิ่ม courseId เพื่อใช้ในการส่งคำถาม
  fetchCourse: () => void; // ฟังก์ชันสำหรับดึงข้อมูล course ใหม่
}

const QuestionDetail: React.FC<QuestionDetailProps> = ({ questions, courseId, fetchCourse }) => {
  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(null);
  const [answerText, setAnswerText] = useState('');
  const [answererName, setAnswererName] = useState(''); // เพิ่ม state สำหรับชื่อผู้ตอบ

  // ส่งคำตอบใหม่ไปยัง API
  const handleAddAnswer = async (e: React.FormEvent) => {
    e.preventDefault();

    const newAnswer = {
      questionId: currentQuestionId,
      answerText,
      AnswererName: answererName, // ใช้ชื่อ property ตรงกับ API
    };

    try {
      // ส่งคำตอบใหม่ไปยัง API
      const response = await axios.post(
        `https://92f7-203-150-171-252.ngrok-free.app/api/answers/`,
        newAnswer,
        {
          headers: {
            'ngrok-skip-browser-warning': '69420',
          },
        }
      );

      console.log("API Response:", response.data); // ตรวจสอบ response จาก API

      // ดึงข้อมูล course ใหม่หลังจากส่งคำตอบสำเร็จ
      await fetchCourse();

      // ปิด modal และรีเซ็ตฟอร์ม
      setIsAnswerModalOpen(false);
      setAnswerText('');
      setAnswererName(''); // รีเซ็ตชื่อผู้ตอบ
    } catch (error) {
      console.error("Error submitting answer:", error);
      if (axios.isAxiosError(error)) {
        console.error("API Error Response:", error.response?.data); // ตรวจสอบข้อผิดพลาดจาก API
      } else {
        console.error("Unexpected error:", error);
      }
      alert("เกิดข้อผิดพลาดในการส่งคำตอบ กรุณาลองอีกครั้ง");
    }
  };

  return (
    <div className="questions-section">
      {/* แสดงคำถามและคำตอบ */}
      {questions.map((question) => (
        <div key={question.id} className="question-item">
          <p className="question-text">
            <strong>{question.questionerName}:</strong> {question.questionText}
          </p>

          {/* ปุ่มตอบคำถาม */}
          <button
            className="add-answer-button"
            onClick={() => {
              setCurrentQuestionId(question.id);
              setIsAnswerModalOpen(true);
            }}
          >
            ตอบ
          </button>

          {/* แสดงคำตอบ */}
          {question.answers && question.answers.map((answer) => (
            <p key={answer.id} className="answer-text">
              <strong>คำตอบจาก {answer.AnswererName}:</strong> {answer.answerText}
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
              <button type="submit">ส่งคำตอบ</button>
              <button type="button" onClick={() => setIsAnswerModalOpen(false)}>
                ยกเลิก
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionDetail;