import { Link } from 'react-router-dom';
import '../../Styles/Nav/Header.css';

const Header = () => {

  return (
    <header>

      <div className='tab'>
        <div className="kmitl-logo">
          <Link to="/" className="kmitl-logo">
            <img src="/kmitl.png" alt="KMITL Logo" />
          </Link>
        </div>
        <div className="header-text">
          <h1>ค้นหาและรีวิววิชา GENED</h1>
        </div>

        <Link to="/about" className='about-me'>
          <span className="about-text">เกี่ยวกับเรา</span>
          <div className="about-logo">ℹ</div>
        </Link>
      </div>


    </header>
  );
};

export default Header;