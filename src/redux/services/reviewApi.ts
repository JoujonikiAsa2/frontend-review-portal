// src/redux/services/reviewApi.ts
import { TArrayResponseData, TReviewCard, TSingleResponseData } from "@/types/globals";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://backend-server-review-portal.vercel.app/api/v1/review`,
    prepareHeaders: async (headers) => {
      const token = localStorage.getItem('accessToken')
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Review"],
  endpoints: (builder) => ({
    updateVote: builder.mutation<
      TReviewCard,
      {
        reviewId: string;
        voteType: "upVotes" | "downVotes";
      }>({
      query: ({ reviewId, voteType }) => ({
        url: `update-vote/${reviewId}?voteType=${voteType}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Review"],
    }),
    getReview: builder.query<TSingleResponseData<TReviewCard>, string>({
      query: (id) => `${id}`,
      providesTags: ["Review"],
    }),
    getAllReviews: builder.query<TArrayResponseData<TReviewCard>, string>({
      query: (category:string) => `?category=${category}`,
      providesTags: ["Review"],
    })
  }),
});

export const { useUpdateVoteMutation, useGetReviewQuery,useGetAllReviewsQuery } = reviewApi;
