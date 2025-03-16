import React from 'react';
import { mockCourses } from '../mocks/course';

const CourseList: React.FC = () => {
  return (
    <div>
      <h1>Courses</h1>
      <ul>
        {mockCourses.map((course) => (
          <li key={course.id}>
            <h2>{course.name}</h2>
            <p>{course.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;