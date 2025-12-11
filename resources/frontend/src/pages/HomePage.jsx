import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Products from "../utils/Products";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BrochureDownloadModal from "../components/BrochureDownloadModal";

import BgHome from "../assets/BgHome.jpg"
import { Hotel, Globe, FlaskConical, CircleCheck, PartyPopper, Rocket, Shield, Settings, RefreshCw, Layers, Gem, Wrench, MapPin, Phone, Mail, Sparkles } from "lucide-react";


const SmartKitchenHomepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showModal, setShowModal] = useState(false);

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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Side-by-Side Layout */}
      <section className="relative py-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="relative z-10">
              {/* Badge */}
              {/* <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-4 py-2 mb-6 rounded-full">
                <span className="w-2 h-2 bg-cyan-500 animate-pulse rounded-full"></span>
                <span className="text-cyan-600 text-sm font-bold tracking-wider uppercase">Innovation Meets Design</span>
              </div> */}

              {/* Main Heading */}
              <h1 className="text-4xl lg:text-5xl font-extrabold text-blue-950 mb-6 leading-tight">
                TRANSFORM YOUR
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                  BUFFET EXPERIENCE
                </span>
              </h1>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-xl">
                Discover cutting-edge smart buffet solutions that blend technology,
                functionality, and aesthetic excellence. Build the buffet of your dreams
                with our premium modular systems and intelligent appliances.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 font-bold tracking-wider uppercase hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 text-center rounded-lg"
                >
                  Download Brochure
                </button>
                <Link
                  to="/products"
                  className="border-2 border-blue-200 text-blue-900 px-8 py-4 font-bold tracking-wider uppercase hover:border-blue-600 hover:text-blue-600 transition-all duration-300 text-center rounded-lg"
                >
                  View Products
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-3xl font-bold text-blue-950 mb-1">500+</p>
                  <p className="text-xs text-blue-600 uppercase tracking-wide font-semibold">Projects Done</p>
                </div>
                <div className="border-l border-gray-200 pl-8">
                  <p className="text-3xl font-bold text-blue-950 mb-1">10+</p>
                  <p className="text-xs text-blue-600 uppercase tracking-wide font-semibold">Years Active</p>
                </div>
                <div className="border-l border-gray-200 pl-8">
                  <p className="text-3xl font-bold text-blue-950 mb-1">3x</p>
                  <p className="text-xs text-blue-600 uppercase tracking-wide font-semibold">Heating Power</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl opacity-20 blur-2xl animate-pulse"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={BgHome}
                  alt="Smart Buffet Solutions"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/50 to-transparent"></div>
              </div>

              {/* Floating Element 1 */}
              <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-xl shadow-xl border border-gray-100 hidden lg:block animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Sparkles className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">Energy Efficient</p>
                    <p className="text-xs text-gray-500">Save up to 40% power</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gradient-to-b from-white via-white/0 to-blue-950">
        {/* Featured Products Carousel */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-blue-900 mb-4 uppercase tracking-wide">
                FEATURED <span >PRODUCTS</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto"></div>
              <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto">
                Explore our premium selection of smart buffet solutions
              </p>
            </div>

            {/* Circular Carousel */}
            <div className="overflow-hidden">
              <div
                className="flex gap-6 animate-marquee hover:[animation-play-state:paused]"
              >
                {/* Duplicate products for seamless loop */}
                {[...Products, ...Products].map((product, index) => (
                  <Link
                    key={index}
                    to="/products"
                    className="min-w-[300px] bg-white border-2 border-cyan-500 overflow-hidden group  transition-all duration-300"
                  >
                    <div className="relative h-64 overflow-hidden bg-white">
                      <img
                        src={product.image}
                        alt={product.product_name}
                        className="w-full h-full object-contain p-2 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-bold text-blue-900">{product.product_name}</h3>
                      <p className="text-gray-600 text-sm mt-2">{product.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-blue-900 mb-4 uppercase tracking-wide">
                OUR <span >FEATURES</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Hotel size={48} />,
                  title: "PROVEN IN LUXURY HOTELS",
                  description:
                    "Trusted by top hospitality brands including JW Marriott, Ritz Carlton, Hyatt Regency, Novotel Imagica, and DoubleTree by Hilton."
                },
                {
                  icon: <Globe size={48} />,
                  title: "INTERNATIONAL PRESENCE",
                  description:
                    "Successfully executed solutions for RAAYA Maldives by Atmosphere, meeting global design and performance standards."
                },
                {
                  icon: <FlaskConical size={48} />,
                  title: "TECH-DRIVEN INNOVATION",
                  description:
                    "Pioneered advancements like the Thermal Bridge Technology and Touch-Operated Digital Control Panels to meet modern requirements."
                },
                {
                  icon: <CircleCheck size={48} />,
                  title: "CONSULTANT APPROVED",
                  description:
                    "Received formal approval from HPG Consultants, unlocking access to prestigious projects and elite consultant networks."
                },
                {
                  icon: <PartyPopper size={48} />,
                  title: "PREFERRED FOR HIGH-PROFILE EVENTS",
                  description:
                    "Selected for premium installations including the globally renowned wedding of Mr. Anant Ambani, a testament to reliability and excellence."
                },
                {
                  icon: <Rocket size={48} />,
                  title: "FUTURE-READY SOLUTIONS",
                  description:
                    "Continuously expanding with new product launches such as Drop-in Ceramic Hot Plates, Heated Decorative Lamps, and advanced Food Warmers."
                }
              ]
                .map((feature, index) => (
                  <div
                    key={index}
                    className="p-8 text-center bg-white border-2 border-cyan-500 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-center text-cyan-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-bold text-blue-900 mb-4 uppercase tracking-wider group-hover:text-cyan-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-blue-900 mb-4 uppercase tracking-wide">
                WHY CHOOSE <span >US?</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Shield size={48} />,
                  title: "DURABILITY",
                  description:
                    "Engineered for long-term performance with robust materials designed to withstand intensive daily use."
                },
                {
                  icon: <Settings size={48} />,
                  title: "SPARE PARTS",
                  description:
                    "Easily available spare parts ensure seamless maintenance and minimize downtime."
                },
                {
                  icon: <RefreshCw size={48} />,
                  title: "REPLACEABLE COMPONENTS",
                  description:
                    "Modular design allows individual components to be replaced without affecting the entire system."
                },
                {
                  icon: <Layers size={48} />,
                  title: "HIGH-QUALITY GLASS",
                  description:
                    "Equipped with premium, heat-resistant glass ensuring superior durability and safety."
                },
                {
                  icon: <Gem size={48} />,
                  title: "HIGH-QUALITY COMPONENTS",
                  description:
                    "Built using industry-grade components offering high reliability and extended operating life."
                },
                {
                  icon: <Wrench size={48} />,
                  title: "SERVICE SUPPORT",
                  description:
                    "Comprehensive service support with quick response and expert assistance for all installations."
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className=" p-8 text-center bg-white border-2 border-cyan-500 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-center text-cyan-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-blue-900 mb-4 uppercase tracking-wider group-hover:text-cyan-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-10">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-4 uppercase tracking-wide">
              READY TO UPGRADE YOUR BUFFET?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-white mb-12 max-w-2xl mx-auto">
              Contact our design experts today for a free consultation and transform your buffet into a masterpiece
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  icon: <MapPin size={48} />,
                  title: "VISIT OFFICE",
                  content: "Office No - 23, 2nd Floor Konark Business Center, Opp. Renuka Mata Mandir, Keshav Nagar, Mundhwa, Pune - 411036, Maharashtra",
                  a: "https://maps.app.goo.gl/xLnudZSzafmft5dL6"
                },
                {
                  icon: <Phone size={48} />,
                  title: "CALL US",
                  content: "+91 86005 16230\nCall now and get a free consultation",
                  a: "tel:+918600516230"
                },
                {
                  icon: <Mail size={48} />,
                  title: "EMAIL US",
                  content: "info@smartkitchensolutions.in\nQuick Response Guaranteed",
                  a: "mailto:info@smartkitchensolutions.in"
                }
              ].map((contact, index) => (
                <div
                  key={index}
                  className="bg-white border-2  p-8 border-cyan-500 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-center text-cyan-600 mb-4 group-hover:scale-110 transform transition-transform">
                    {contact.icon}
                  </div>
                  <h3 className="text-sm font-bold text-cyan-400 mb-3 uppercase tracking-wider">{contact.title}</h3>
                  <a href={contact.a} className="whitespace-pre-line text-sm text-gray-600">{contact.content}</a>
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
      </div>

      <Footer />
      <BrochureDownloadModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default SmartKitchenHomepage;