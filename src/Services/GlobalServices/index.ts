"use server";
import { cookies } from "next/headers";

export const getToken = async () => {
  const cookieStore = await cookies();
  console.log("Token got", cookieStore.get("accessToken"));
  return cookieStore.get("accessToken")?.value;
};
