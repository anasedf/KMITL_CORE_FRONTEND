import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockCourses, Question } from '../mocks/course';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import '../Styles/Home.css'; // ใช้ CSS เดียวกันกับ Home

const Questions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // ดึงคำถามทั้งหมดจาก mockCourses
    const questions: Question[] = mockCourses.flatMap((course) => course.questions);
    setAllQuestions(questions);
  }, []);

  const filteredQuestions = allQuestions.filter((question) => {
    const course = mockCourses.find((c) => c.questions.some((q) => q.id === question.id));
    if (!course) return false;

    return (
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.course_id.toString().includes(searchTerm) ||
      question.questionText.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <Header />
      <main className="home">
        <h2>Questions</h2>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by course name, ID, or question..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-box"
          />
        </div>

        <div className="course-list">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question) => {
              const course = mockCourses.find((c) => c.questions.some((q) => q.id === question.id));
              if (!course) return null;

              return (
                <div key={question.id} className="course-card">
                  <h3>
                    <Link to={`/course/${course.id}`}>
                      {course.course_id} | {course.name}
                    </Link>
                  </h3>
                  <p>{question.questionText}</p>
                  {question.answers && question.answers.map((answer) => (
                    <p key={answer.id}>Answer: {answer.answerText}</p>
                  ))}
                </div>
              );
            })
          ) : (
            <p>No questions found.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Questions;