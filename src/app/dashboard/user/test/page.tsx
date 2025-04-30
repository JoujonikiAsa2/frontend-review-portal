import { auth } from "@/auth";
import { getOrders } from "@/Services/Orders";
import React from "react";

const UserTest = async () => {
  const session = await auth();
  console.log("session from user test", session);
  const orders = await getOrders();
  console.log("orders", orders);
  // console.log(await result.json());
  // const data = await fetch("https://api.vercel.app/blog");
  // const posts = await data.json();
  // console.log("post", posts);
  return <div></div>;
};

export default UserTest;
