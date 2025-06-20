import Image from "next/image";
import { CheckCircle } from "lucide-react";
import mission from "@/assets/review-portal.png";
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
<section className="relative py-20 px-4 bg-[#F9FAFB] dark:bg-background">
  <div className="max-w-6xl mx-auto text-center">
    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-dark:text-white">
      About Us
    </h1>
    <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
      We&apos;re building the world&apos;s most trusted product review
      platform where authentic user experiences meet expert insights to
      help you make informed purchasing decisions.
    </p>
  </div>
</section>

{/* Mission Section */}
<section className="py-20 px-4 dark:bg-[#121212]">
  <div className="max-w-6xl mx-auto">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
          Our Mission: Transparency in Every Purchase
        </h2>
        <p className="text-lg text-muted-foreground mb-6">
          In a world flooded with products and marketing claims, we believe everyone deserves access to honest, detailed reviews before making a purchase. Our platform combines the power of community-driven reviews with expert analysis to create the most comprehensive review ecosystem.
        </p>
        <p className="text-lg text-muted-foreground mb-8">
          Whether you&apos;re looking for quick community insights or in-depth professional analysis, we&apos;ve got you covered with both free community reviews and premium expert evaluations.
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="font-medium text-white">Verified Reviews</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="font-medium text-white">Expert Analysis</span>
          </div>
        </div>
      </div>
      <div className="relative">
        <Image
          src={mission}
          alt="Team collaboration"
          width={500}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  </div>
</section>

{/* How It Works */}
<section className="py-20 px-4 bg-[#F9FAFB] dark:bg-background">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-600">
        How It Works
      </h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Simple, transparent, and designed to give you the insights you need
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {/* Cards remain unchanged */}
    </div>
  </div>
</section>

{/* Stats Section */}
<section className="py-20 px-4 dark:bg-[#121212]">
  <div className="max-w-6xl mx-auto">
    <div className="grid md:grid-cols-4 gap-8 text-center">
      <div>
        <div className="text-4xl font-bold text-primary mb-2">50K+</div>
        <div className="text-muted-foreground">Active Users</div>
      </div>
      <div>
        <div className="text-4xl font-bold text-primary mb-2">200K+</div>
        <div className="text-muted-foreground">Reviews Published</div>
      </div>
      <div>
        <div className="text-4xl font-bold text-primary mb-2">15K+</div>
        <div className="text-muted-foreground">Products Reviewed</div>
      </div>
      <div>
        <div className="text-4xl font-bold text-primary mb-2">98%</div>
        <div className="text-muted-foreground">User Satisfaction</div>
      </div>
    </div>
  </div>
</section>

{/* Team Section */}
<section className="py-20 px-4 bg-[#F9FAFB] dark:bg-background">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-600">
        Meet Our Team
      </h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Passionate individuals dedicated to creating the best review experience
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Cards remain unchanged */}
    </div>
  </div>
</section>

    </div>
  );
}
