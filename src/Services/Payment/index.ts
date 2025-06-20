"use server";

import { getToken } from "../GlobalServices";

const backendUrl = process.env.AUTH_BACKEND_URL;

export const getPaymentHistory = async (email: string) => {
  try {
    if (!email) {
      throw new Error("Email is required to fetch payment history");
    }
    console.log("email", email);
    const token = await getToken();
    const response = await fetch(`${backendUrl}/payment/my-payments/${email}`, {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching payment history:", error);
    throw error;
  }
};
