import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import CourseDetail from './Pages/CourseDetail';
import Questions from './Pages/Question';
import CourseList from './Pages/CourseList';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:courseId" element={<CourseDetail />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/courseList" element={<CourseList />} />
      </Routes>
    </Router>
  );
};

export default App;
