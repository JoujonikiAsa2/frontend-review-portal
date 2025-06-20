import { TReviewCard } from "@/types/globals"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ThumbsUp, ThumbsDown, Star, Calendar, User, Crown, MessageCircle, Share2, Bookmark } from "lucide-react"
import Image from "next/image"

export default function ReviewDetailsPage({mockReview}:{mockReview:TReviewCard}) {
  const review = mockReview
  const isPremium = review?.isPremium
  const truncatedDescription = review?.description?.substring(0, 100)
  const hasUserPurchased = false 

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatPrice = (priceInCents: number) => {
    return `$${(priceInCents / 100).toFixed(2)}`
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-5 h-5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="text-sm">
              {review?.category}
            </Badge>
            {isPremium && (
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <Crown className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{review?.title}</h1>

          {/* Author and Meta Info */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={review?.user?.imageUrl || "/placeholder.svg"} alt={review?.user?.name} />
                <AvatarFallback>
                  <User className="w-6 h-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-900">{review?.user?.name}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  {formatDate(review?.createdAt)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:ml-auto">
              <div className="flex items-center gap-1">
                {renderStars(review?.RatingSummary)}
                <span className="ml-2 text-sm font-medium text-gray-700">{review?.RatingSummary}/5</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="bg-white text-gray-700">
                <ThumbsUp className="w-4 h-4 mr-1" />
                {review?.upVotes}
              </Button>
              <Button variant="outline" size="sm" className="bg-white text-gray-700">
                <ThumbsDown className="w-4 h-4 mr-1" />
                {review?.downVotes}
              </Button>
            </div>
            <Button variant="outline" size="sm" className="bg-white text-gray-700">
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="bg-white text-gray-700">
              <Bookmark className="w-4 h-4 mr-1" />
              Save
            </Button>
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
                  <Image src={review?.imageUrl || "/placeholder.svg"} alt={review?.title} fill className="object-cover" />
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
                  <div className={`text-gray-700 leading-relaxed ${isPremium && !hasUserPurchased ? "relative" : ""}`}>
                    {isPremium && !hasUserPurchased ? (
                      <>
                        <p>{truncatedDescription}...</p>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white pointer-events-none" />
                        <div className="absolute inset-0 backdrop-blur-sm pointer-events-none" />
                      </>
                    ) : (
                      <p>{review?.description}</p>
                    )}
                  </div>

                  {isPremium && !hasUserPurchased && (
                    <div className="mt-6 text-center">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-lg">
                        <Crown className="w-8 h-8 mx-auto mb-3" />
                        <h3 className="text-lg font-semibold mb-2">Premium Content</h3>
                        <p className="text-sm opacity-90 mb-4">
                          Unlock the full review to read detailed insights and recommendations
                        </p>
                        <Button className="bg-white text-purple-600 hover:bg-gray-100">
                          Unlock for {formatPrice(review?.price!)}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  <h2 className="text-xl font-semibold">Comments ({review?.comments?.length})</h2>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {review?.comments.map((comment, index) => (
                  <div key={comment.id}>
                    <div className="flex gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={comment?.user?.avatar || "/placeholder.svg"} alt={comment?.user?.name} />
                        <AvatarFallback>
                          <User className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{comment?.user?.name}</span>
                          <span className="text-xs text-gray-500">{formatDate(comment?.createdAt)}</span>
                        </div>
                        <p className="text-sm text-gray-700">{comment?.content}</p>
                      </div>
                    </div>
                    {index < review?.comments?.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}

                <div className="pt-4">
                  <Button variant="outline" className="w-full bg-white text-gray-700">
                    Add Comment
                  </Button>
                </div>
              </CardContent>
            </Card>
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
                  <div className="flex items-center gap-1">{renderStars(review?.RatingSummary)}</div>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Upvotes</span>
                  <span className="font-medium text-green-600">{review?.upVotes}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Downvotes</span>
                  <span className="font-medium text-red-600">{review?.downVotes}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Comments</span>
                  <span className="font-medium">{review?.comments?.length}</span>
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
                    <AvatarImage src={review?.user?.imageUrl || "/placeholder.svg"} alt={review?.user?.name} />
                    <AvatarFallback>
                      <User className="w-6 h-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{review?.user?.name}</p>
                    <p className="text-sm text-gray-600">Verified Reviewer</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-white text-gray-700">
                  View Profile
                </Button>
              </CardContent>
            </Card>

            {/* Related Reviews */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Related Reviews</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">Related Product Review #{item}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {renderStars(4)}
                        <span className="text-xs text-gray-500 ml-1">4.0</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}