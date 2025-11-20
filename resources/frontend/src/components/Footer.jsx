import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import host from "../utils/host";
import axios from 'axios';
import logo from "../assets/logo.jpg"

function Footer() {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch user (assuming 1st user = admin)
                const userRes = await axios.get(`${host}/api/users/1`);
                const userData = userRes.data.data;

                setUser([
                    { 
                        number: userData.email || "info@smartkitchenpro.com", 
                        label: <Mail className="w-4 h-4" />, 
                        a: `mailto:${userData.email || "info@smartkitchenpro.com"}` 
                    },
                    { 
                        number: userData.number || "+91 98765 43210", 
                        label: <Phone className="w-4 h-4" />, 
                        a: `tel:+91${userData.number || "9876543210"}` 
                    },
                    { 
                        number: userData.location || "123 Design Avenue, Tech Park, Smart City", 
                        label: <MapPin className="w-4 h-4" />, 
                        a: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(userData.location || "Tech Park")}` 
                    },
                ]);
            } catch (error) {
                console.error("Error fetching stats:", error);
                // Set default values on error
                setUser([
                    { 
                        number: "info@smartkitchenpro.com", 
                        label: <Mail className="w-4 h-4" />, 
                        a: "mailto:info@smartkitchenpro.com" 
                    },
                    { 
                        number: "+91 98765 43210", 
                        label: <Phone className="w-4 h-4" />, 
                        a: "tel:+919876543210" 
                    },
                    { 
                        number: "123 Design Avenue, Tech Park, Smart City", 
                        label: <MapPin className="w-4 h-4" />, 
                        a: "https://www.google.com/maps" 
                    },
                ]);
            }
        };
        fetchStats();
    }, []);

    return (
        <footer className="bg-[#1a1d2e] text-white border-t-2 border-[#282b40]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="flex flex-col gap-2 items-left mb-4">
                            <div className="w-20">
                                <img src={logo} alt="" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold uppercase tracking-wider">Smart Kitchen Solutions</h4>
                                <p className="text-xs text-cyan-400 uppercase tracking-wider">Innovation in Design</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Transforming kitchens with cutting-edge technology, premium materials, and innovative design solutions for modern living.
                        </p>
                        
                        {/* Social Media */}
                        <div className="flex space-x-3 mt-6">
                            <a 
                                href="#" 
                                className="w-10 h-10 border border-[#3a3f5c] flex items-center justify-center hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300 group"
                            >
                                <Facebook className="w-4 h-4 text-gray-400 group-hover:text-cyan-400" />
                            </a>
                            <a 
                                href="#" 
                                className="w-10 h-10 border border-[#3a3f5c] flex items-center justify-center hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300 group"
                            >
                                <Twitter className="w-4 h-4 text-gray-400 group-hover:text-cyan-400" />
                            </a>
                            <a 
                                href="#" 
                                className="w-10 h-10 border border-[#3a3f5c] flex items-center justify-center hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300 group"
                            >
                                <Instagram className="w-4 h-4 text-gray-400 group-hover:text-cyan-400" />
                            </a>
                            <a 
                                href="#" 
                                className="w-10 h-10 border border-[#3a3f5c] flex items-center justify-center hover:border-cyan-500 hover:bg-cyan-500/10 transition-all duration-300 group"
                            >
                                <Linkedin className="w-4 h-4 text-gray-400 group-hover:text-cyan-400" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h5 className="font-bold mb-6 uppercase tracking-wider text-sm border-b border-[#3a3f5c] pb-3">Quick Links</h5>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li>
                                <Link to="/" className="hover:text-cyan-400 transition-colors duration-300 flex items-center space-x-2 group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 transition-all duration-300"></span>
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-cyan-400 transition-colors duration-300 flex items-center space-x-2 group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 transition-all duration-300"></span>
                                    <span>About Us</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="hover:text-cyan-400 transition-colors duration-300 flex items-center space-x-2 group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 transition-all duration-300"></span>
                                    <span>Products</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-cyan-400 transition-colors duration-300 flex items-center space-x-2 group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 transition-all duration-300"></span>
                                    <span>Contact</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h5 className="font-bold mb-6 uppercase tracking-wider text-sm border-b border-[#3a3f5c] pb-3">Our Services</h5>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li className="hover:text-cyan-400 transition-colors cursor-pointer">Kitchen Design</li>
                            <li className="hover:text-cyan-400 transition-colors cursor-pointer">Modular Solutions</li>
                            <li className="hover:text-cyan-400 transition-colors cursor-pointer">Smart Appliances</li>
                            <li className="hover:text-cyan-400 transition-colors cursor-pointer">Installation Services</li>
                            <li className="hover:text-cyan-400 transition-colors cursor-pointer">Maintenance Support</li>
                            <li className="hover:text-cyan-400 transition-colors cursor-pointer">Custom Solutions</li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h5 className="font-bold mb-6 uppercase tracking-wider text-sm border-b border-[#3a3f5c] pb-3">Contact Info</h5>
                        <div className="space-y-4 text-gray-400 text-sm">
                            {user.map((info, index) => (
                                <a 
                                    key={index} 
                                    href={info.a}
                                    className="flex items-start space-x-3 hover:text-cyan-400 transition-colors duration-300 group"
                                >
                                    <span className="text-cyan-400 mt-1 group-hover:scale-110 transition-transform">
                                        {info.label}
                                    </span>
                                    <span className="break-all">{info.number}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-[#282b40] py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm">
                            &copy; 2025 <span className="text-cyan-400 font-semibold">Smart Kitchen Solutions</span>. All rights reserved.
                        </p>
                        <div className="flex space-x-6 text-sm text-gray-400">
                            <Link to="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link>
                            <span>|</span>
                            <Link to="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link>
                            <span>|</span>
                            <Link to="/sitemap" className="hover:text-cyan-400 transition-colors">Sitemap</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;