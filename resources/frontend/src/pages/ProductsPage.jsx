import React, { useState, useEffect } from "react";
import Products from "../utils/Products"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Broucher from "../assets/Broucher.pdf"
import axios from 'axios';
import host from '../utils/host';
import { User, Phone, Mail, Download, X, CheckCircle } from "lucide-react";

// Brochure Modal Component
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

const ProductsPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openProductModal = (productId) => {
    setSelectedProduct(Products[productId - 1]);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const Spec = ({ label, value }) => (
    <div className="flex justify-between items-center">
      <span className="text-gray-600 text-sm uppercase tracking-wide">{label}</span>
      <span className="text-blue-900 font-bold">{value}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="relative py-10 bg-white border-b-2 border-cyan-500">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold text-blue-900 mb-6">Explore Our <span className="block">Premium Collection</span></h1>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed">Discover our comprehensive range of smart kitchen solutions designed to transform your cooking space into a modern, efficient masterpiece</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-blue-900 to-blue-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
            {Products.map((product) => (
              <div key={product.id} className="bg-white border-4 overflow-hidden group border-cyan-200 transition-all duration-300 cursor-pointer flex flex-col">
                <div className="relative overflow-hidden h-64 p-1">
                  <img src={product.image} alt={product.product_name} className="w-full h-full object-contain" />
                  <div className="absolute top-2 left-2 text-4xl transition-transform duration-300">{product.icon}</div>
                </div>
                <div className="p-3 text-center flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-blue-900 mb-2 uppercase group-hover:text-cyan-600">{product.product_name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{product.description}</p>
                  <div className="mt-auto pt-4">
                    <button onClick={() => openProductModal(product.id)} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 text-xs font-bold uppercase hover:from-cyan-600 hover:to-blue-700">View Models</button>
                    <button onClick={() => setShowModal(true)} className="mt-2 w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 text-xs font-bold uppercase">Download Brochure</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border-2 border-cyan-500 max-w-7xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-blue-50 border-b-2 border-cyan-500 p-6 flex justify-between items-center z-10">
              <div>
                <h2 className="text-3xl font-bold text-blue-900 uppercase tracking-wide">{selectedProduct.product_name}</h2>
                <p className="text-cyan-600 mt-2">{selectedProduct.description}</p>
              </div>
              <button onClick={closeModal} className="text-cyan-600 hover:text-white hover:bg-cyan-500 p-2 transition-all duration-300 border-2 border-cyan-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6 bg-blue-50 border-b-2 border-cyan-200">
              <h3 className="text-xl font-bold text-cyan-600 mb-4 uppercase tracking-wider">KEY FEATURES</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.features.map((feature, index) => (
                  <div key={index} className="bg-white text-gray-600 text-xs px-3 py-1 rounded-full border border-cyan-500/30 hover:border-cyan-500 transition">{feature}</div>
                ))}
              </div>
            </div>
            <div className="p-6 bg-gradient-to-b from-blue-900 to-blue-200">
              <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">AVAILABLE <span>MODELS</span></h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedProduct.models.map((model, index) => (
                  <div key={index} className="bg-white border-4 p-6 border-cyan-500 transition-all duration-300 group">
                    {model.image && (<img src={model.image} alt={model.model} className="w-full h-48 object-contain mb-4 rounded-md bg-white p-2" />)}
                    <div className="border-b border-cyan-500/30 pb-4 mb-4">
                      <h4 className="text-xl font-bold text-cyan-600 mb-2 uppercase tracking-wide group-hover:text-cyan-500">{model.model}</h4>
                      {model.description && (<p className="text-gray-600 text-sm">{model.description}</p>)}
                    </div>
                    <div className="space-y-3">
                      {selectedProduct.id === 4 || selectedProduct.id === 5 || selectedProduct.id === 6 ? (
                        <>
                          <Spec label="Diameter" value={`${model.diameter_mm} mm`} />
                          <Spec label="Height" value={`${model.height_mm} mm`} />
                          <Spec label="Voltage" value={model.voltage} />
                          <Spec label="Power" value={model.power} />
                          <Spec label="Colour Choices" value={model.colour_choices} />
                        </>
                      ) : (
                        <>
                          <Spec label="Dimensions" value={`${model.dimensions.L} × ${model.dimensions.W} × ${model.dimensions.H} mm`} />
                          <Spec label="Power" value={model.power} />
                          <Spec label="Voltage" value={model.voltage} />
                          <Spec label="Cut-Out Size" value={`${model.cut_out_size_AXB} mm`} />
                          <Spec label="Controller" value={`${model.controller_size_AXBxC} mm`} />
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <BrochureDownloadModal isOpen={showModal} onClose={() => setShowModal(false)} />

    </div>
  );
};

export default ProductsPage;