const BASE_URL = 'https://kmitlcore-652221121310.asia-southeast1.run.app/api';

// ดึงข้อมูลคอร์สทั้งหมด
export const fetchCourses = async () => {
  const response = await fetch(`${BASE_URL}/courses/`);
  if (!response.ok) throw new Error(`Courses API error: ${response.status}`);
  return response.json();
};

// ดึงข้อมูลรีวิวทั้งหมด
export const fetchReviews = async () => {
  const response = await fetch(`${BASE_URL}/reviews/`);
  if (!response.ok) throw new Error(`Reviews API error: ${response.status}`);
  return response.json();
};

// ดึงข้อมูลคำถามทั้งหมด
export const fetchQuestions = async () => {
  const response = await fetch(`${BASE_URL}/questions/`);
  if (!response.ok) throw new Error(`Questions API error: ${response.status}`);
  return response.json();
};

// ดึงข้อมูลคอร์สตาม ID
export const fetchCourseById = async (courseId: any) => {
  const response = await fetch(`${BASE_URL}/courses/${courseId}`);
  if (!response.ok) throw new Error(`Course API error: ${response.status}`);
  return response.json();
};

// ดึงข้อมูลรีวิวตาม ID Course
export const fetchReviewsByCourseId = async (courseId: any) => {
    const response = await fetch(`${BASE_URL}/reviews/?courseId=${courseId}`);
    if (!response.ok) throw new Error(`Reviews API error: ${response.status}`);
    return response.json();
};

// ดึงข้อมูลคำถามตาม ID Course
export const fetchQuestionsByCourseId = async (courseId: any) => {
    const response = await fetch(`${BASE_URL}/questions/?courseId=${courseId}`);
    if (!response.ok) throw new Error(`Questions API error: ${response.status}`);
    return response.json();
};

// เพิ่มรีวิวใหม่
export const postReview = async (reviewData: any) => {
  const response = await fetch(`${BASE_URL}/reviews/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reviewData),
  });
  if (!response.ok) throw new Error(`Failed to post review: ${response.status}`);
  return response.json();
};

// เพิ่มคำถามใหม่
export const postQuestion = async (questionData: any) => {
    const response = await fetch(`${BASE_URL}/questions/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionData),
    });
    if (!response.ok) throw new Error(`Failed to post question: ${response.status}`);
    return response.json();
};

export const postAnswer = async (answerData: any) => {
  const response = await fetch(`${BASE_URL}/answers/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(answerData),
  });
  if (!response.ok) throw new Error(`Failed to post answer: ${response.status}`);
  return response.json();
};

// ลบรีวิวตาม ID
export const deleteReviewById = async (reviewId: number, passcodePin: string) => {
    const response = await fetch(`${BASE_URL}/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ passcode_pin: passcodePin }),
    });
    if (!response.ok) throw new Error(`Failed to delete review: ${response.status}`);
    return response.json();
};

// ลบคำถามตาม ID
export const deleteQuestionById = async (questionId: number, passcodePin: string) => {
    const response = await fetch(`${BASE_URL}/questions/${questionId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ passcode_pin: passcodePin }),
    });
    if (!response.ok) throw new Error(`Failed to delete question: ${response.status}`);
    return response.json();
};

