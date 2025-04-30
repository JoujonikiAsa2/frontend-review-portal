import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role: string;
    googleAccessToken?: string;

  }
  interface Session {
    user: {
      role: string;
      googleAccessToken?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
    googleAccessToken?: string;

  }
}
