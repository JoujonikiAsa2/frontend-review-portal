// src/redux/services/reviewApi.ts
import { TAdminAnalyticsResponse, TSingleResponseData } from "@/types/globals";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const analyticApi = createApi({
  reducerPath: "analyticApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://backend-server-review-portal.vercel.app/api/v1/admin/analytics`,
    prepareHeaders: async (headers) => {
      const token = localStorage.getItem('accessToken')
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Analytic"],
  endpoints: (builder) => ({ 
     getAnalyticsData: builder.query<TSingleResponseData<TAdminAnalyticsResponse>, string>({
      query: () => ``,
      providesTags: ["Analytic"],
    })
  }),
});

export const { useGetAnalyticsDataQuery } = analyticApi;
