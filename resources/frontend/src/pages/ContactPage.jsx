import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import host from '../utils/host';

// Contact Form Component
function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        company_id: 1,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!formData.name) {
            alert('Please fill in your name');
            return;
        } else if (!/^[A-Za-z\s]{1,100}$/.test(formData.name)) {
            alert('Name must contain only alphabets and spaces, and be at most 100 characters long');
            return;
        } else if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            alert('Please enter a valid email address');
            return;
        } else if (!/^[9876]\d{9}$/.test(formData.phone)) {
            alert('Phone number must be 10 digits long and start with 9, 8, 7 or 6.');
            return;
        } else if (!/^[\s\S]{2,500}$/.test(formData.message)) {
            alert('Message must be between 10 and 500 characters');
            return;
        }

        setIsSubmitting(true);
        setErrorMessage('');

        try {
            const response = await axios.post(`${host}/api/inquiries1`, formData);
            if (response.status >= 200 && response.status < 300) {
                setSubmitted(true);
                setFormData({ name: '', email: '', phone: '', message: '' });
                setTimeout(() => {
                    setSubmitted(false);
                }, 3000);
            }
        } catch (error) {
            console.error("Error submitting contact form:", error);
            setErrorMessage('Failed to send your message. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="bg-[#1f2235] border-2 border-[#06b6d4] p-12 text-center animate-fade-in">
                <div className="w-20 h-20 bg-[#06b6d4] flex items-center justify-center mx-auto mb-6">
                    <span className="text-white text-4xl font-bold">✓</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Thank You!</h3>
                <p className="text-gray-300 text-lg">Your message has been received. We'll get back to you soon!</p>
            </div>
        );
    }

    return (
        <div className="bg-[#1f2235] border-2 border-[#06b6d4]/30 p-10 animate-fade-in">
            <div className="mb-8">
                <h3 className="text-3xl font-bold text-white mb-3">Send Us a Message</h3>
                <p className="text-gray-300">We'd love to hear from you! Fill out the form below and we'll respond as quickly as possible.</p>
            </div>

            <div className="space-y-6">
                {errorMessage && (
                    <div className="bg-red-500/10 border border-red-500 p-4 text-red-400">
                        {errorMessage}
                    </div>
                )}

                <InputField
                    label="Full Name *"
                    name="name"
                    value={formData.name}
                    onChange={(e) => {
                        const onlyAlphabets = e.target.value.replace(/[^A-Za-z\s]/g, "").slice(0, 100);
                        setFormData({ ...formData, name: onlyAlphabets });
                    }}
                    placeholder="Enter your full name"
                    required
                />
                <InputField
                    label="Email Address *"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    type="email"
                    required
                />
                <InputField
                    label="Phone Number *"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => {
                        const onlyDigits = e.target.value.replace(/\D/g, "");
                        setFormData({ ...formData, phone: onlyDigits.slice(0, 10) });
                    }}
                    placeholder="Enter your phone number"
                    type="tel"
                    required
                />

                <div>
                    <label className="block text-sm font-semibold text-[#06b6d4] mb-2 uppercase tracking-wider">Message *</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full px-4 py-3 bg-[#282b40] border border-[#06b6d4]/30 text-white placeholder-gray-500 focus:border-[#06b6d4] focus:outline-none transition-all duration-300 resize-none"
                        placeholder="Tell us about your project requirements..."
                    ></textarea>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-[#06b6d4] text-white py-4 font-semibold hover:bg-[#0891b2] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Sending...
                        </div>
                    ) : (
                        'Send Message'
                    )}
                </button>
            </div>
        </div>
    );
}

function InputField({ label, name, value, onChange, placeholder, type = 'text' }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-[#06b6d4] mb-2 uppercase tracking-wider">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required
                className="w-full px-4 py-3 bg-[#282b40] border border-[#06b6d4]/30 text-white placeholder-gray-500 focus:border-[#06b6d4] focus:outline-none transition-all duration-300"
                placeholder={placeholder}
            />
        </div>
    );
}

function ContactPage() {
    return (
        <div className="min-h-screen bg-[#282b40]">
            <Navbar />

            {/* Hero Section */}
            <section className="relative py-10 bg-[#282b40] border-b-2 border-cyan-500">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-[#06b6d4] blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#06b6d4] blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
                        Contact <span className="text-[#06b6d4]">Us</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Have questions about our smart buffet solutions? We're here to help you transform your cooking space.
                    </p>
                </div>
            </section>

            {/* Contact Form and Info Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                            <ContactForm />
                        </div>
                        <div className="space-y-8">
                            <MapAndBusinessHours />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

function ContactInfoCard({ icon, title, info, description }) {
    return (
        <div className="bg-[#282b40] border border-[#06b6d4]/30 p-8 hover:border-[#06b6d4] transition-all duration-300 text-center">
            <div className="text-5xl mb-4">{icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-[#06b6d4] font-semibold mb-2">{info}</p>
            <p className="text-gray-400 text-sm">{description}</p>
        </div>
    );
}

function MapAndBusinessHours() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const userRes = await axios.get(`${host}/api/users/1`);
                const user = userRes.data.data;
                setUser(user);
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        }
        fetchStats();
    }, []);

    return (
        <>
            <div className="bg-[#1f2235] border-2 border-[#06b6d4]/30 overflow-hidden animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <div className="p-6 border-b border-[#06b6d4]/30">
                    <h3 className="text-2xl font-bold text-white mt-2">Our Location</h3>
                </div>
                <div className="h-96">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d945.7190964999253!2d73.9456518!3d18.5344874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c17e4fc0dd3f%3A0x377b6a6b7ae2da81!2sSMART%20KITCHEN%20SOLUTIONS!5e0!3m2!1sen!2sin!4v1763800182651!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Office Location"
                    ></iframe>
                </div>
            </div>

            <div className="bg-[#1f2235] border-2 border-[#06b6d4]/30 p-8 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mt-2">Business Hours</h3>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-[#06b6d4]/20">
                        <span className="text-gray-300 font-medium">Monday - Saturday</span>
                        <span className="text-[#06b6d4] font-bold">{user?.business_hours || '9:00 AM - 8:00 PM'}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-[#06b6d4]/20">
                        <span className="text-gray-300 font-medium">Sunday</span>
                        <span className="text-red-400 font-bold">Closed</span>
                    </div>
                </div>
                {/* <div className="mt-6 p-4 bg-[#282b40] border-l-4 border-[#06b6d4]">
                    <p className="text-gray-300 text-sm">
                        <span className="text-[#06b6d4] font-bold">24/7 Support:</span> Available round the clock for emergency assistance and technical support.
                    </p>
                </div> */}
            </div>
        </>
    );
}

export default ContactPage;