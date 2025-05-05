'use client';
import { Review } from '@/types/review';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useGetReviewQuery, useUpdateVoteMutation } from '@/redux/services/reviewApi';
import getToken from '@/Helpers/getToken';

export default function ReviewDetails({ reviewItem }: { reviewItem: Review | null }) {
  const router = useRouter();
  const [isHelpful, setIsHelpful] = useState(0);
  const [isNotHelpful, setIsNotHelpful] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  // RTK Query hooks with proper undefined handling
  const { data: review, isLoading, isError, refetch } = useGetReviewQuery(reviewItem?.id || '');
  // console.log('Review:', review);
  // console.log('Review Item:', reviewItem);


  const [updateVote, { isLoading: isUpdating }] = useUpdateVoteMutation();

  // Handle case where neither review nor initialReview exists
  if (!reviewItem && !review) {
    return <div className="max-w-4xl mx-auto px-4 py-6 bg-gray-50">Review not found</div>;
  }
 
  const currentReview = review?.data

 
  
  // Type guard to ensure currentReview exists
  if (!currentReview) {
    return <div className="max-w-4xl mx-auto px-4 py-6 bg-gray-50">Review not found</div>;
  }

  const handleBack = () => router.back();

  const handleVote = async (type: 'upVotes' | 'downVotes') => {
    try {
      setError(null);
      
      // Optimistic UI updates
      if (type === 'upVotes') {
        setIsHelpful(1);
        setIsNotHelpful(0);
      } else {
        setIsNotHelpful(1);
        setIsHelpful(0);
      }

      await updateVote({
        reviewId: currentReview.id,
        voteType: type
      }).unwrap();

      await refetch();
      
    } catch (err) {
      setError('Failed to update vote. Please try again.');
      console.error('Failed to update vote:', err);
      setIsHelpful(0);
      setIsNotHelpful(0);
    }
  };

  const handleHelpful = () => handleVote('upVotes');
  const handleNotHelpful = () => handleVote('downVotes');

  if (isLoading) return <div className="max-w-4xl mx-auto px-4 py-6 bg-gray-50">Loading review...</div>;
  if (isError) return <div className="max-w-4xl mx-auto px-4 py-6 bg-gray-50">Error loading review</div>;
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 bg-gray-50">
      <div className="flex w-full justify-between items-center my-5">
        <h1 className="text-sm font-bold mb-4">Review Details</h1>
        <button
          onClick={handleBack}
          className="mb-4 px-4 py-1 bg-yellow-500 text-white rounded hover:bg-black cursor-pointer"
        >
          Back
        </button>
      </div>
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <h1 className="text-4xl font-bold mb-2">{currentReview.title}</h1>
      <div className="text-sm text-gray-500 mb-4">Posted by {currentReview.user.name}</div>
      <Image
        src={currentReview?.imageUrl}
        alt={currentReview?.title}
        layout="responsive" 
        width={100} 
        height={50} 
        className="object-cover rounded-md"
      />
      <div className="my-6">
        <h3 className="font-medium ">Introduction</h3>
        {/* <p>{currentReview.description}</p> */}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium">Category</h3>
          <p>{currentReview.category}</p>
        </div>
        <div>
          <h3 className="font-medium">Rating</h3>
          <p>{currentReview.RatingSummary}/5</p>
        </div>
        <div>
          <h3 className="font-medium">Premium</h3>
          <p>{currentReview.isPremium ? 'Yes' : 'No'}</p>
        </div>
        <div>
          <h3 className="font-medium">Price</h3>
          <p>${currentReview.price}</p>
        </div>
      </div>
      
      <div className="border-t border-gray-300 w-full my-6">
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-4">
            <button
              onClick={handleHelpful}
              disabled={isUpdating || isHelpful === 1}
              className={`flex items-center space-x-1 cursor-pointer ${
                isHelpful ? 'text-green-600' : 'text-gray-600 hover:text-gray-900'
              } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
              <span>Helpful ({currentReview.upVotes})</span>
            </button>

            <button
              onClick={handleNotHelpful}
              disabled={isUpdating || isNotHelpful === 1}
              className={`flex items-center space-x-1 cursor-pointer ${
                isNotHelpful ? 'text-green-600' : 'text-gray-600 hover:text-gray-900'
              } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                />
              </svg>
              <span>Not Helpful ({currentReview.downVotes})</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 text-sm text-gray-600">
        Created at: {new Date(currentReview.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}