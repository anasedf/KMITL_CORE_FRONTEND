import { useNavigate, Link } from 'react-router-dom';
import '../../Styles/Nav/Bar.css';

const Bar = () => {
  const navigate = useNavigate();

  const handleNavigation = (tab: 'questions' | 'courses') => {
    navigate('/', { state: { activeTab: tab } });
  };

  return (
    <div className="bar">
      <div className="logo">
        <Link to="/" className="kmitl-logo">
          <img src="/kmitl.png" alt="KMITL Logo" />
        </Link>
        <ul className="nav-links">
          <li><a href="">รีวิวทั้งหมด</a></li>
          <li><a href="" onClick={() => handleNavigation('questions')}>คำถามทั้งหมด</a></li>
          <li><a href="" onClick={() => handleNavigation('courses')}>วิชาทั้งหมด</a></li>
        </ul>
      </div>

      <Link to="/about" className='about-me'>
        <span className="about-text">เกี่ยวกับเรา</span>
        <div className="about-logo">ℹ</div>
      </Link>
    </div>
  );
};

export default Bar;
