<<<<<<< HEAD
import ReviewDetails from "@/components/ReviewDetails";
import { Review } from "@/types/review";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

async function getReviewById(id: string): Promise<Review | null> {
  try {
    const res = await fetch(
      `https://backend-server-review-portal.vercel.app/api/v1/review/${id}`,
      {
        cache: "no-store",
      }
    );
=======

import React from 'react';
import ReviewDetails from '@/components/ReviewDetails';
import { Review } from '@/types/review';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
// import Cookies from 'js-cookie';

async function getReviewById(id: string): Promise<Review | null> {
  try {
    const res = await fetch(`https://backend-server-review-portal.vercel.app/api/v1/review/${id}`, {
      cache: 'no-store',
    });
>>>>>>> 8bac7b1c56e0507467ee851daf7736f648045f23
    const json = await res.json();

    if (!res.ok || !json.success) return null;

    return json.data;
  } catch {
    return null;
  }
}
export const metadata: Metadata = {
  title: "Review Details | Your Product",
  description: "Detailed customer review information",
<<<<<<< HEAD
};
export default async function ReviewPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  const review = await getReviewById(id);

  if (!review) return notFound();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-gray-300">
      <ReviewDetails review={review} />
    </div>
=======
}
export default async function ReviewPage({ params }: { params: { id: string } }) {
  const id = params?.id

  const review = await getReviewById(id);
  if (!review) return notFound();

  return(
      
        <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-gray-300">
          <ReviewDetails reviewItem={review} />
        </div>
  
>>>>>>> 8bac7b1c56e0507467ee851daf7736f648045f23
  );
}
