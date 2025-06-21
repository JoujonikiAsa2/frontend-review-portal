import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const CheckoutWrapper = dynamic(
  () => import("@/components/payment/checkout-wraper"),
  { ssr: true }
);

type Params = {
  reviewId: string;
};

export default async function PaymentPage({
  params,
}: {
  params: Params;
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { reviewId } = params; 
  
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <CheckoutWrapper reviewId={reviewId} />
    </div>
  );
}

export async function generateMetadata({ 
  params 
}: { 
  params: Params 
}): Promise<Metadata> {
  return {
    title: `Payment for Review ${params.reviewId}`,
  };
}
