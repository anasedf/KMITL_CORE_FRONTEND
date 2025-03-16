export interface Course {
  id: number;
  course_id: number;
  name: string;
  description: string;
  image: string;
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
}

export interface Question {
  id: number;
  questionText: string;
  answers?: Answer[];
}

export interface Answer {
  id: number;
  answerText: string;
}

export const mockCourses: Course[] = [
  {
    id: 1,
    course_id: 90642211,
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
      },
      {
        id: 2,
        reviewerName: 'Jane Smith',
        reviewText: 'Very informative.',
        homeScore: 7,
        interestScore: 8,
        grade: 'B',
        academicYear: '2023',
        section: 'B2',
      },
    ],
    questions: [
      {
        id: 1,
        questionText: 'Is prior programming experience required?',
        answers: [
          {
            id: 1,
            answerText: 'No, it is not required.',
          },
        ],
      },
      {
        id: 2,
        questionText: 'How long does the course take?',
        answers: [
          {
            id: 2,
            answerText: 'About 10 weeks.',
          },
        ],
      },
      {
        id: 3,
        questionText: 'What are the main topics covered?',
        answers: [
          {
            id: 3,
            answerText: 'Basic syntax, data structures, and algorithms.',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    course_id: 90644888,
    name: 'PRESENT LIKE A PRO',
    description: 'Deep dive into TypeScript.',
    image: 'https://via.placeholder.com/150',
    reviews: [
      {
        id: 3,
        reviewerName: 'John Doe',
        reviewText: 'Great course!',
        homeScore: 8,
        interestScore: 9,
        grade: 'A',
        academicYear: '2023',
        section: 'A1',
      },
    ],
    questions: [
      {
        id: 4,
        questionText: 'Is this course suitable for beginners?',
        answers: [
          {
            id: 4,
            answerText: 'Yes, it is.',
          },
        ],
      },
      {
        id: 5,
        questionText: 'What software is required for this course?',
        answers: [
          {
            id: 5,
            answerText: 'PowerPoint or similar presentation software.',
          },
          {
            id: 6,
            answerText: 'GGG.',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    course_id: 90644888,
    name: 'PRESENT LIKE A PRO',
    description: 'Deep dive into TypeScript.',
    image: 'https://via.placeholder.com/150',
    reviews: [],
    questions: [],
  },
  {
    id: 4,
    course_id: 90644888,
    name: 'PRESENT LIKE A PRO',
    description: 'Deep dive into TypeScript.',
    image: 'https://via.placeholder.com/150',
    reviews: [],
    questions: [],
  },
  {
    id: 5,
    course_id: 90644888,
    name: 'PRESENT LIKE A PRO',
    description: 'Deep dive into TypeScript.',
    image: 'https://via.placeholder.com/150',
    reviews: [],
    questions: [],
  },
];