import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../../mocks/types';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  // ฟังก์ชันสุ่มสี
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // สุ่มสีสำหรับ Link
  const random = getRandomColor();

  return (
    <div className="course-card">
      <h3>
        <Link
          to={`/course/${course.course_id}`}
          style={{ color: random }} // กำหนดสีสุ่ม
        >
          {course.course_id} | {course.name}
          <br />
          <span>{course.nameTH}</span>
        </Link>
      </h3>
      <p className="course-description">{course.description}</p>
    </div>
  );
};

export default CourseCard;