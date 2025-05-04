import type { Metadata } from "next"
import ReviewDetails from "@/components/reviews/review-details"

export const metadata: Metadata = {
  title: "Review Details | Your Product",
  description: "Detailed customer review information",
}

export default function ReviewDetailPage({ params }: { params: { id: string } }) {
const id = params.id
console.log(id)
  return (
  <ReviewDetails reciewId ={id}/>
  )
}
