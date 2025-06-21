"use client"
// app/admin/page.tsx or any component file
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { useGetAnalyticsDataQuery } from '@/redux/services/analyticApi';
import { TAdminAnalyticsResponse } from '@/types/globals';

const COLORS = ['#06923E', '#4F46E5'];

const Charts = () => {

    const {data: analyticData} = useGetAnalyticsDataQuery("")
    const adminData = analyticData as TAdminAnalyticsResponse | undefined
  const barChartData = adminData?.data?.reviewsByCategory?.map((item) => ({
    category: item.category,
    count: item._count._all,
  }));

  const pieChartData = adminData?.data?.reviewStatus?.map((item) => ({
    name: item.isPremium ? 'Premium' : 'Non-Premium',
    value: item._count._all,
  }));

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Summary Cards */}
      <Card className="shadow-lg rounded-2xl p-4 text-center bg-card">
        <CardContent>
          <h2 className="text-xl font-semibold text-gray-600 dark:text-white">Total Earnings</h2>
          <p className="text-3xl font-bold text-green-600">${adminData?.data?.totalEarnings}</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg rounded-2xl p-4 text-center bg-card">
        <CardContent>
          <h2 className="text-xl font-semibold">Premium Reviews</h2>
          <p className="text-3xl font-bold text-green-600">{adminData?.data?.premiumReviewCount}</p>
        </CardContent>
      </Card>

      {/* Add another card if you like */}
      <Card className="shadow-lg rounded-2xl p-4 text-center bg-card">
        <CardContent>
          <h2 className="text-xl font-semibold">Total Reviews</h2>
          <p className="text-3xl font-bold text-green-600">
            {adminData?.data?.reviewStatus.reduce((acc, curr) => acc + curr._count._all, 0)}
          </p>
        </CardContent>
      </Card>

      {/* Bar Chart */}
      <div className="md:col-span-2 bg-card p-4 shadow-lg rounded-2xl">
        <h2 className="text-lg font-semibold mb-4">Reviews by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barChartData}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#4F46E5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-card p-4 shadow-lg rounded-2xl">
        <h2 className="text-lg font-semibold mb-4">Premium vs Non-Premium Reviews</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#06923E"
              label
            >
              {pieChartData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export  default Charts
