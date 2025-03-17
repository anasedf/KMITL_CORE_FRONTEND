export interface Course {
  course_id: string;
  course_id_INT: number;
  description: string;
  id: number;
  image: string | null;
  name: string;
  nameTH: string;
  reviews: Review[];
}

export interface Review {
  reviewerName: string;
  reviewText: string;
  homeScore: number;
  interestScore: number;
  grade: string;
  academicYear: string;
  section: string;
  courseId: string;
}

export interface Question {
  id: number;
  questionText: string;
  questionerName: string | null; // Allow null
  courseId: string;
  createdAt: string;
  updatedAt: string;
  passcode_pin?: string; // Optional property
}
