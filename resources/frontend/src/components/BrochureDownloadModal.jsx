import React, { useState, useEffect } from "react";
import Broucher from "../assets/Broucher.pdf";
import axios from 'axios';
import host from '../utils/host';
import { User, Phone, Mail, Download, X, CheckCircle } from "lucide-react";

const BrochureDownloadModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [timer, setTimer] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(formData.phone)) {
            alert("Please enter a valid 10-digit mobile number first.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('/api/send-otp', { phone: formData.phone });
            if (response.status === 200) {
                setOtpSent(true);
                setTimer(60);
                alert("OTP Sent to your WhatsApp number!");
            }
        } catch (error) {
            console.error("Error sending OTP", error);
            alert("Failed to send OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (!otp || otp.length !== 6) {
            alert("Please enter a valid 6-digit OTP");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('/api/verify-otp', { phone: formData.phone, otp });
            if (response.status === 200) {
                setIsVerified(true);
                alert("Mobile Number Verified Successfully!");
            }
        } catch (error) {
            console.error("Error verifying OTP", error);
            alert("Invalid OTP or expired. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "phone") {
            const numericValue = value.replace(/\D/g, "").slice(0, 10);
            setFormData({ ...formData, [name]: numericValue });
            if (isVerified) {
                setIsVerified(false);
                setOtpSent(false);
                setOtp("");
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isVerified) {
            alert("Please verify your mobile number first.");
            return;
        }

        try {
            await axios.post(`${host}/api/inquiries`, formData);
            console.log("Inquiry submitted successfully!");
        } catch (error) {
            console.error("Error submitting contact form:", error);
        }

        const link = document.createElement("a");
        link.href = Broucher;
        link.download = "SmartKitchenSolutions-Brochure.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-none shadow-2xl w-full max-w-md relative border border-cyan-100 animate-fade-in-up">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors">
                    <X size={24} />
                </button>
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-blue-900 mb-2 uppercase tracking-wide">Download Brochure</h2>
                    <p className="text-gray-600 mb-6 text-sm">Please verify your details to download our catalogue.</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 mb-1 uppercase tracking-wider">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 text-cyan-500 w-5 h-5" />
                                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-cyan-200 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors" placeholder="Enter your name" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 mb-1 uppercase tracking-wider">Mobile Number</label>
                            <div className="relative flex gap-2">
                                <div className="relative flex-grow">
                                    <Phone className="absolute left-3 top-3 text-cyan-500 w-5 h-5" />
                                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className={`w-full pl-10 pr-4 py-2 border ${isVerified ? "border-green-500 bg-green-50" : "border-cyan-200"} focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors`} placeholder="10-digit mobile number" disabled={isVerified} />
                                    {isVerified && <CheckCircle className="absolute right-3 top-3 text-green-500 w-5 h-5" />}
                                </div>
                                {!isVerified && (
                                    <button type="button" onClick={handleSendOtp} disabled={formData.phone.length < 10 || loading || (otpSent && timer > 0)} className="bg-cyan-600 text-white px-3 py-2 text-xs uppercase font-bold tracking-wider hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap min-w-[80px]">
                                        {loading ? "Sending..." : otpSent && timer > 0 ? `Retry (${timer})` : otpSent ? "Resend" : "Send OTP"}
                                    </button>
                                )}
                            </div>
                        </div>
                        {otpSent && !isVerified && (
                            <div className="animate-fade-in">
                                <label className="block text-sm font-semibold text-blue-900 mb-1 uppercase tracking-wider">Verification Code</label>
                                <div className="relative flex gap-2">
                                    <input type="text" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))} className="flex-grow px-4 py-2 border border-cyan-200 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors text-center letter-spacing-2 font-bold text-lg" placeholder="------" maxLength={6} />
                                    <button type="button" onClick={handleVerifyOtp} disabled={otp.length < 6 || loading} className="bg-blue-900 text-white px-4 py-2 text-xs uppercase font-bold tracking-wider hover:bg-blue-800 disabled:opacity-50 transition-colors">
                                        {loading ? "..." : "Verify"}
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Enter the 6-digit code sent to your WhatsApp.</p>
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-semibold text-blue-900 mb-1 uppercase tracking-wider">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 text-cyan-500 w-5 h-5" />
                                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-cyan-200 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors" placeholder="Enter your email (optional)" />
                            </div>
                        </div>
                        <button type="submit" disabled={!isVerified} className="w-full bg-gradient-to-r from-blue-900 to-blue-800 text-white py-3 uppercase tracking-wider font-bold hover:from-blue-800 hover:to-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg mt-4 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed group">
                            <span className="flex items-center justify-center gap-2">
                                {isVerified ? (<>Download Brochure <Download className="w-5 h-5 group-hover:animate-bounce" /></>) : ("Verify Mobile to Download")}
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BrochureDownloadModal;
