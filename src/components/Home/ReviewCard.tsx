/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
"use client";
import { useState } from "react";
import { ThumbsUp, ThumbsDown, Star, Clock, Tag, Crown } from "lucide-react";
import Image from "next/image";
import { TReviewCard } from "@/types/globals";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "../ui/badge";

export default function ReviewHomeCard({ review }: { review: TReviewCard }) {
  const [upvotes, setUpvotes] = useState(42);
  const [downvotes, setDownvotes] = useState(7);
  const [userVote, setUserVote] = useState<string | null>(null);
  // Generate star rating display
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={18}
          className={
            i <= rating
              ? "text-transparent fill-yellow-600"
              : "text-transparent fill-gray-600"
          }
        />
      );
    }
    return stars;
  };

  // Handle voting
  const handleVote = (type: string) => {
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

  // Get category badge color - keeping monochrome theme
  const getCategoryColor = (category: string) => {
    const categories = {
      Books: "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
      Gadgets: "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
      Movies: "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
      Food: "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
    };

    return (
      categories[category as keyof typeof categories] ||
      "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    );
  };

  return (
    <div className="h-96 flex flex-col rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-card border border-gray-100 dark:border-gray-700">
      {/* Product Image - Fixed height */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src={review?.imageUrl!}
          alt={review.title || "Product image"}
          width={400}
          height={200}
          className="w-full h-full object-cover"
        />
        {review?.isPremium && (
          <Badge className="absolute top-1 left-1 bg-green-600 text-white">
            <Crown className="w-3 h-3 mr-1" />
            Premium
          </Badge>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow text-foreground">
        {/* Category Badge */}
        <div className="mb-2 flex items-center justify-between">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
              review.category
            )}`}
          >
            <div className="flex items-center">
              <Tag size={12} className="mr-1" />
              {review.category || "General"}
            </div>
          </span>

          {/* Star Rating */}
          <div className="flex">{renderStars(review.RatingSummary || 5)}</div>
        </div>

        {/* Review Title */}
        <h3 className="text-lg font-bold mb-1 text-foreground line-clamp-1">
          {review.title || "Product Review"}
        </h3>

        {/* Author and Date */}
        <div className="flex items-center text-xs text-muted-foreground mb-2">
          <span className="mr-2">{review.user.name || "Anonymous"}</span>
          <div className="flex items-center">
            <Clock size={12} className="mr-1" />
            {formatDistanceToNow(new Date(review.createdAt), {
              addSuffix: true,
            })}
          </div>
        </div>

        {/* Review Snippet */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">
          {review.description || "No description available for this review."}
        </p>

        {/* Voting and Read More */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100 dark:border-gray-700">
          <div className="flex space-x-3">
            <button
              className={`flex items-center space-x-1 ${
                userVote === "up" ? "text-foreground" : "text-muted-foreground"
              } hover:text-foreground transition-colors`}
              onClick={() => handleVote("up")}
              aria-label="Upvote"
            >
              <ThumbsUp
                size={16}
                className={userVote === "up" ? "fill-current" : ""}
              />
              <span className="text-xs">{review.upVotes}</span>
            </button>

            <button
              className={`flex items-center space-x-1 ${
                userVote === "down" ? "text-red-600" : "text-muted-foreground"
              } hover:text-red-700 dark:hover:text-red-500 transition-colors`}
              onClick={() => handleVote("down")}
              aria-label="Downvote"
            >
              <ThumbsDown
                size={16}
                className={userVote === "down" ? "fill-red-600" : ""}
              />
              <span className="text-xs">{review.downVotes}</span>
            </button>
          </div>

          <a
            href={`/reviews/${review.id}`}
            className="inline-block px-3 py-1 border text-green-600 rounded hover:opacity-90 transition-colors text-xs font-medium"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}
