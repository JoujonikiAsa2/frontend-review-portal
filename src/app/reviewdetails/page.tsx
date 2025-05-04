// app/review/[id]/page.tsx
import ReviewDetails from '@/components/ReviewDetails';
import { Review } from '@/types/review';
// import ReviewDetails from '@/components/ReviewDetails';
import { notFound } from 'next/navigation';

async function getReviewById(id: string): Promise<Review | null> {

  try {
    const res = await fetch(`https://backend-server-review-portal.vercel.app/api/v1/review/${id}`, {
      cache: 'no-store',
    });
    const json = await res.json();

    if (!res.ok || !json.success) return null;

    return json.data;
  } catch {
    return null;
  }
}

export default async function ReviewPage({ params }: { params: { id: string } }) {
  const review = await getReviewById("0d7955e7-b702-4fa1-b87c-c9985da81e50");

  if (!review) return notFound();

  return(
    <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-gray-300">
      <ReviewDetails review={review} />
    </div>
  );
}
