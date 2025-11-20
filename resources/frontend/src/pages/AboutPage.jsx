import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const timelineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    }, { threshold: 0.1 });

    const sections = document.querySelectorAll('[id^="section-"]');
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const values = [
    { title: "Innovation First", description: "Cutting-edge smart kitchen technology designed for modern living.", icon: "⚡" },
    { title: "Quality Craftsmanship", description: "Premium materials and meticulous attention to detail in every product.", icon: "✨" },
    { title: "User-Centric Design", description: "Intuitive interfaces and seamless experiences for effortless cooking.", icon: "🎯" },
    { title: "Sustainability", description: "Eco-friendly solutions that reduce energy consumption and waste.", icon: "🌍" }
  ];

  const whyChooseUs = [
    { title: "10+ Years of Experience", description: "A decade of expertise in smart kitchen innovation and customer satisfaction.", icon: "📅" },
    { title: "5000+ Installations", description: "Trusted by thousands of homes and commercial kitchens nationwide.", icon: "🏠" },
    { title: "24/7 Support", description: "Round-the-clock technical assistance and customer service.", icon: "💬" },
    { title: "Smart Integration", description: "Seamless connectivity with major smart home ecosystems.", icon: "🔗" }
  ];

  const clients = [
    { name: "Bharat Biotech", logo: "https://tse4.mm.bing.net/th/id/OIP.EmKVzSbCLrH_M1BXOCftbAHaEF?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { name: "Jindal Saw Ltd.", logo: "https://tse1.mm.bing.net/th/id/OIP.FYAugToAYsDceosX5e6URQHaDy?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { name: "Dalmia Bharat", logo: "https://attendance.jindalsaw.com/Content/images/JindalLogo.jpg" },
    { name: "Singhania Buildcon", logo: "https://tse3.mm.bing.net/th/id/OIP.pRo39n415dm_gmDPcqsHgQAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { name: "Mythri Infra", logo: "https://mipec.in/wp-content/uploads/2022/06/MYTHRRI-INFRA-PROJECTS-2024-LOGO-1.png" },
  ];


  const timeline = [
    { year: "2014", title: "Company Founded", description: "Started with a vision to transform traditional kitchens into smart, efficient spaces." },
    { year: "2016", title: "First Smart Product Launch", description: "Launched our flagship smart appliance line, revolutionizing kitchen automation." },
    { year: "2018", title: "AI Integration", description: "Introduced AI-powered cooking assistants and predictive maintenance features." },
    { year: "2020", title: "Global Expansion", description: "Expanded operations to international markets across Asia and Europe." },
    { year: "2022", title: "Voice Control Launch", description: "Integrated voice assistant compatibility across all product lines." },
    { year: "2024", title: "Sustainability Initiative", description: "Launched eco-friendly product line with 50% reduced energy consumption." }
  ];

  return (
    <div className="min-h-screen bg-[#282b40]">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-[#282b40] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#06b6d4] blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#06b6d4] blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
            Smart Kitchen <span className="text-[#06b6d4]">Solutions</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            For over 10 years, we've been transforming kitchens with innovative smart technology.
            From cutting-edge appliances to seamless automation, we're redefining modern cooking experiences.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section id="section-story" className={`py-20 bg-[#1f2235] transition-all duration-1000 ${isVisible['section-story'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="mb-6">
              <span className="text-[#06b6d4] text-sm font-semibold tracking-wider uppercase">Our Journey</span>
              <h2 className="text-4xl font-bold text-white mt-2">
                Our <span className="text-[#06b6d4]">Story</span>
              </h2>
              <div className="w-20 h-1 bg-[#06b6d4] mt-4"></div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Founded in 2014, our company emerged from a simple observation: kitchens hadn't evolved with technology. We set out to change that by creating intelligent solutions that make cooking easier, more efficient, and more enjoyable.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              Today, we're a leading innovator in smart kitchen technology, serving thousands of homes and commercial establishments worldwide. Our products seamlessly integrate with modern lifestyles, offering automation, energy efficiency, and intuitive controls.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We believe technology should enhance, not complicate. That's why every product we create is designed with simplicity and functionality at its core, making smart kitchens accessible to everyone.
            </p>
          </div>
          <div className="relative">
            <div className="bg-[#282b40] border-2 border-[#06b6d4] p-12 text-center">
              <div className="text-7xl mb-6">🍳</div>
              <h3 className="text-3xl font-bold mb-4 text-white">Innovation Meets Tradition</h3>
              <p className="text-gray-300 text-lg">Blending cutting-edge technology with the timeless art of cooking to create extraordinary kitchen experiences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section - Horizontal Scrollable */}
      <section id="section-timeline" className={`py-20 bg-[#282b40] transition-all duration-1000 ${isVisible['section-timeline'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
  <div className="max-w-5xl mx-auto px-4">
    <div className="text-center mb-16">
      <span className="text-[#06b6d4] text-sm font-semibold tracking-wider uppercase">Our Journey</span>
      <h2 className="text-4xl font-bold text-white mt-2 mb-4">
        Growth <span className="text-[#06b6d4]">Timeline</span>
      </h2>
      <div className="w-20 h-1 bg-[#06b6d4] mx-auto"></div>
    </div>

    <div className="relative border-l-4 border-[#06b6d4]/50 ml-4 space-y-12">
      {timeline.map((item, index) => (
        <div key={index} className="ml-8 relative">
          {/* Dot */}
          <div className="absolute -left-[36px] top-2 w-6 h-6 bg-[#06b6d4] rounded-full border-4 border-[#282b40]"></div>

          <div className="bg-[#1f2235] p-6 rounded-xl shadow-lg hover:border-[#06b6d4] border border-transparent transition-all duration-300">
            <span className="text-[#06b6d4] font-semibold">{item.year}</span>
            <h3 className="text-xl font-bold text-white mt-1">{item.title}</h3>
            <p className="text-gray-300 mt-2">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Why Choose Us Section */}
      <section id="section-why-choose" className={`py-20 bg-[#282b40] transition-all duration-1000 ${isVisible['section-why-choose'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#06b6d4] text-sm font-semibold tracking-wider uppercase">Benefits</span>
            <h2 className="text-4xl font-bold text-white mt-2 mb-4">
              Why <span className="text-[#06b6d4]">Choose Us?</span>
            </h2>
            <div className="w-20 h-1 bg-[#06b6d4] mx-auto"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-[#1f2235] border border-[#06b6d4]/30 p-8 hover:border-[#06b6d4] transition-all duration-300 text-center group">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h3 className="font-bold text-white mb-3 text-xl">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="section-values" className={`py-20 bg-[#1f2235] transition-all duration-1000 ${isVisible['section-values'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#06b6d4] text-sm font-semibold tracking-wider uppercase">Core Principles</span>
            <h2 className="text-4xl font-bold text-white mt-2 mb-4">
              Our <span className="text-[#06b6d4]">Values</span>
            </h2>
            <div className="w-20 h-1 bg-[#06b6d4] mx-auto"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-[#282b40] border-2 border-[#06b6d4]/30 p-8 hover:border-[#06b6d4] hover:-translate-y-2 transition-all duration-300">
                <div className="w-16 h-16 bg-[#06b6d4] flex items-center justify-center text-3xl text-white mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Clients Section */}
      <section id="section-clients" className={`py-20 bg-[#282b40] transition-all duration-1000 ${isVisible['section-clients'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-[#06b6d4] text-sm font-semibold tracking-wider uppercase">Partners</span>
            <h2 className="text-4xl font-bold text-white mt-2 mb-4">
              Our <span className="text-[#06b6d4]">Clients</span>
            </h2>
            <div className="w-20 h-1 bg-[#06b6d4] mx-auto mb-4"></div>
            <p className="text-gray-300 text-lg">Trusted by leading businesses and institutions</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {clients.map((client, index) => (
              <div
                key={index}
                className="bg-white border-2 border-[#06b6d4]/30 hover:border-[#06b6d4] p-8 flex items-center justify-center w-56 h-32 transition-all duration-300"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-20 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#282b40] border-t-2 border-[#06b6d4] text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Kitchen?</h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of satisfied customers who have upgraded to smart kitchen solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/products" className="border-2 border-[#06b6d4] text-[#06b6d4] px-10 py-4 font-semibold hover:bg-[#06b6d4] hover:text-white transition-all text-lg">
              Explore Products
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;