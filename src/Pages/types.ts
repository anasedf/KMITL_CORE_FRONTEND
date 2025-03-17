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
    id: number;
    reviewerName: string;
    reviewText: string;
  }