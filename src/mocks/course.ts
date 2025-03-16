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
    image: 'https://cdn.discordapp.com/attachments/1043163353687793704/1350793755636138015/images.png?ex=67d80837&is=67d6b6b7&hm=270faeca9bf205bcbfdc107918ef02a46e793e503e59c79afc6c95686e872035&',
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