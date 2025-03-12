import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import { Link } from "react-router-dom";
import heroImage1 from "../assets/hero.jpg"; 
import heroImage2 from "../assets/hero3.jpg";
import Footer from "../components/Footer";
const LandingPage = () => {
  const [currentImage, setCurrentImage] = useState(heroImage1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage === heroImage1 ? heroImage2 : heroImage1));
    }, 5000); 

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020817] to-[#0f172a] text-white">
      <section
        className="relative text-center py-32 px-6 flex flex-col items-center transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${currentImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(2, 8, 23, 0.6)",
        }}
      >
        <h2 className="text-5xl font-extrabold tracking-wide flex items-center gap-3">
          Plan Your Perfect Trip ✈️
        </h2>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Discover the best routes, optimize your travel, and make every journey seamless with TripGuide.
        </p>
        <Link
          to="/trip-planner"
          className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition"
        >
          Get Started 🚀
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 text-center">
        <h3 className="text-4xl font-bold">Why Choose TripGuide?</h3>
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {[
            { title: "📍 Smart Location Search", desc: "Find and add locations easily using geocoding." },
            { title: "🗺️ Optimized Routes", desc: "Get the best and most efficient travel routes." },
            { title: "🚗 Travel Smarter", desc: "Save time and fuel with our intelligent planner." }
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white/10 backdrop-blur-md shadow-md rounded-lg border border-white/20 text-white"
            >
              <h4 className="text-2xl font-semibold">{feature.title}</h4>
              <p className="mt-2 text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>


    </div>
  );
};

export default LandingPage;
