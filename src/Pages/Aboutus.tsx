// src/pages/AboutUsPage.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import '../Styles/pages//aboutus.css'; // เราจะสร้างไฟล์ CSS แยก
import { useNavigate } from 'react-router-dom';
import Footer from '../Component/Nav/Footer';
interface TeamMember {
  id: number;
  fullName: string;
  nickname: string;
  studentId: string;
  role: string;
  imageUrl: string;
  skills: string[];
}

const AboutUsPage: React.FC = () => {
  const navigate = useNavigate();

  const teamMembers: TeamMember[] = [
    {
      id: 1, 
      fullName: 'Wuttipat Aiemsomboonsuk',
      nickname: 'nguan',
      studentId: '65011012',
      role: 'Frontend Developer',
      imageUrl: 'https://raw.githubusercontent.com/TxBlnwza/picture/refs/heads/main/nguan.png',
      skills: ['React', 'TypeScript', 'CSS']
    },
    {
      id: 2,
      fullName: 'Anas Niloh',
      nickname: 'nut',
      studentId: '65011173',
      role: 'Frontend Developer',
      imageUrl: 'https://raw.githubusercontent.com/TxBlnwza/picture/refs/heads/main/nut.jpg',
      skills: ['React', 'TypeScript', 'CSS']
    },
    {
      id: 3,
      fullName: 'Pasin Ratcharuk',
      nickname: 'champ',
      studentId: '65010711',
      role: 'Backend Developer',
      imageUrl: 'https://raw.githubusercontent.com/TxBlnwza/picture/refs/heads/main/champ1.png',
      skills: ['Bun', 'ElysiaJs', 'Prisma', 'PostgreSQL']
    },
    {
      id: 4,
      fullName: 'Paris Rongdech',
      nickname: 'Paris',
      studentId: '65010698',
      role: 'Backend Developer',
      imageUrl: 'https://raw.githubusercontent.com/TxBlnwza/picture/refs/heads/main/paris.png',
      skills: ['Bun', 'ElysiaJs', 'Prisma', 'PostgreSQL']
    },
    {
      id: 5,
      fullName: 'Sorawich Yimsara',
      nickname: 'wit',
      studentId: '65011078',
      role: 'UX/UI Designer',
      imageUrl: 'https://raw.githubusercontent.com/TxBlnwza/picture/refs/heads/main/wit1.png',
      skills: ['Figma', 'Adobe XD', 'Photoshop']
    }
  ];

  return (
    <div className="about-us-page">
      {/* Hero Section */}
      <section className="hero-section text-center py-5">
        <Container>
          <h1 className="display-4 fw-bold mb-3">ทีมพัฒนาเว็บไซต์</h1>
          <p className="lead mb-4">เราคือทีมนักศึกษาที่รักในการพัฒนาเว็บไซต์และอยากสร้างสิ่งดีๆ ให้กับผู้ใช้</p>
          <Button variant="outline-primary" size="lg" onClick={() => navigate('/')}>
            กลับหน้าหลัก
          </Button>
        </Container>
      </section>

      {/* Team Members Section */}
      <section className="team-section py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">สมาชิกในทีม</h2>
          <Row xs={1} md={2} lg={3} className="g-4">
            {teamMembers.map((member) => (
              <Col key={member.id}>
                <Card className="h-100 shadow-sm border-0">
                  <div className="profile-header">
                    <div className="profile-image-container">
                      <Card.Img 
                        variant="top" 
                        src={member.imageUrl} 
                        alt={member.fullName}
                        className="profile-image"
                      />
                    </div>
                    <div className="profile-overlay">
                      <h5 className="text-white">{member.nickname}</h5>
                    </div>
                  </div>
                  <Card.Body>
                    <Card.Title>{member.fullName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{member.role}</Card.Subtitle>
                    <div className="mt-3">
                      <h6 className="mb-2">ทักษะ:</h6>
                      <div className="d-flex flex-wrap gap-2">
                        {member.skills.map((skill, index) => (
                          <span key={index} className="badge bg-secondary">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-white border-0">
                    <small className="text-muted">รหัสนักศึกษา: {member.studentId}</small>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <Footer />
    </div>
  );
};

export default AboutUsPage;