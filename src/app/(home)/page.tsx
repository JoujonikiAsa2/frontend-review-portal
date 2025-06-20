import Banner from "@/components/Home/Banner";
import CategorySection from "@/components/Home/CategorySection";
import CTASection from "@/components/Home/CTASection";
import ReviewSection from "@/components/Home/ReviewSection";
import SearchSection from "@/components/Home/SearchSection";
import WhyChooseUsSection from "@/components/Home/WhyChooseUsSection";
const Home = () => {
  return (
    <div>
      {/* Banner section */}
      <Banner/>
      {/* Search Section */}
      <SearchSection/>   
         
      <WhyChooseUsSection/>

      {/* Review Section */}
      <ReviewSection />
    <CategorySection />
    <CTASection/>    
    </div>
  );
};

export default Home;