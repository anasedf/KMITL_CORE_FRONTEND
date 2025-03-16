import React, { useState } from 'react';

interface AddCourseFormProps {
  onAddCourse: (course: { title: string; description: string; image: string }) => void;
}

const AddCourseForm: React.FC<AddCourseFormProps> = ({ onAddCourse }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCourse({ title, description, image });
    setTitle('');
    setDescription('');
    setImage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Image URL:</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Course</button>
    </form>
  );
};

export default AddCourseForm;