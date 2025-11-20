import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

const SmartKitchenHomepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

 

  // Animated numbers
  const [projectsCompleted, setProjectsCompleted] = useState(500);
  const [yearsExperience, setYearsExperience] = useState(15);
  const [productsInstalled, setProductsInstalled] = useState(1000);

  // Featured products for carousel
  const featuredProducts = [
    {
      id: 1,
      name: "Smart Refrigerator Pro",
      category: "Smart Appliances",
      image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500",
      price: "$2,499"
    },
    {
      id: 2,
      name: "Modular Cabinet System",
      category: "Modular Kitchens",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500",
      price: "$4,999"
    },
    {
      id: 3,
      name: "LED Ambient Lighting",
      category: "Lighting Systems",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500",
      price: "$799"
    },
    {
      id: 4,
      name: "Granite Countertop",
      category: "Countertops",
      image: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=500",
      price: "$3,499"
    },
    {
      id: 5,
      name: "Smart Oven System",
      category: "Smart Appliances",
      image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=500",
      price: "$1,899"
    },
    {
      id: 6,
      name: "Storage Organizer Pro",
      category: "Storage Solutions",
      image: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=500",
      price: "$599"
    }
  ];

  // Auto-scroll carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(featuredProducts.length / 3));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(featuredProducts.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(featuredProducts.length / 3)) % Math.ceil(featuredProducts.length / 3));
  };

  return (
    <div className="min-h-screen bg-[#1a1d2e]">
      <Navbar />

      {/* Hero Section with Background Image */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1920&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#282b40]/95 via-[#282b40]/85 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-cyan-400 animate-pulse"></span>
                <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase">Innovation Meets Design</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                TRANSFORM YOUR
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  KITCHEN EXPERIENCE
                </span>
              </h1>

              <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-2xl">
                Discover cutting-edge smart kitchen solutions that blend technology, 
                functionality, and aesthetic excellence. Build the kitchen of your dreams 
                with our premium modular systems and intelligent appliances.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link 
                  to="/contact"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 font-bold tracking-wider uppercase hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 text-center"
                >
                  Download Broucher
                </Link>
                <Link 
                  to="/products"
                  className="border-2 border-cyan-500 text-cyan-400 px-8 py-4 font-bold tracking-wider uppercase hover:bg-cyan-500 hover:text-white transition-all duration-300 text-center"
                >
                  View Products
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-2xl">
                <div className="border-l-2 border-cyan-500 pl-4">
                  <p className="text-4xl font-bold text-white mb-1">{projectsCompleted}+</p>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Projects Done</p>
                </div>
                <div className="border-l-2 border-cyan-500 pl-4">
                  <p className="text-4xl font-bold text-white mb-1">{yearsExperience}+</p>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Years Experience</p>
                </div>
                <div className="border-l-2 border-cyan-500 pl-4">
                  <p className="text-4xl font-bold text-white mb-1">{productsInstalled}+</p>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Products Installed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-20 bg-[#1f2235]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 uppercase tracking-wide">
              FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">PRODUCTS</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto"></div>
            <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">
              Explore our premium selection of smart kitchen solutions
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            {/* Carousel Track */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(featuredProducts.length / 3) }).map((_, slideIndex) => (
                  <div key={slideIndex} className="min-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
                    {featuredProducts.slice(slideIndex * 3, slideIndex * 3 + 3).map((product) => (
                      <div
                        key={product.id}
                        className="bg-[#282b40] border border-[#3a3f5c] overflow-hidden group hover:border-cyan-500 transition-all duration-300"
                      >
                        <div className="relative overflow-hidden h-64">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#282b40] via-transparent to-transparent opacity-60"></div>
                          <span className="absolute top-4 right-4 bg-cyan-500 text-white px-3 py-1 text-xs font-bold uppercase">
                            Featured
                          </span>
                        </div>
                        <div className="p-6">
                          <p className="text-cyan-400 text-xs uppercase tracking-wider mb-2">{product.category}</p>
                          <h3 className="text-xl font-bold text-white mb-3">{product.name}</h3>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-white">{product.price}</span>
                            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 text-sm font-bold uppercase hover:from-cyan-600 hover:to-blue-700 transition-all">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-[#282b40] border border-cyan-500 text-cyan-400 p-3 hover:bg-cyan-500 hover:text-white transition-all duration-300 z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-[#282b40] border border-cyan-500 text-cyan-400 p-3 hover:bg-cyan-500 hover:text-white transition-all duration-300 z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.ceil(featuredProducts.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 transition-all duration-300 ${
                    currentSlide === index ? 'bg-cyan-500 w-8' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#282b40]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 uppercase tracking-wide">
              WHY CHOOSE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">US</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🎯",
                title: "PRECISION DESIGN",
                description: "Custom-tailored kitchen solutions designed to maximize space efficiency and aesthetic appeal with millimeter precision."
              },
              {
                icon: "🔧",
                title: "EXPERT INSTALLATION",
                description: "Professional installation by certified technicians ensuring perfect fit and optimal performance of every component."
              },
              {
                icon: "⚡",
                title: "SMART TECHNOLOGY",
                description: "Cutting-edge IoT-enabled appliances that bring automation and convenience to your daily cooking experience."
              },
              {
                icon: "🛡️",
                title: "LIFETIME WARRANTY",
                description: "Comprehensive warranty coverage and dedicated after-sales support for complete peace of mind."
              },
              {
                icon: "♻️",
                title: "ECO-FRIENDLY",
                description: "Sustainable materials and energy-efficient solutions that reduce environmental impact without compromising quality."
              },
              {
                icon: "💎",
                title: "PREMIUM QUALITY",
                description: "Only the finest materials and world-class brands for durability and elegance that lasts generations."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-[#1f2235] p-8 border-2 border-[#3a3f5c] hover:border-cyan-500 transition-all duration-300 group"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider group-hover:text-cyan-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-b from-[#1f2235] to-[#282b40]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4 uppercase tracking-wide">
            READY TO UPGRADE YOUR KITCHEN?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
            Contact our design experts today for a free consultation and transform your kitchen into a masterpiece
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: "📍",
                title: "VISIT SHOWROOM",
                content: "123 Design Avenue, Tech Park\nSmart City, Innovation District\nOpen Mon-Sat 9AM-7PM"
              },
              {
                icon: "📞",
                title: "CALL US",
                content: "+91 98765 43210\n+91 98765 43211\n24/7 Support Available"
              },
              {
                icon: "✉️",
                title: "EMAIL US",
                content: "info@smartkitchenpro.com\nsales@smartkitchenpro.com\nQuick Response Guaranteed"
              }
            ].map((contact, index) => (
              <div
                key={index}
                className="bg-[#282b40] border-2 border-[#3a3f5c] p-8 hover:border-cyan-500 transition-all duration-300 group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transform transition-transform">
                  {contact.icon}
                </div>
                <h3 className="text-sm font-bold text-cyan-400 mb-3 uppercase tracking-wider">{contact.title}</h3>
                <p className="whitespace-pre-line text-sm text-gray-300">{contact.content}</p>
              </div>
            ))}
          </div>

          <Link 
            to="/contact"
            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-12 py-4 font-bold tracking-wider uppercase hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
          >
            Schedule Consultation
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SmartKitchenHomepage;