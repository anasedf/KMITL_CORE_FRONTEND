export interface Course {
  id: number;
  course_id: number;
  name: string;
  description: string;
  image?: string | null; // เปลี่ยนจาก image: string เป็น image?: string | null
  reviews: Review[];
  questions: Question[];
}

export interface Review {
  id: number;
  reviewerName: string;
  reviewText: string;
  homeScore: number;
  interestScore: number;
  grade: string;
  academicYear: string;
  section: string;
  courseId: number;
  passcode_pin: string;
}

export interface Question {
  id: number;
  questionText: string;
  questionerName: string; // เปลี่ยนจาก questionerName? เป็น questionerName
  answers?: Answer[];
}

export interface Answer {
  id: number;
  answererName: string; // เปลี่ยนจาก AnswererName? เป็น AnswererName
  answerText: string;
}

export const mockCourses: Course[] = [
  {
    id: 1,
    course_id: 90642111,
    name: 'CODING WITH PYTHON',
    description: 'Learn the basics of React.',
    image: 'https://via.placeholder.com/150',
    reviews: [
      {
        id: 1,
        reviewerName: 'John Doe',
        reviewText: 'Great course!',
        homeScore: 8,
        interestScore: 9,
        grade: 'A',
        academicYear: '2023',
        section: 'A1',
        passcode_pin: '111',
        courseId: 90642111,
      },
      {
        id: 2,
        reviewerName: 'Jane Smith',
        reviewText: 'Very informative.',
        homeScore: 7,
        interestScore: 8,
        grade: 'B',
        academicYear: '2023',
        section: 'B1',
        courseId: 90642111,
        passcode_pin: '111aaa',
      },
    ],
    questions: [
      {
        id: 1,
        questionText: 'Is prior programming experience required?',
        questionerName: 'User123', // เพิ่ม questionerName
        answers: [
          {
            id: 1,
            answererName: 'Admin', // เพิ่ม AnswererName
            answerText: 'No, it is not required.',
          },
        ],
      },
      {
        id: 2,
        questionText: 'How long does the course take?',
        questionerName: 'User456', // เพิ่ม questionerName
        answers: [
          {
            id: 2,
            answererName: 'Admin', // เพิ่ม AnswererName
            answerText: 'About 10 weeks.',
          },
        ],
      },
      {
        id: 3,
        questionText: 'What are the main topics covered?',
        questionerName: 'User789', // เพิ่ม questionerName
        answers: [
          {
            id: 3,
            answererName: 'Admin', // เพิ่ม AnswererName
            answerText: 'Basic syntax, data structures, and algorithms.',
          },
        ],
      },
    ],
  },
  // ค่า mock อื่นๆ ที่เหลือ
];