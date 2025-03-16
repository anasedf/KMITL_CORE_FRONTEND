// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Header.css';

const Header = () => {
  return (
    <header>
      <img src="/kmitl.png" alt="KMITL Logo" /> {/* ใช้ path /kmitl.png */}
      <h1>ค้นหาและรีวิววิชา GENED</h1>
    </header>
  );
};

export default Header;