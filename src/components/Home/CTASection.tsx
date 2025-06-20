import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link'

const CTASection = () => {
    return (
        <div>      <section className="py-20 bg-background text-black dark:text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold dark:text-white text-gray-90">Ready to Make Smarter Purchases?</h2>
            <p className="text-xl text-gray-400 dark:text-gray-200">
              Join our community today and get access to exclusive reviews, early product insights, and personalized
              recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register"><Button size="lg" className="dark:bg-white text-white dark:text-black hover:cursor-pointer hover:scale-102">
                Join Community
              </Button>
              </Link>
              <Link href="/reviews">
              <Button size="lg" variant="outline" className="border text-black dark:text-white hover:cursor-pointer hover:scale-102">
                Start Exploring
              </Button></Link>
            </div>
          </div>
        </div>
      </section>
        </div>
    );
};

export default CTASection;