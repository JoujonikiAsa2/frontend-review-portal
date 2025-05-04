'use client';
import { Review } from '@/types/review';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ReviewDetails({ review }: { review: Review }) {
  const router = useRouter();
  const [isPaid, setIsPaid] = useState(true); // State to track if the user has paid

  const handleBack = () => {
    router.back();
  };

  const handlePayment = () => {
    // Simulate payment process
    alert('Payment successful! You can now read the full description.');
    setIsPaid(true);
  };

  const truncatedDescription = review.description.split(' ').slice(0, 50).join(' ') + '...';

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
      <h1 className="text-4xl font-bold mb-2">{review.title}</h1>
      <div className="text-sm text-gray-500 mb-4">Posted by {review.user.name}</div>
      <Image
        src={review?.imageUrl}
        alt={review?.title}
        width= {600}
        height={300}
        className="object-cover rounded-md "
      />
      <div className="relative mb-6">
        <p
          className={`text-lg leading-relaxed text-gray-800 ${
            review.isPremium && !isPaid ? 'blur-sm' : ''
          }`}
        >
          {review.isPremium && !isPaid ? truncatedDescription : review.description}
        </p>
        {review.isPremium && !isPaid && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <button
              onClick={handlePayment}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Pay to Read More
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium">Category</h3>
          <p>{review.category}</p>
        </div>
        <div>
          <h3 className="font-medium">Rating</h3>
          <p>{review.RatingSummary}/5</p>
        </div>
        <div>
          <h3 className="font-medium">Premium</h3>
          <p>{review.isPremium ? 'Yes' : 'No'}</p>
        </div>
        <div>
          <h3 className="font-medium">Price</h3>
          <p>${review.price}</p>
        </div>
           {/* Review Footer */}
          
      </div>
      <div className=" border-t border-gray-300 w-full my-6">
          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-4">
              <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                <span>Helpful ({review.upVotes})</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                </svg>
                <span>Not Helpful ({review.downVotes})</span>
              </button>
            </div>
          </div>
        </div>

      <div className="mt-8 text-sm text-gray-600">
        Created at: {new Date(review.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}