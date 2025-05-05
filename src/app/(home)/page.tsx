import Banner from "@/components/Home/Banner";
import ReviewSection from "@/components/Home/ReviewSection";
import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";
import StatsSection from "@/components/Home/Stats";
const Home = async () => {
  return (
    <div>
      {/* Banner section */}
      <Banner />
      {/* Review Section */}
      <ReviewSection />
      {/* Status section */}
      <StatsSection />
    </div>
  );
};

export default Home;
