import React, { useState } from 'react';

interface ReviewModalProps {
  onClose: () => void;
  onSubmit: (review: { rating: number; comment: string }) => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ rating, comment });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Review</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Rating:</label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              min="1"
              max="5"
              required
            />
          </div>
          <div>
            <label>Comment:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;