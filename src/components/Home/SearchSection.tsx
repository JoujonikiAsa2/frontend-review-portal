import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { SearchIcon } from 'lucide-react';

const SearchSection = () => {
    return (
        <div>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold dark:text-white text-gray-900">Find Your Perfect Review</h2>
            <div className="relative">
              <Input
                placeholder="Search for review category..."
                className="h-14 pl-12 pr-32 text-lg border-2 border-gray-200 focus:border-blue-500"
              />
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10">Search</Button>
            </div>
          </div>
        </div>
      </section>
        </div>
    );
};

export default SearchSection;