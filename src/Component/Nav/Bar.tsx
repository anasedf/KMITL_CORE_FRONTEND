import { useNavigate } from 'react-router-dom';
import '../../Styles/Nav/Bar.css';

const Bar = () => {
  const navigate = useNavigate();

  const handleQuestionsClick = () => {
    navigate('/', { state: { activeTab: 'questions' } });
  };

  return (
    <div className="bar">
      <div className="logo">
        <img src="/kmitl.png" alt="Cureg Logo" />
        <ul className="nav-links">
          <li><a href="#">รีวิวทั้งหมด</a></li>
          <li><a href="#" onClick={handleQuestionsClick}>คำถามทั้งหมด</a></li>
          <li><a href="#">วิชาทั้งหมด</a></li>
        </ul>
      </div>

      <div className="login-button">
        <a href="#">เกี่ยวกับเรา</a>
      </div>
    </div>
  );
};

export default Bar;