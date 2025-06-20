import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { HelpCircle } from "lucide-react"

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4  bg-[#F9FAFB] dark:bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find answers to common questions about our review platform, premium features, and how to get the most out of
            your experience.
          </p>
        </div>
      </section>
      {/* FAQ Content */}
      <section className="py-16 px-4 dark:bg-[#121212]">
        <div className="max-w-4xl mx-auto">
          {/* Getting Started */}
          <Card className="mb-8 bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="secondary">Getting Started</Badge>
                <span>New User Questions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="what-is-platform">
                  <AccordionTrigger>What is this review platform?</AccordionTrigger>
                  <AccordionContent>
                    Our platform is a comprehensive product review ecosystem that combines authentic user reviews with
                    expert analysis. Users can read and write reviews for free, while premium subscribers get access to
                    detailed expert reviews, comparison guides, and professional insights from our team of specialists.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="how-to-start">
                  <AccordionTrigger>How do I get started?</AccordionTrigger>
                  <AccordionContent>
                    Simply create a free account to start reading community reviews and writing your own. You can browse
                    thousands of product reviews immediately. If you want access to premium expert reviews, you can
                    upgrade to a premium subscription at any time from your account settings.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="free-vs-premium">
                  <AccordionTrigger>What&apos;s the difference between free and premium reviews?</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Free Community Reviews:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Written by verified users who purchased the product</li>
                          <li>Personal experiences and opinions</li>
                          <li>Star ratings and basic feedback</li>
                          <li>Unlimited access to read and write</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Premium Expert Reviews:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          <li>Professional analysis by industry experts</li>
                          <li>Detailed testing and comparison data</li>
                          <li>Pros/cons analysis with technical insights</li>
                          <li>Buying guides and recommendations</li>
                          <li>Early access to new product reviews</li>
                        </ul>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="account-required">
                  <AccordionTrigger>Do I need an account to read reviews?</AccordionTrigger>
                  <AccordionContent>
                    You can browse and read community reviews without an account, but creating a free account allows you
                    to write reviews, save favorites, and get personalized recommendations. Premium reviews require a
                    subscription and account.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          {/* Premium Reviews */}
          <Card className="mb-8 bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge className="bg-yellow-500">Premium</Badge>
                <span>Premium Reviews & Subscription</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="premium-cost">
                  <AccordionTrigger>How much does premium access cost?</AccordionTrigger>
                  <AccordionContent>
                    We offer flexible premium plans:
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>
                        <strong>Monthly:</strong> $9.99/month - Cancel anytime
                      </li>
                      <li>
                        <strong>Annual:</strong> $79.99/year - Save 33% (equivalent to $6.67/month)
                      </li>
                      <li>
                        <strong>Lifetime:</strong> $199.99 - One-time payment for permanent access
                      </li>
                    </ul>
                    All plans include a 7-day free trial with full access to premium features.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="premium-benefits">
                  <AccordionTrigger>What do I get with premium access?</AccordionTrigger>
                  <AccordionContent>
                    Premium subscribers enjoy:
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Unlimited access to expert reviews and analysis</li>
                      <li>Detailed comparison charts and buying guides</li>
                      <li>Early access to reviews of new products</li>
                      <li>Ad-free browsing experience</li>
                      <li>Priority customer support</li>
                      <li>Exclusive webinars and product insights</li>
                      <li>Advanced search and filtering options</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cancel-subscription">
                  <AccordionTrigger>Can I cancel my premium subscription?</AccordionTrigger>
                  <AccordionContent>
                    Yes, you can cancel your subscription at any time from your account settings. Your premium access
                    will continue until the end of your current billing period. We don&apos;t offer refunds for partial
                    months, but you&apos;ll retain access to premium features until your subscription expires.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="free-trial">
                  <AccordionTrigger>Is there a free trial for premium features?</AccordionTrigger>
                  <AccordionContent>
                    Yes! We offer a 7-day free trial for all new premium subscribers. You&apos;ll have full access to all
                    premium features during the trial period. You can cancel before the trial ends to avoid being
                    charged. No credit card required to start the trial.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
