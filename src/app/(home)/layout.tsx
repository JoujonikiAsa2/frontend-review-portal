"use client";

import Footer from "@/components/Shared/Footer";
import Header from "@/components/Shared/Header";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      {/* Footer */}
      <Footer />
    </div>
  );
}
