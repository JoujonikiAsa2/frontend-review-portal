export type TArrayResponseData<T> = {
  data: T[],
  success: boolean,
  message:string
}

export type TSingleResponseData<T> = {
  data: T,
  success: boolean,
  message:string
}

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
  currency: string
  paymentType: "PREPAYMENT" | "POSTPAYMENT"
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
  createdAt: string;
  updatedAt: string
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

export type TQuery = {
  searchTerm?:string,
  title?:string,
  category?:string,
  RatingSummary?:number,
  startDate?:string,
  endDate?:string
}

export type TOption = {
  page?:string,
  limit?:string,
  sort?:string,
  sortOrder?:string
}

export type TReviewCard = {
  id: string;
  title: string;
  description: string;
  userId: string;
  imageUrl: string;
  category: "ELECTRONICS" | string;
  upVotes: number;
  downVotes: number;
  isPremium: boolean;
  RatingSummary: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  price: number;
  user: TUser;
  comments: Comment[];
};

// TypeScript Types for Admin Analytics API Response

export type TAdminAnalyticsResponse = {
  success: boolean;
  message: string;
  data: {
    totalEarnings: number;
    premiumReviewCount: number;
    reviewsByCategory: TReviewByCategory[];
    allReviews: TReviewCard[]
    reviewStatus: TReviewStatus[];
    reviewPublishStatus: TReviewStatus[];
  };
};

export type TReviewByCategory = {
  _count: {
    _all: number;
  };
  category: string;
};

export type TReviewStatus = {
  _count: {
    _all: number;
  };
  isPremium: boolean;
};
