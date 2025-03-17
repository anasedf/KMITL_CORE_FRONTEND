import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import CourseDetail from './Pages/CourseDetail';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course/:courseId" element={<CourseDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
