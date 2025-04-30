"use client";
import { auth } from "@/auth";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { useSession } from "next-auth/react";
import React from "react";
import data from "../../data.json";
const UserDashboard = () => {
  // const session = await auth();
  const session = useSession();
  console.log("from user dashboard", session);
  return (
    <div>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
