import dynamic from "next/dynamic";

// Make sure this is dynamically imported as a client component
const CheckoutWrapper = dynamic(
  () => import("@/components/payment/checkout-wraper"),
  {
    ssr: true,
  }
);

interface PaymentPageProps {
  params: {
    reviewId: string;
  };
}

const PaymentPage = async ({ params }: PaymentPageProps) => {
  const { reviewId } = params;
  
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <CheckoutWrapper reviewId={reviewId} />
    </div>
  );
};

export default PaymentPage;