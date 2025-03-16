export interface Course {
  id: number;
  name: string;
  description: string;
  image: string;
  reviews: Review[];
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
}

export const mockCourses: Course[] = [
  {
    id: 1,
    name: 'Introduction to React',
    description: 'Learn the basics of React.',
    image: 'https://via.placeholder.com/150',
    reviews: [],
  },
  {
    id: 2,
    name: 'Advanced TypeScript',
    description: 'Deep dive into TypeScript.',
    image: 'https://via.placeholder.com/150',
    reviews: [],
  },
];

export const mockReviews: Review[] = [
  {
    id: 1,
    rating: 5,
    comment: 'Great course!',
  },
  {
    id: 2,
    rating: 4,
    comment: 'Very informative.',
  },
];