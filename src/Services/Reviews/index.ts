"use server";

import { revalidateTag } from "next/cache";
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

    // console.log("query", query)
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

export const getReviewDetails = async (id: string, action?: string) => {
  try {
    const url = action
      ? `${backend_url}/review/${id}?action=${action}`
      : `${backend_url}/review/${id}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    console.log("All reviews fetched", result);

    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch reviews");
  }
};

export const getUnpublishedReviews = async () => {
  try {
    const token = await getToken();
    const res = await fetch(`${backend_url}/review/unpublished`, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
      next: {
        tags: ["unpublished-reviews"],
      },
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch reviews");
  }
};

export const updateReviewStatus = async (
  reviewId: string,
  actionType: string
) => {
  try {
    const token = await getToken();
    console.log(
      `${backend_url}/review/${reviewId}?actionType=${actionType}`
    );
    const res = await fetch(
      `${backend_url}/review/${reviewId}?actionType=${actionType}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    const result = await res.json();
    console.log("Review UPDATE result", result);
    if (!res.ok) {
      throw new Error("Failed to update review");
    }
    revalidateTag("unpublished-reviews");
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch reviews");
  }
};

export const getMyReviews = async () => {
  try {
    const token = await getToken();
    const res = await fetch(`${backend_url}/review/my-reviews`, {
      method: "GET",
      headers: {
        Authorization: `${token}`,
      },
      next: {
        tags: ["reviews"],
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
export const deleteReview = async (reviewId: string) => {
  console.log("reviewId", reviewId);
  try {
    const token = await getToken();
    const res = await fetch(`${backend_url}/review/delete/${reviewId}`, {
      method: "DELETE",
      headers: {
        Authorization: `${token}`,
      },
    });
    const result = await res.json();
    if (result.success) {
      console.log("hitting");
      revalidateTag("reviews");
    }
    console.log("Review UPDATE result", result);
    return result;
  } catch (error) {
    throw new Error("Failed to delete review");
  }
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
  } catch (error) {
    throw new Error("Failed to update review");
  }
};
