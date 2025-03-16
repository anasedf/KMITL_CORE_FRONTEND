import { Link } from 'react-router-dom';
import '../Styles/Header.css';

const Header = () => {
    return (
        <header>
            <img src="kmitl.png" alt="KMITL Logo" /> {/* เพิ่ม alt attribute */}
            <h1>ค้นหาและรีวิววิชา GENED</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/questions">Questions</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;