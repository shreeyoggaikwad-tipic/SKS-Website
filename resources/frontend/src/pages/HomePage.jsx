import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Products from "../utils/Products";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Broucher from "../assets/Broucher.pdf"


const SmartKitchenHomepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-scroll carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(Products.length / 2));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(Products.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(Products.length / 3)) % Math.ceil(Products.length / 3));
  };

  const handleBroucherDownload = () => {
    const link = document.createElement("a");
    link.href = Broucher; // Update with your actual file name
    link.download = "SmartKitchenSolutions-Brochure.pdf"; // Optional: rename while downloading
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="min-h-screen bg-[#1a1d2e]">
      <Navbar />

      {/* Hero Section with Background Image */}
      <section className="relative  min-h-screen pt-6 overflow-hidden">
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
              <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 mb-4">
                <span className="w-2 h-2 bg-cyan-400 animate-pulse"></span>
                <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase">Innovation Meets Design</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                TRANSFORM YOUR
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  BUFFET EXPERIENCE
                </span>
              </h1>

              <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-2xl">
                Discover cutting-edge smart buffet solutions that blend technology,
                functionality, and aesthetic excellence. Build the buffet of your dreams
                with our premium modular systems and intelligent appliances.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button
                  onClick={handleBroucherDownload}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 font-bold tracking-wider uppercase hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 text-center"
                >
                  Download Broucher
                </button>
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
                  <p className="text-4xl font-bold text-white mb-1">500+</p>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Projects Done</p>
                </div>
                <div className="border-l-2 border-cyan-500 pl-4">
                  <p className="text-4xl font-bold text-white mb-1">10+</p>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Years in Industry</p>
                </div>
                <div className="border-l-2 border-cyan-500 pl-4">
                  <p className="text-4xl font-bold text-white mb-1">3x</p>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">Larger Heating Coverage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-10 bg-[#1f2235]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 uppercase tracking-wide">
              FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">PRODUCTS</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto"></div>
            <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">
              Explore our premium selection of smart buffet solutions
            </p>
          </div>

          {/* Circular Carousel */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ x: ["0%", "-100%"] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
              {/* Duplicate products for seamless loop */}
              {[...Products, ...Products].map((product, index) => (
                <Link
                  key={index}
                  to="/products"
                  className="min-w-[300px] bg-[#282b40] border border-[#3a3f5c] overflow-hidden group hover:border-cyan-500 transition-all duration-300"
                >
                  <div className="relative h-64 overflow-hidden bg-white">
                    <img
                      src={product.image}
                      alt={product.product_name}
                      className="w-full h-full object-contain p-2 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    {/* <p className="text-cyan-400 text-xs uppercase tracking-wider mb-1">{product.category}</p> */}
                    <h3 className="text-lg font-bold text-white">{product.product_name}</h3>
                    <p className="text-white mt-2">{product.description}</p>
                  </div>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 bg-[#282b40]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 uppercase tracking-wide">
              OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">FEATURES</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🏨",
                title: "PROVEN IN LUXURY HOTELS",
                description:
                  "Trusted by top hospitality brands including JW Marriott, Ritz Carlton, Hyatt Regency, Novotel Imagica, and DoubleTree by Hilton."
              },
              {
                icon: "🌐",
                title: "INTERNATIONAL PRESENCE",
                description:
                  "Successfully executed solutions for RAAYA Maldives by Atmosphere, meeting global design and performance standards."
              },
              {
                icon: "🧪",
                title: "TECH-DRIVEN INNOVATION",
                description:
                  "Pioneered advancements like the Thermal Bridge Technology and Touch-Operated Digital Control Panels to meet modern requirements."
              },
              {
                icon: "🔍",
                title: "CONSULTANT APPROVED",
                description:
                  "Received formal approval from HPG Consultants, unlocking access to prestigious projects and elite consultant networks."
              },
              {
                icon: "🎉",
                title: "PREFERRED FOR HIGH-PROFILE EVENTS",
                description:
                  "Selected for premium installations including the globally renowned wedding of Mr. Anant Ambani, a testament to reliability and excellence."
              },
              {
                icon: "🚀",
                title: "FUTURE-READY SOLUTIONS",
                description:
                  "Continuously expanding with new product launches such as Drop-in Ceramic Hot Plates, Heated Decorative Lamps, and advanced Food Warmers."
              }
            ]
              .map((feature, index) => (
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

      {/* Features Section */}
      <section className="py-10 bg-[#282b40]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 uppercase tracking-wide">
              WHY CHOOSE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">US?</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "🛡️",
                title: "DURABILITY",
                description:
                  "Engineered for long-term performance with robust materials designed to withstand intensive daily use."
              },
              {
                icon: "⚙️",
                title: "SPARE PARTS",
                description:
                  "Easily available spare parts ensure seamless maintenance and minimize downtime."
              },
              {
                icon: "🔁",
                title: "REPLACEABLE COMPONENTS",
                description:
                  "Modular design allows individual components to be replaced without affecting the entire system."
              },
              {
                icon: "🪟",
                title: "HIGH-QUALITY GLASS",
                description:
                  "Equipped with premium, heat-resistant glass ensuring superior durability and safety."
              },
              {
                icon: "💎",
                title: "HIGH-QUALITY COMPONENTS",
                description:
                  "Built using industry-grade components offering high reliability and extended operating life."
              },
              {
                icon: "🛠️",
                title: "SERVICE SUPPORT",
                description:
                  "Comprehensive service support with quick response and expert assistance for all installations."
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
      <section className="py-10 bg-gradient-to-b from-[#1f2235] to-[#282b40]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4 uppercase tracking-wide">
            READY TO UPGRADE YOUR BUFFET?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
            Contact our design experts today for a free consultation and transform your buffet into a masterpiece
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: "📍",
                title: "VISIT OFFICE",
                content: "Office No - 23, 2nd Floor Konark Business Center, Opp. Renuka Mata Mandir, Keshav Nagar, Mundhwa, Pune - 411036, Maharashtra",
                a: "https://maps.app.goo.gl/xLnudZSzafmft5dL6"
              },
              {
                icon: "📞",
                title: "CALL US",
                content: "+91 86005 16230\nCall now and get a free consultation",
                a: "tel:+918600516230"
              },
              {
                icon: "✉️",
                title: "EMAIL US",
                content: "info@smartkitchensolutions.in\nQuick Response Guaranteed",
                a: "mailto:info@smartkitchensolutions.in"
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
                <a href={contact.a} className="whitespace-pre-line text-sm text-gray-300">{contact.content}</a>
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