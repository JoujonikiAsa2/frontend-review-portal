"use server";

import { getToken } from "../GlobalServices";

const backend_url = process.env.AUTH_BACKEND_URL;

export const getReviews = async (query: any) => {
  try {
    // Fix typo and convert to Date if present
    if (query?.startDate || query?.endDate) {
      if (query?.startDate) {
        query.startDate = new Date(query.startDate).toISOString();
      }
      if (query?.endDate) {
        query.endDate = new Date(query.endDate).toISOString();
      }
    }

    console.log("query", query);

    const searchParams = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.set(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    console.log(queryString);
    console.log(`Api url ${backend_url}/review?${queryString}`);
    const res = await fetch(`${backend_url}/review?${queryString}`, {
      method: "GET",
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch reviews");
  }
};

export const getReviewDetails = async (id: string) => {
  try {
    const res = await fetch(`${backend_url}/review/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch reviews");
  }
};

export const createReview = async (payload: any) => {
  try {
    const token = await getToken();
    const res = await fetch(`${backend_url}/review/create`, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
      },
      body: payload,
    });
    const result = await res.json();
    console.log("Review result", result);
    return result;
  } catch (error) {}
};
export const updateReview = async (payload: any, reviewId: string) => {
  try {
    const token = await getToken();
    const res = await fetch(`${backend_url}/review/update/${reviewId}`, {
      method: "PATCH",
      headers: {
        Authorization: `${token}`,
      },
      body: payload,
    });
    const result = await res.json();
    console.log("Review UPDATE result", result);
    return result;
  } catch (error) {}
};
