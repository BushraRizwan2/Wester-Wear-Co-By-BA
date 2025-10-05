
import React, { useState } from 'react';
import type { Review } from '../types';

// Helper component for displaying static star ratings
const StarRatingDisplay: React.FC<{ rating: number; className?: string }> = ({ rating, className = '' }) => (
  <div className={`flex items-center ${className}`}>
    {[...Array(5)].map((_, index) => (
      <svg key={index} className={`w-5 h-5 ${index < Math.round(rating) ? 'text-amber-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

// Helper component for the interactive star rating input
const StarRatingInput: React.FC<{
  rating: number;
  hoverRating: number;
  onRatingChange: (rating: number) => void;
  onHoverChange: (rating: number) => void;
}> = ({ rating, hoverRating, onRatingChange, onHoverChange }) => (
  <div className="flex items-center space-x-1">
    {[...Array(5)].map((_, index) => {
      const ratingValue = index + 1;
      return (
        <button
          key={ratingValue}
          type="button"
          onMouseEnter={() => onHoverChange(ratingValue)}
          onMouseLeave={() => onHoverChange(0)}
          onClick={() => onRatingChange(ratingValue)}
          className={`focus:outline-none transition-colors duration-200 ${ratingValue <= (hoverRating || rating) ? 'text-amber-400' : 'text-gray-300 hover:text-amber-300'}`}
          aria-label={`Rate ${ratingValue} star${ratingValue > 1 ? 's' : ''}`}
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      );
    })}
  </div>
);

interface ProductReviewsProps {
  initialReviews: Review[];
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ initialReviews = [] }) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [errors, setErrors] = useState<{ rating?: string; comment?: string; name?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { rating?: string; comment?: string; name?: string } = {};
    if (newRating === 0) newErrors.rating = 'Please select a rating.';
    if (!newComment.trim()) newErrors.comment = 'Please enter a comment.';
    if (!authorName.trim()) newErrors.name = 'Please enter your name.';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const newReview: Review = {
        id: `R${Date.now()}`,
        author: authorName,
        rating: newRating,
        comment: newComment,
        date: new Date().toISOString(),
      };
      setReviews([newReview, ...reviews]);
      setNewRating(0);
      setNewComment('');
      setAuthorName('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  }

  return (
    <div className="mt-12 pt-8 border-t">
      <h2 className="text-2xl font-serif font-bold mb-6">Customer Reviews</h2>
      
      {reviews.length > 0 && (
        <div className="flex items-center gap-4 mb-8 bg-gray-50 p-4 rounded-lg">
          <StarRatingDisplay rating={averageRating} />
          <p className="text-lg text-text-secondary">
            <span className="font-semibold text-text-primary">{averageRating.toFixed(1)}</span> out of 5 stars
          </p>
          <span className="text-gray-400">|</span>
          <p className="text-lg text-text-secondary">{reviews.length} review{reviews.length !== 1 && 's'}</p>
        </div>
      )}

      <div className="mb-10 bg-surface p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Write a review</h3>
        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Your Rating *</label>
              <StarRatingInput 
                rating={newRating}
                hoverRating={hoverRating}
                onRatingChange={setNewRating}
                onHoverChange={setHoverRating}
              />
              {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-text-primary">Your Review *</label>
              <textarea id="comment" value={newComment} onChange={(e) => setNewComment(e.target.value)} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" placeholder="Share your thoughts on the product..." required />
              {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment}</p>}
            </div>

            <div>
              <label htmlFor="authorName" className="block text-sm font-medium text-text-primary">Your Name *</label>
              <input type="text" id="authorName" value={authorName} onChange={(e) => setAuthorName(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" placeholder="e.g., Jane D." required />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            
            <div className="flex items-center justify-between">
                <button type="submit" className="bg-primary text-white font-bold py-2 px-6 rounded-md hover:bg-primary-dark transition-colors duration-300">
                    Submit Review
                </button>
                {submitted && <p className="text-green-600 font-semibold" role="status">Thank you for your review!</p>}
            </div>
          </div>
        </form>
      </div>

      <div className="space-y-8">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="pb-6 border-b last:border-b-0">
              <div className="flex items-center mb-2">
                <StarRatingDisplay rating={review.rating} />
                <p className="ml-4 font-bold text-text-primary">{review.author}</p>
              </div>
              <p className="text-sm text-text-secondary mb-3">{formatDate(review.date)}</p>
              <p className="text-text-secondary leading-relaxed">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-text-secondary py-8">Be the first to review this product!</p>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;