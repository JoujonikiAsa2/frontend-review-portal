"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export function SearchBar() {
  const router = useRouter();

  const handleSearch = (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const search = formData.get("searchTerm");

    if (typeof search === "string" && search.trim()) {
      const params = new URLSearchParams({ searchTerm: search });
      router.push(`/reviews?${params.toString()}`);
    }
    
  };
  return (
    <form onSubmit={handleSearch} className="relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 h-5 w-5" />
        <Input
          name="searchTerm"
          type="search"
          placeholder="Search reviews by keyword..."
          className="pl-12 pr-32 py-7 w-full border-stone-200 focus:border-amber-300 rounded-md shadow-sm text-stone-700 placeholder:text-stone-400"
        />
        <Button
          type="submit"
          className="absolute right-1.5 top-1/2 transform -translate-y-1/2  bg-foreground hover: bg-foreground/80 text-white hover:cursor-pointer"
        >
          Search
        </Button>
      </div>
    </form>
  );
}
