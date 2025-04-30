"use server";

import { cookies } from "next/headers";

const backend_url = process.env.AUTH_BACKEND_URL;
console.log("backend url", backend_url);
export const getOrders = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    console.log("access Token", token);

    const res = await fetch(`${backend_url}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // if (!res.ok) {
    //   throw new Error("Failed to fetch orders");
    // }
    const result = await res.json();
    console.log("result", result);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch orders");
  }
};
