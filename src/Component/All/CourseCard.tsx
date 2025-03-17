import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../../mocks/types'; 

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="course-card">
      <h3>
        <Link to={`/course/${course.course_id}`}>
          {course.course_id} | {course.name}
        </Link>
      </h3>
      <p className="course-description">{course.description}</p>
    </div>
  );
};

export default CourseCard;