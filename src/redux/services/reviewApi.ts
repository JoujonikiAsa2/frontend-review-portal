// src/redux/services/reviewApi.ts
import getToken from '@/Helpers/getToken';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

interface Review {
  id: string;
  title: string;
  content: string;
  upVotes: number;
  downVotes: number;
  user: {
    name: string;
  };
  imageUrl: string;
  category: string;
  RatingSummary: number;
  isPremium: boolean;
  price: number;
  createdAt: string;
}



export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://backend-server-review-portal.vercel.app/api/v1/review/',
    prepareHeaders: (headers) => {
      // Client-side cookie access
    //   const token = Cookies.get('accessToken');
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQXNhIiwiZW1haWwiOiJqb3Vqb25pa2lhc2Fyb3kub2ZmaWNpYWxAZ21haWwuY29tIiwidXNlclJvbGUiOiJhZG1pbiIsImlhdCI6MTc0NjM2MTQ2OSwiZXhwIjoxNzQ2NDQ3ODY5fQ.Wk1PDs_0fiwdnvQq0clQH1qlAnlTl22FsakYxBVETKQ"
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Review'],
  endpoints: (builder) => ({
    updateVote: builder.mutation<Review, {
      reviewId: string;
      voteType: 'upVotes' | 'downVotes';
    }>({
      query: ({ reviewId, voteType }) => ({
        url: `update-vote/${reviewId}`,
        method: 'PATCH',
        body: { [voteType]: voteType === 'upVotes' ? 1 : -1 },
      }),
      invalidatesTags: ['Review'],
    }),
    getReview: builder.query<Review, string>({
      query: (id) => `${id}`,
      providesTags: ['Review'],
    }),
  }),
});

export const { useUpdateVoteMutation, useGetReviewQuery } = reviewApi;