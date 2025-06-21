"use client";
import { TReviewCard } from "@/types/globals";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  ThumbsUp,
  ThumbsDown,
  Star,
  Calendar,
  User,
  Crown,
  MessageCircle,
  Share2,
  Bookmark,
  Share,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGetMyPaymentsQuery } from "@/redux/services/paymentApi";
import { useGetAllReviewsQuery, useGetReviewQuery, useUpdateVoteMutation } from "@/redux/services/reviewApi";
import CustomLoader from "./common/custom-loader";
import ArticleComments from "./reviews/chat";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
} from "react-share";
import { FaShare } from "react-icons/fa6";
import { toast } from "sonner";

type TCurrentUserWithReviewId = {
  email: string;
  reviewId: string;
};

export default function ReviewDetailsPage({
  sReview,
}: {
  sReview: TReviewCard;
}) {
    const {
    data: reviewItem,
    isLoading,
    isError,
    refetch,
  } = useGetReviewQuery(sReview?.id || "");
  const review = reviewItem?.data;
  const isPremium = review?.isPremium;
  const truncatedDescription = review?.description?.substring(0, 100);
  const [isHelpful, setIsHelpful] = useState(0);
  const [isNotHelpful, setIsNotHelpful] = useState(0);
  const session = useSession();
  const email = session.data?.user?.email ?? null;

  const {
    data: reviews,
  } = useGetAllReviewsQuery(review?.category || "");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };
  const { data: myPaymentData } = useGetMyPaymentsQuery(email as string, {
    skip: !email
  });
  const userPayemntDetails = myPaymentData?.data?.map(
    (info: TCurrentUserWithReviewId) => ({
      email: info?.email,
      reviewId: info?.reviewId,
    })
  );

  console.log(sReview, reviewItem, isLoading,
    isError,)
  if (!myPaymentData) {
  console.log("myPaymentData is undefined");
}

  const currentReview = (review as any)?.data;

  const currentUserWithReviewId = {
    email,
    reviewId: review?.id,
  };

    console.log(myPaymentData)

  const isPaidBefore = userPayemntDetails?.some(
    (item: TCurrentUserWithReviewId) =>
      item.email === currentUserWithReviewId.email &&
      item.reviewId === currentUserWithReviewId.reviewId
  );
  console.log(isPaidBefore, currentUserWithReviewId, userPayemntDetails);

  const [updateVote, { isLoading: isUpdating }] = useUpdateVoteMutation();

  const handleVote = async (type: "upVotes" | "downVotes") => {
    try {

      // Optimistic UI updates
      if (type === "upVotes") {
        setIsHelpful(1);
        setIsNotHelpful(0);
      } else {
        setIsNotHelpful(1);
        setIsHelpful(0);
      }

      await updateVote({
        reviewId: review?.id as string,
        voteType: type,
      }).unwrap();
refetch()
    } catch (err:any) {
      console.error(err)
      setIsHelpful(0);
      setIsNotHelpful(0);
         toast.error("Failed to update vote. Please try again.")
    }
  };

  const handleHelpful = () => handleVote("upVotes");
  const handleNotHelpful = () => handleVote("downVotes");

  if (isLoading) return <CustomLoader />;
  return (
    <div className="min-h-screen bg-card border">
      <div className=" max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="relative mb-8">
          <div className=" flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="text-sm">
              {review?.category}
            </Badge>
            {review?.isPremium && (
              <Badge className="absolute top-1 right-1 bg-green-600 text-white">
                <Crown className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {review?.title}
          </h1>

          {/* Author and Meta Info */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage
                  src={review?.user?.imageUrl || "/placeholder.svg"}
                  alt={review?.user?.name as string}
                />
                <AvatarFallback>
                  <User className="w-6 h-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white/70">
                  {review?.user?.name}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  {formatDate(review?.createdAt as string)}
                </div>
              </div>
            </div>
          </div>


          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
           {!isPremium || isPaidBefore && <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-white text-gray-600 dark:text-gray-400"
                disabled={isUpdating}
                onClick={handleHelpful}
              >
                <ThumbsUp className="w-4 h-4 mr-1" />
                {review?.upVotes}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-white text-gray-600 dark:text-gray-400"
                disabled={isUpdating}
                onClick={handleNotHelpful}
              >
                <ThumbsDown className="w-4 h-4 mr-1" />
                {review?.downVotes}
              </Button>
            </div>
}
            <div className="flex item-center gap-1">
              <div className="bg-transparent mr-2 flex items-center">
                <FaShare />
              </div>
              <FacebookShareButton
                url={`http://localhost:3000/reviews/${review?.id}`}
              >
                <FacebookIcon className="w-6 h-6 mr-1 rounded-full" />
              </FacebookShareButton>
              <LinkedinShareButton
                url={`http://localhost:3000/reviews/${review?.id}`}
              >
                <LinkedinIcon className="w-6 h-6 mr-1 rounded-full" />
              </LinkedinShareButton>
            </div>
          </div>
        </div>


        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Review Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Review Image */}
            <Card>
              <CardContent className="p-0">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={review?.imageUrl || "/placeholder.svg"}
                    alt={review?.title as string}
                    fill
                    className="object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Review Description */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Review Details</h2>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div
                    className={`text-gray-600 dark:text-gray-400 leading-relaxed ${
                      isPremium && !isPaidBefore ? "relative" : ""
                    }`}
                  >
                    {isPremium && !isPaidBefore ? (
                      <>
                        <p>{truncatedDescription}...</p>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white pointer-events-none" />
                        <div className="backdrop-blur-sm pointer-events-none" />
                      </>
                    ) : (
                      <p>{review?.description}</p>
                    )}
                  </div>

                  {isPremium && !isPaidBefore && (
                    <div className="mt-6 text-center">
                      <div className="bg-gradient-to-r from-green-500 to-black text-white p-6 rounded-lg">
                        <Crown className="w-8 h-8 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold mb-2">
                          Premium Content
                        </h3>
                        <p className="text-sm opacity-90 mb-4">
                          Unlock the full review to read detailed insights and
                          recommendations
                        </p>
                        <Link href={`/payment/${review?.id}`}>
                          <Button className="bg-white text-black hover:bg-gray-100">
                            Unlock for {review?.price} Taka
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            {!isPremium || isPaidBefore && (
              <div>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      <h2 className="text-xl font-semibold">
                        Comments ({review?.comments?.length || 0})
                      </h2>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ArticleComments articleId={currentReview?.id} />
                    <div className="pt-4">
                      <Button
                        variant="outline"
                        className="w-full bg-white text-gray-600 dark:text-gray-400"
                      >
                        Add Comment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Review Stats */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Review Stats</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Rating</span>
                  <div className="flex items-center gap-1">
                    {renderStars(review?.RatingSummary as number)}
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Upvotes</span>
                  <span className="font-medium text-green-600">
                    {review?.upVotes}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Downvotes</span>
                  <span className="font-medium text-red-600">
                    {review?.downVotes}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Comments</span>
                  <span className="font-medium">
                    {review?.comments?.length || 0}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Author Info */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">About the Author</h3>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={review?.user?.imageUrl || "/placeholder.svg"}
                      alt={review?.user?.name as string}
                    />
                    <AvatarFallback>
                      <User className="w-6 h-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{review?.user?.name}</p>
                    <p className="text-sm text-gray-600">Verified Reviewer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Reviews */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Related Reviews</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {reviews?.data?.slice(0,4).map((item:TReviewCard) => (
                  <div
                    key={item?.id}
                    className="flex gap-3 p-2 rounded-lg hover:bg-transparent hover:border cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-lg flex-shrink-0">
                                        <Image
                    src={item?.imageUrl || "/placeholder.svg"}
                    alt={item?.title as string}
                    width={50}
                    height={50}
                    className="w-full h-full object-cover"
                  />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item?.title}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {renderStars(item?.RatingSummary)}
                        <span className="text-xs text-gray-500 ml-1">{item?.RatingSummary}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div><Link href="/reviews"><Button>See More</Button></Link></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
