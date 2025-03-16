import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockCourses } from '../mocks/course';
import Header from '../Component/Header';
import Footer from '../Component/Footer';
import '../Styles/Home.css';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State สำหรับเก็บคำค้นหา

  // กรองวิชาตามคำค้นหา (ชื่อหรือคำอธิบาย)
  const filteredCourses = mockCourses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      <main className="home">
        <h2>Courses</h2>

        {/* Search Box */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-box"
          />
        </div>

        {/* แสดงรายวิชาที่กรองแล้ว */}
        <div className="course-list">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div key={course.id} className="course-card">
                <h3>{course.name}</h3>
                <p>{course.description}</p>
                <Link to={`/course/${course.id}`}>View Details</Link>
              </div>
            ))
          ) : (
            <p>No courses found.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;