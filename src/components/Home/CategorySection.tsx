import React from 'react';
import { Card, CardContent } from '../ui/card';

const CategorySection = () => {
    return (
        <div>
                 <section className="py-20 bg-[#F9FAFB] dark:bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold dark:text-white text-gray-90">Browse Categories</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Explore reviews across all major product categories</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: "Electronics", count: "15K+" },
              { name: "Movie", count: "12K+" },
              { name: "TV Show", count: "6K+" },
              { name: "Book", count: "9K+" },
              { name: "Vehicle", count: "4K+" },
            ].map((category, index) => (
              <Card key={index} className="bg-card text-center hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} reviews</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
        </div>
    );
};

export default CategorySection;