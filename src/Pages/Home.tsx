import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockCourses } from '../mocks/course';
import '../App.css';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State สำหรับเก็บคำค้นหา
  const [courses, setCourses] = useState(mockCourses); // State สำหรับเก็บรายวิชา

  // กรองวิชาตามคำค้นหา
  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <header>
        <h1>KMITLCLAP</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
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
          {filteredCourses.map((course) => (
            <div key={course.id} className="course-card">
              <h3>{course.name}</h3>
              <p>{course.description}</p>
              <Link to={`/course/${course.id}`}>View Details</Link>
            </div>
          ))}
        </div>
      </main>

      <footer>
        <p>Contact us: info@kmitlclap.com</p>
        <p>&copy; 2023 KMITLCLAP. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;