import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BGAbout from "../assets/BGAbout.jpg";
import { Zap, Sparkles, Target, Globe } from "lucide-react";

const AboutPage = () => {
    const [isVisible, setIsVisible] = useState({});
    const timelineRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible((prev) => ({
                            ...prev,
                            [entry.target.id]: true,
                        }));
                    }
                });
            },
            { threshold: 0.1 }
        );

        const sections = document.querySelectorAll('[id^="section-"]');
        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    const values = [
        {
            title: "Innovation First",
            description:
                "Cutting-edge smart kitchen technology designed for modern living.",
            icon: <Zap size={32} />,
        },
        {
            title: "Quality Craftsmanship",
            description:
                "Premium materials and meticulous attention to detail in every product.",
            icon: <Sparkles size={32} />,
        },
        {
            title: "User-Centric Design",
            description:
                "Intuitive interfaces and seamless experiences for effortless cooking.",
            icon: <Target size={32} />,
        },
        {
            title: "Sustainability",
            description:
                "Eco-friendly solutions that reduce energy consumption and waste.",
            icon: <Globe size={32} />,
        },
    ];

    const timeline = [
        {
            year: "2014",
            title: "First Pilot Project at JW Marriott Pune",
            description:
                "In 2014, we began our journey by undertaking our first pilot project at JW Marriott Pune. This project marked the foundation of our brand, establishing our commitment to exceptional quality, innovation, and customer satisfaction. The outstanding performance of our products laid the groundwork for long-term trust with one of the world's leading hospitality groups.",
        },
        {
            year: "2017",
            title: "Complete Supply & Installation at Ritz Carlton Pune",
            description:
                "By 2017, after delivering impressive results at JW Marriott, we were entrusted with the complete supply and installation of our products for Ritz Carlton Pune, a luxury brand under the same Marriott Group and owned by Panchshil Corporate. The successful execution of this project further solidified our reputation for consistent excellence and reliability in premium hospitality environments.",
        },
        {
            year: "2019",
            title: "Expansion to Hyatt Regency & Novotel Imagica",
            description:
                "In 2019, our growing recognition enabled us to supply and install our solutions at Hyatt Regency and Novotel Imagica, expanding our presence across major international hotel chains and strengthening our portfolio of high-end hospitality clients.",
        },
        {
            year: "2021",
            title: "International Entry - Maldives Project & Upgrades",
            description:
                "The year 2021 marked a significant milestone with our entry into the international market. Encouraged by our long-term client, we supplied our solutions to the Maldives project RAAYA by Atmosphere (formerly known as Amari). During the same period, we also upgraded the Marriott Suites, demonstrating our ability to meet global standards and adapt to sophisticated design requirements.",
        },
        {
            year: "2022",
            title: "Thermal Bridge Technology & Regional Growth",
            description:
                "In 2022, we focused on innovation and strategic expansion by collaborating with the Kalyani Group in Bangalore, where we introduced the Thermal Bridge Technology to our product line. We also completed partial installations at Courtyard Marriott Hebbal, Courtyard Marriott Chakan, and Radisson Blu Pune, reinforcing our growth in both South and West India. This year highlighted our dedication to continuous technological enhancement and market expansion.",
        },
        {
            year: "2023",
            title: "Advanced Control Panel & HPG Consultant Approval",
            description:
                "The year 2023 brought significant product advancements, including the launch of our upgraded control panel featuring the Infinity Controller, an IP65 protection rating, and a modern aesthetic design. These improvements enhanced safety, reliability, and user experience. The upgraded system was successfully installed at DoubleTree by Hilton Pune, receiving excellent feedback for its performance.",
        },
        {
            year: "2023",
            title: "Consultant Recognition & High-Profile Projects",
            description:
                "In the same year, our products received formal approval from HPG Consultants, a recognition that opened doors to premium hospitality opportunities. We were awarded projects for Welcome Hotel Chennai and Gnosis Jamnagar - Reliance, including installations for the globally renowned wedding of Mr. Anant Ambani. This endorsement significantly elevated our credibility and visibility in consultant networks and luxury projects.",
        },
        {
            year: "2023",
            title: "Touch-Operated Digital Control Panel",
            description:
                "Continuing our focus on modernization in 2023, we launched a Touch-Operated Digital Control Panel, designed to meet contemporary market trends and enhance user convenience with a sleek, intuitive interface.",
        },
        {
            year: "2024",
            title: "Drop-in Ceramic Hot Plate & Decorative Lamps",
            description:
                "In 2024, we introduced the Drop-in Ceramic Hot Plate with Seamless Trimmer, engineered for easy installation and refined aesthetics suitable for premium buffet counters. The same year, we launched our Heated Decorative Lamps, crafted with high-quality materials to elevate buffet presentation while ensuring optimal temperature maintenance. These products received exceptional response from the market and strengthened our position as an innovation-driven brand.",
        },
        {
            year: "2025",
            title: "Product Portfolio Expansion - Food Warmers",
            description:
                "By 2025, we expanded our product portfolio further with the launch of a sophisticated range of Food Warmers, designed to meet global standards of performance, durability, and energy efficiency. This addition reflects our ongoing commitment to providing comprehensive, world-class solutions for the hospitality and food service industry.",
        },
    ];

    return (
        <div className="min-h-screen bg-[#3b4059]">
            <Navbar />

            {/* Hero Section */}
            <section className="relative py-10 bg-[#3b4059] border-b-2 border-cyan-500">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-[#06b6d4] blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#06b6d4] blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
                        Smart Kitchen{" "}
                        <span className="text-[#06b6d4]">Solutions</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        For over 10 years, we've been transforming buffet's with
                        innovative smart technology. From cutting-edge
                        appliances to seamless automation, we're redefining
                        modern cooking experiences.
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section
                id="section-story"
                className={`py-10 bg-[#32364a] transition-all duration-1000 ${
                    isVisible["section-story"]
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="mb-6">
                            <span className="text-[#06b6d4] text-sm font-semibold tracking-wider uppercase">
                                Our Journey
                            </span>
                            <h2 className="text-4xl font-bold text-white mt-2">
                                Our{" "}
                                <span className="text-[#06b6d4]">Story</span>
                            </h2>
                            <div className="w-20 h-1 bg-[#06b6d4] mt-4"></div>
                        </div>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            For over 10 years, Smart Kitchen Solutions has been
                            a trusted leader in the foodservice equipment
                            industry, delivering innovative and reliable
                            solutions tailored to the unique needs of hotels,
                            catering services, restaurants, IT cafeterias,
                            institutional kitchens, and coffee shops.
                        </p>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            We specialize in high-performance equipment designed
                            to enhance operational efficiency and save time and
                            cost - whether it's for heating, cooling, or
                            holding.
                        </p>
                        <p className="text-gray-300 leading-relaxed">
                            Backed by a dedicated design team and strong R&D, we
                            provide customized solutions that combine
                            functionality with visual appeal. Our commitment
                            extends beyond installation, with exceptional
                            after-sales support ensuring long-term satisfaction.
                        </p>
                    </div>
                    <div className="relative">
                        <div 
                            className="bg-[#3b4059] border-2 border-[#06b6d4] h-96 w-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${BGAbout})` }}
                        >
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline Section - Horizontal Scrollable */}
            <section
                id="section-timeline"
                className={`py-10 bg-[#3b4059] transition-all duration-1000 ${
                    isVisible["section-timeline"]
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                }`}
            >
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#06b6d4] text-sm font-semibold tracking-wider uppercase">
                            Our Journey
                        </span>
                        <h2 className="text-4xl font-bold text-white mt-2 mb-4">
                            Growth{" "}
                            <span className="text-[#06b6d4]">Timeline</span>
                        </h2>
                        <div className="w-20 h-1 bg-[#06b6d4] mx-auto"></div>
                    </div>

                    <div className="relative border-l-4 border-[#06b6d4]/50 ml-4 space-y-12">
                        {timeline.map((item, index) => (
                            <div key={index} className="ml-8 relative">
                                {/* Dot */}
                                <div className="absolute -left-[36px] top-2 w-6 h-6 bg-[#06b6d4] rounded-full border-4 border-[#3b4059]"></div>

                                <div className="bg-[#32364a] p-6 rounded-xl shadow-lg hover:border-[#06b6d4] border border-transparent transition-all duration-300">
                                    <span className="text-[#06b6d4] font-semibold">
                                        {item.year}
                                    </span>
                                    <h3 className="text-xl font-bold text-white mt-1">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-300 text-sm mt-2">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section
                id="section-values"
                className={`py-10 bg-[#32364a] transition-all duration-1000 ${
                    isVisible["section-values"]
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#06b6d4] text-sm font-semibold tracking-wider uppercase">
                            Core Principles
                        </span>
                        <h2 className="text-4xl font-bold text-white mt-2 mb-4">
                            Our <span className="text-[#06b6d4]">Values</span>
                        </h2>
                        <div className="w-20 h-1 bg-[#06b6d4] mx-auto"></div>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-[#3b4059] border-2 border-[#06b6d4]/30 p-4 hover:border-[#06b6d4] hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className="flex items-center justify-center text-white mb-2">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-gray-300">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-10 bg-[#3b4059] border-t-2 border-[#06b6d4] text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to Transform Your Kitchen?
                    </h2>
                    <p className="text-xl text-gray-300 mb-10">
                        Join thousands of satisfied customers who have upgraded
                        to smart kitchen solutions.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link
                            to="/products"
                            className="border-2 border-[#06b6d4] text-[#06b6d4] px-10 py-4 font-semibold hover:bg-[#06b6d4] hover:text-white transition-all text-lg"
                        >
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
