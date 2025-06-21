import React from 'react';
import { SearchBar } from '../common/search-bar';

const SearchSection = () => {
    return (
        <div>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold dark:text-white text-gray-900">Find Your Perfect Review</h2>
            <div className="relative">
              <SearchBar/>
            </div>
          </div>
        </div>
      </section>
        </div>
    );
};

export default SearchSection;