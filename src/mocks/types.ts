export interface Course {
  id: number;
  course_id: string;
  course_id_INT: number;
  name: string;
  nameTH: string;
  description: string
  image: string | null;
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
  courseId: string;
  createdAt: string;
  passcode_pin: string;
}

export interface Question {
  id: number;
  questionText: string;
  questionerName: string | null; 
  courseId: string;
  createdAt: string;
  updatedAt: string;
  answers?: Answer[];
  passcode_pin?: string; 
}

export interface Answer {
  id: number;
  questionId: number;
  answerText: string;
  answererName?: string;
}

export interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  reviewerName: string;
  setReviewerName: (name: string) => void;
  reviewText: string;
  setReviewText: (text: string) => void;
  homeScore: number;
  setHomeScore: (score: number) => void;
  interestScore: number;
  setInterestScore: (score: number) => void;
  grade: string;
  setGrade: (grade: string) => void;
  academicYear: string;
  setAcademicYear: (year: string) => void;
  section: string;
  setSection: (section: string) => void;
  passcodePin: string;
  setPasscodePin: (passcode: string) => void;
}

export interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  questionerName: string;
  setQuestionerName: (name: string) => void;
  questionText: string;
  setQuestionText: (text: string) => void;
  questionPasscodePin: string;
  setQuestionPasscodePin: (passcode: string) => void;
}

export interface ReviewDetailProps {
  reviews: Review[];
  expandedReviewId: number | null;
  handleExpandReview: (reviewId: number) => void;
  handleDeleteReview: (reviewId: number, passcode_pin: string) => void;
}

export interface QuestionDetailProps {
  questions: Question[];
  courseId: string;
  fetchCourse: () => void;
  handleDeleteQuestion: (questionId: number, passcode_pin: string) => void;
}