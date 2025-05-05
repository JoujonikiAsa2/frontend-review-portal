export interface IAuth {
  name?: string;
  email: string;
  password: string;
}
export type TUser = {
  id?: string;
  name: string | null;
  email: string;
  imageUrl: string | null;
};

export type TPaymentPayload = {
  id?: string;
  email: string;
  reviewId: string;
  amount?: number;
  name: string;
  transactionId: string;
  paymentStatus: "CONFIRMED" | "PENDING" | "FAILED" | "CANCEL" | "REFUND";
  paymentMethod?: string;
  completedAt?:string;
};

export type TReview = {
  id?: string;
  category: "MOVIE" | "TV_SHOW" | "BOOK" | "ELECTRONICS" | "VEHICLE";
  upVotes?: number;
  downVotes?: number;
  isPremium?: boolean;
  RatingSummary?: number;
  title: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  user: TUser;
  Comment: Comment[];
};

export type Comment = {
  id?: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: TUser;
  reviewId: string;
  review: TReview;
};
