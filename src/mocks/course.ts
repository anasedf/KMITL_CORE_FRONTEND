export interface Course {
  id: number;
  name: string;
  description: string;
  image: string;
  reviews: Review[]; // ตรวจสอบว่ามี reviews
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

export const mockCourses: Course[] = [
  {
    id: 1,
    name: 'Introduction to React',
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
  },
  {
    id: 2,
    name: 'Advanced TypeScript',
    description: 'Deep dive into TypeScript.',
    image: 'https://via.placeholder.com/150',
    reviews: [],
  },
];