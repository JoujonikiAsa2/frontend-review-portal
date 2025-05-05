import dynamic from "next/dynamic";

// Make sure this is dynamically imported as a client component
const CheckoutWrapper = dynamic(
  () => import("@/components/payment/checkout-wraper"),
  {
    ssr: true,
  }
);

const PaymentPage = async ({ params }: { params: { reviewId: string } }) => {
  const { reviewId } = await params;
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <CheckoutWrapper reviewId={reviewId} />
    </div>
  );
};

export default PaymentPage;
