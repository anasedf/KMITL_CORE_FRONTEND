// Header.js
import '../../Styles/Nav/Header.css';

const Header = () => {
  const githubLink = 'https://github.com/TxBlnwza/Teamject3'; // แทนที่ด้วยลิงก์ GitHub ของคุณ

  return (
    <header>
      {/* GitHub Logo มุมขวาบน */}
      <div className="github-logo">
        <a href={githubLink} target="_blank" rel="noopener noreferrer">
          <img src='https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg' alt="GitHub Logo" />
        </a>
      </div>

      {/* KMITL Logo ตรงกลาง */}
      <div className="kmitl-logo">
        <img src="/kmitl.png" alt="KMITL Logo" />
      </div>

      {/* ข้อความด้านล่าง */}
      <div className="header-text">
        <h1>ค้นหาและรีวิววิชา GENED</h1>
      </div>
    </header>
  );
};

export default Header;