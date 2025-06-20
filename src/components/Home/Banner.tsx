import React from "react";
import { Button } from "../ui/button";
import { Play, Search, Star } from "lucide-react";
import { Badge } from "../ui/badge";

const Banner = () => {
  return (
<section className="relative overflow-hidden bg-background">
  <div className="absolute inset-0 bg-[#F9FAFB] dark:bg-black/30" />
  <div className="relative container mx-auto px-4 py-20 lg:py-32 text-gray-900 dark:text-white">
    <div className="grid lg:grid-cols-2 gap-12 items-center">

      <div className="space-y-8">
        <Badge className="bg-green-600/20 text-green-600 border-green-600/30 hover:bg-green-600/30">
          🚀 Trusted by 50K+ Users
        </Badge>

        <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
          Discover the Best Products with
          <span className="text-green-600"> Expert Reviews</span>
        </h1>

        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          Make informed decisions with authentic reviews from real users and experts...
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-semibold">
            <Search className="w-5 h-5 mr-2" />
            Explore Reviews
          </Button>
          <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-100 dark:hover:bg-gray-800">
            <Play className="w-5 h-5 mr-2" />
            Watch Demo
          </Button>
        </div>
      </div>

      <div className="relative">
        <div className="relative z-10 bg-white/60 dark:bg-white/10 rounded-2xl p-6 border border-white/30 dark:border-white/20">
          <div className="relative">
              <div className="relative z-10 bg-white/10 rounded-2xl p-6 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-white fill-current" />
                    </div>
                    <div>
                      <div className="font-semibold">Latest Review</div>
                      <div className="text-sm text-gray-500">iPhone 15 Pro Max</div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">
                    Exceptional camera quality and performance. The titanium build feels premium...
                  </p>
                </div>
              </div>
            </div>
        </div>
      </div>

    </div>
  </div>
</section>
  );
};

export default Banner;
