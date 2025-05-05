/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import { Card } from "../ui/card";
import { ReviewRating } from "./review-rating";
import { Button } from "../ui/button";
import Link from "next/link";
import premiumLogo from "@/assets/crown.png";
interface ReviewCardProps {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  rating: number;
  name: string;
  date: string;
  content: string;
  upVotes: number;
  downVotes: number;
  verified: boolean;
}
export function ReviewCard({
  id,
  title,
  category,
  imageUrl,
  rating,
  name,
  date,
  content,
  upVotes,
  downVotes,
  verified,
}: ReviewCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left side - Image */}
        <div className="md:col-span-1">
          <div className="aspect-square w-full relative overflow-hidden rounded-md bg-gray-50">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="md:col-span-2 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-serif font-semibold text-xl text-black mb-1">
                {title}
              </h3>
              <span className="inline-block px-3 py-1 bg-black text-white text-xs font-medium rounded-full mb-2">
                {category}
              </span>
            </div>
            {verified && (
              <div className="flex items-center">
                <Image
                  src={premiumLogo}
                  height={24}
                  width={24}
                  alt="Premium"
                  className="filter grayscale"
                />
                <span className="text-xs text-gray-600 ml-1">Verified</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mb-2">
            <ReviewRating rating={rating} />
            <span className="text-sm font-medium text-gray-700">
              {rating}.0
            </span>
          </div>

          <div className="text-sm text-gray-500 mb-3">
            By <span className="font-medium text-black">{name}</span> •{" "}
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>

          <p className="text-gray-700 line-clamp-3 mb-4">{content}</p>

          <div className="mt-auto flex items-center justify-between">
            <div className="text-sm text-gray-500">
              <span className="font-medium text-black">
                {upVotes + downVotes}
              </span>{" "}
              people voted
            </div>

            <Link href={`/reviews/${id}`} key={id}>
              <Button
                variant="outline"
                className="text-black border-black hover:bg-black hover:text-white transition-colors"
              >
                Read More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
