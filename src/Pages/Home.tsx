import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockCourses } from '../mocks/course';
import '../App.css';

const Home: React.FC = () => {
  const [courses, setCourses] = useState(mockCourses);

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
        <div className="course-list">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              <img src={course.image} alt={course.name} />
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