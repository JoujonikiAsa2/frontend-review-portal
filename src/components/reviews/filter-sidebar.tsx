"use client";

import type React from "react";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
// import { DatePickerWithRange } from "./date-range-picker";

export function FilterSidebar() {
  const router = useRouter();
  // query params
  const [params, setParams] = useState<Record<string, unknown>>({
    RatingSummary: null,
    category: "",
    startDate: "",
    endDate: "",
  });

  const searchParams = new URLSearchParams();

  //filtered the empty params
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== "" && value !== null && value !== undefined
    )
  );

  console.log(filteredParams);

  //set the filtered params into searchUrl
  Object.entries(filteredParams).forEach(([key, value]) => {
    searchParams.set(key, String(value));
  });

  //apply filter
  const onClickApplyFilters = () => {
    router.push(`/reviews?${searchParams.toString()}`);
  };

  // clear all filter
  const onClickResetAll = () => {
    setParams({
      RatingSummary: null,
      category: "",
      startDate: "",
      endDate: "",
    });
    router.push(`/reviews`);
  };

  console.log(params.date);

  return (
    <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm">
      <h2 className="font-serif text-xl text-stone-800 mb-6 pb-3 border-b border-amber-200">
        Refine Results
      </h2>

      <Accordion
        type="multiple"
        defaultValue={["rating", "date", "categories"]}
        className="border-none"
      >
        <AccordionItem value="rating" className="border-b border-stone-100">
          <AccordionTrigger className="py-3 text-stone-700 hover:text-amber-800 hover:no-underline">
            Rating
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pl-1">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="radio"
                    onChange={() =>
                      setParams((prev) => ({
                        ...prev,
                        RatingSummary: prev.RatingSummary === rating ? null : rating,
                      }))
                    }
                    checked={params.RatingSummary === rating}
                    className="text-amber-600 border-stone-300"
                  />
                  <Label
                    htmlFor={`rating`}
                    className="flex items-center gap-1 text-stone-700"
                  >
                    {rating}{" "}
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> &
                    Up
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* <AccordionItem value="date" className="border-b border-stone-100">
          <AccordionTrigger className="py-3 text-stone-700 hover:text-amber-800 hover:no-underline">
            Review Date
          </AccordionTrigger>
          <AccordionContent>
            <div className="w-1/2 space-y-3 pl-1">
              {/* {/* <div className="flex items-center space-x-2">
                <DatePickerWithRange setParams={setParams} />
              </div> */}
        {/* */}
        {/*
              <div className="flex items-center space-x-2">
                <label>
                  End Date
                  <input
                    type="date"
                    name="radio2"
                    onChange={(e) =>
                      setParams((prev) => ({
                        ...prev,
                        date: new Date(e.target.value).toISOString(),
                      }))
                    }
                    className="w-full text-black border-stone-300"
                  />
                </label>
              </div> 
            </div>
          </AccordionContent>
        </AccordionItem> */}

        <AccordionItem value="categories" className="border-b border-stone-100">
          <AccordionTrigger className="py-3 text-stone-700 hover:text-amber-800 hover:no-underline">
            Product Categories
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pl-1">
              {["MOVIE", "TV_SHOW", "BOOK", "ELECTRONICS", "VEHICLE"].map(
                (category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="radio1"
                      onChange={() =>
                        setParams((prev) => ({
                          ...prev,
                          category: prev.category === category ? "" : category,
                        }))
                      }
                      checked={params.category === category}
                      className="text-amber-600 border-stone-300"
                    />

                    <Label
                      htmlFor={`feature-${category.toLowerCase()}`}
                      className="text-stone-700"
                    >
                      {category}
                    </Label>
                  </div>
                )
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-8 space-y-3">
        <Button
          onClick={onClickApplyFilters}
          className="w-full bg-amber-700 hover:bg-amber-800 text-white"
        >
          Apply Filters
        </Button>
        <Button
          onClick={onClickResetAll}
          variant="outline"
          className="w-full border-amber-200 text-stone-600 hover:bg-amber-50"
        >
          Reset All
        </Button>
      </div>
    </div>
  );
}

function Star(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
