"use client"
import { useState } from "react";
import { ThumbsUp, ThumbsDown, Star, Clock, Tag } from "lucide-react";
import Image from "next/image";

export default function ReviewHomeCard({ review }) {
  const [upvotes, setUpvotes] = useState(42);
  const [downvotes, setDownvotes] = useState(7);
  const [userVote, setUserVote] = useState(null);
  console.log("review card", review);
  // Sample data - would come from props in a real implementation

  // Generate star rating display
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={18}
          className={
            i <= rating
              ? "text-yellow-500 fill-yellow-500 dark:text-yellow-400 dark:fill-yellow-400"
              : "text-gray-300 dark:text-gray-600"
          }
        />
      );
    }
    return stars;
  };

  // Handle voting
  const handleVote = (type) => {
    if (userVote === type) {
      // Cancel vote
      if (type === "up") setUpvotes(upvotes - 1);
      else setDownvotes(downvotes - 1);
      setUserVote(null);
    } else if (userVote === null) {
      // New vote
      if (type === "up") setUpvotes(upvotes + 1);
      else setDownvotes(downvotes + 1);
      setUserVote(type);
    } else {
      // Change vote
      if (type === "up") {
        setUpvotes(upvotes + 1);
        setDownvotes(downvotes - 1);
      } else {
        setUpvotes(upvotes - 1);
        setDownvotes(downvotes + 1);
      }
      setUserVote(type);
    }
  };

  // Get category badge color
  const getCategoryColor = (category) => {
    const categories = {
      Books: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
      Gadgets:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
      Movies:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
      Food: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
    };

    return (
      categories[category] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
    );
  };

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-accent">
      {/* Product Image */}
      {review.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src="/api/placeholder/400/200"
            alt={review.title}
            width={400}
            height={200}
            className="w-full h-full object-cover rounded-t-lg"
          />
        </div>
      )}

      <div className="p-5">
        {/* Category Badge */}
        <div className="mb-3 flex items-center justify-between">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
              review.category
            )}`}
          >
            <div className="flex items-center">
              <Tag size={12} className="mr-1" />
              {review.category}
            </div>
          </span>

          {/* Star Rating */}
          <div className="flex">{renderStars(review.rating)}</div>
        </div>

        {/* Review Title */}
        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
          {review.title}
        </h3>

        {/* Author and Date */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <span className="mr-3">{review.authorName}</span>
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            {review.publishDate}
          </div>
        </div>

        {/* Review Snippet */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {review.description}
        </p>

        {/* Voting and Read More */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex space-x-3">
            <button
              className={`flex items-center space-x-1 ${
                userVote === "up"
                  ? "text-green-600 dark:text-green-400"
                  : "text-gray-500 dark:text-gray-400"
              } hover:text-green-600 dark:hover:text-green-400 transition-colors`}
              onClick={() => handleVote("up")}
            >
              <ThumbsUp
                size={18}
                className={
                  userVote === "up" ? "fill-green-600 dark:fill-green-400" : ""
                }
              />
              <span>{upvotes}</span>
            </button>
            <button
              className={`flex items-center space-x-1 ${
                userVote === "down"
                  ? "text-red-600 dark:text-red-400"
                  : "text-gray-500 dark:text-gray-400"
              } hover:text-red-600 dark:hover:text-red-400 transition-colors`}
              onClick={() => handleVote("down")}
            >
              <ThumbsDown
                size={18}
                className={
                  userVote === "down" ? "fill-red-600 dark:fill-red-400" : ""
                }
              />
              <span>{downvotes}</span>
            </button>
          </div>

          <a
            href={`/reviews/${review.id}`}
            className="inline-block px-4 py-2 bg-blue-600 text-white dark:bg-blue-700 dark:text-gray-100 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm font-medium"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}
