export interface User {
    id: string;
    name: string;
    email: string;
    imageUrl: string | null;
  }
  
  export interface Review {
    id: string;
    title: string;
    description: string;
    userId: string;
    imageUrl: string;
    category: string;
    upVotes: number;
    downVotes: number;
    isPremium: boolean;
    RatingSummary: number;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
    price: number;
    user: User;
  }
  