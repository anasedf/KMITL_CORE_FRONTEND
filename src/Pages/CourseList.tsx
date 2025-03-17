import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
/* import '../Styles/CourseList.css';
 */import { Course } from './types';

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch('https://fabe-203-150-171-252.ngrok-free.app/api/courses/', { // แทนที่ YOUR_API_ENDPOINT ด้วย URL API ของคุณ
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType) {
          throw new Error('Response has no Content-Type header');
        } else if (!contentType.includes('application/json')) {
          return response.text().then((text) => {
            throw new Error(`Response is not JSON, Content-Type: ${contentType}, Body: ${text}`);
          });
        }
        return response.json();
      })
      .then((data: Course[]) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="course-list">
      {courses.map((course) => (
        <div key={course.course_id} className="course-card">
          <h3>
            <Link to={`/course/${course.id}`}>{course.course_id} | {course.name}</Link>
          </h3>
          <p>{course.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CourseList;