import { deleteReview } from "@/Services/Reviews";
import {
  Eye,
  MoreHorizontal,
  Pencil,
  Star,
  ThumbsDown,
  ThumbsUp,
  Trash,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const TableRow = ({ review }) => {
  const { data: session } = useSession();
  const router = useRouter();
  console.log(" review", review);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState({});
  // console.log({ session }," from review management");
  const getCategoryColor = (category: string) => {
    const categoryColors = {
      BOOK: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      ELECTRONICS:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      MOVIE:
        "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
      TV_SHOW:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      VEHICLE: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };

    return (
      categoryColors[category as keyof typeof categoryColors] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const toggleDropdown = (id: string) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleUpdateReview = (reviewId: string) => {
    console.log(`Navigating to /reviews/edit/${reviewId}`);
    router.push(
      `/dashboard/${session?.user.role.toLowerCase()}/update-review/${reviewId}`
    );
  };

  const openDeleteDialog = (review) => {
    setReviewToDelete(review);
    setDeleteDialogOpen(true);
  };

  const renderStars = (rating: number) => {
    return Array(rating)
      .fill(0)
      .map((_, i) => (
        <Star key={i} size={16} className="fill-yellow-500 text-yellow-500" />
      ));
  };
  return (
    <tr
      key={review.id}
      className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
            <img
              src={review.imageUrl}
              alt={review.title}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="max-w-[150px] sm:max-w-xs">
            <div className="font-medium text-gray-900 dark:text-gray-100 truncate">
              {review.title}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {review.isPremium && (
                <span className="inline-flex items-center mr-2 text-xs font-medium text-emerald-700 dark:text-emerald-500">
                  Premium ${review.price}
                </span>
              )}
              {review.description}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
            review.category
          )}`}
        >
          {review.category.replace("_", " ")}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex">{renderStars(review.RatingSummary)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <span className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <ThumbsUp size={14} className="mr-1" />
            {review.upVotes}
          </span>
          <span className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <ThumbsDown size={14} className="mr-1" />
            {review.downVotes}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {review.isPublished ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            Published
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
            Draft
          </span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
        {formatDate(review.createdAt)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="relative">
          <button
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            onClick={() => toggleDropdown(review.id)}
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>

          {dropdownOpen[review.id] && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1">
                <Link
                  href={`/reviews/${review.id}`}
                  className={`flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left ${
                    review.isPublished ? "" : "hidden"
                  }`}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Link>
                <Link
                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                  // onClick={() => {
                  //   handleUpdateReview(review.id);
                  //   toggleDropdown(review.id);
                  // }}
                  href={`/dashboard/${session?.user.role.toLowerCase()}/update-review/${
                    review.id
                  }`}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Link>
                <button
                  className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left"
                  onClick={() => {
                    openDeleteDialog(review);
                    toggleDropdown(review.id);
                  }}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
