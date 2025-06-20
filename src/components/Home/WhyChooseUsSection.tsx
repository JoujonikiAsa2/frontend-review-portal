import React from 'react';
import { Users, Shield, TrendingUp, Award } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const WhyChooseUsSection = () => {
    return (
        <div>
                  {/* Features Section */}
      <section className="py-20 bg-[#F9FAFB] dark:bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold dark:text-white text-gray-900">Why Choose Our Platform?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive, unbiased reviews to help you make the best purchasing decisions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>Verified Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  All reviews are verified from real users who have purchased and used the products
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>Expert Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Professional reviewers and industry experts provide detailed technical insights
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle>Real-time Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Stay updated with the latest product releases and trending reviews</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
        </div>
    );
};

export default WhyChooseUsSection;