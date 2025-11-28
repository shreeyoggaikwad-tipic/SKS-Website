import React, { useState } from "react";
import Products from "../utils/Products"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Broucher from "../assets/Broucher.pdf"
import axios from 'axios';
import host from '../utils/host';

const ProductsPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });


  const openProductModal = (productId) => {
    setSelectedProduct(Products[productId - 1]);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const Spec = ({ label, value }) => (
    <div className="flex justify-between items-center">
      <span className="text-gray-400 text-sm uppercase tracking-wide">
        {label}
      </span>
      <span className="text-white font-bold">
        {value}
      </span>
    </div>
  );

  const handleBroucherDownload = async () => {
    if (!formData.name) {
      alert('Please fill in your name');
      return;
    } else if (!/^[A-Za-z\s]{1,100}$/.test(formData.name)) {
      alert('Name must contain only alphabets and spaces, and be at most 100 characters long');
      return;
    } else if (formData.email && !/\S+@\S+\.\S/.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    } else if (!/^[9876]\d{9}$/.test(formData.phone)) {
      alert('Phone number must be 10 digits long and start with 9, 8, 7 or 6.');
      return;
    }

    // 📌 Step 4: API Call
    try {
      const response = await axios.post(`${host}/api/inquiries`, formData);
      if (response.status >= 200 && response.status < 300) {
        setFormData({ name: '', email: '', phone: '' });
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      // Assuming setErrorMessage is defined elsewhere or needs to be added
      // setErrorMessage('Failed to send your message. Please try again later.');
    }

    // 📥 Download File
    const link = document.createElement("a");
    link.href = Broucher;
    link.download = "SmartKitchenSolutions-Brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-[#1a1d2e]">
      <Navbar />
      {/* Hero Section */}
      <section className="relative py-10 bg-[#282b40] border-b-2 border-cyan-500">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#06b6d4] blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#06b6d4] blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">

            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6">
              Explore Our
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Premium Collection
              </span>
            </h1>

            <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive range of smart kitchen solutions designed to transform your cooking space into a modern, efficient masterpiece
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-[#1a1d2e]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
            {Products.map((product) => (
              <div
                key={product.id}
                className="bg-[#282b40] border-2 border-[#3a3f5c] overflow-hidden group hover:border-cyan-500 transition-all duration-300 cursor-pointer flex flex-col"
              >
                <div className="relative overflow-hidden h-48 p-1">
                  <img
                    src={product.image}
                    alt={product.product_name}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-2 left-2 text-4xl transition-transform duration-300">
                    {product.icon}
                  </div>
                </div>

                <div className="p-3 flex flex-col h-full">
                  <h3 className="text-xl font-bold text-white mb-2 uppercase group-hover:text-cyan-400">
                    {product.product_name}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {product.description}
                  </p>

                  <div className="mt-auto">
                    <button onClick={() => openProductModal(product.id)} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 text-xs font-bold uppercase">
                      View Models
                    </button>
                    <button
                      onClick={() => setShowModal(true)}
                      className="mt-2 w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 text-xs font-bold uppercase"
                    >
                      Download Broucher
                    </button>
                  </div>
                </div>
              </div>


            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Modal Popup */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#282b40] border-2 border-cyan-500 max-w-7xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#1f2235] border-b-2 border-cyan-500 p-6 flex justify-between items-center z-10">
              <div>
                <h2 className="text-3xl font-bold text-white uppercase tracking-wide">
                  {selectedProduct.product_name}
                </h2>
                <p className="text-cyan-400 mt-2">{selectedProduct.description}</p>
              </div>
              <button
                onClick={closeModal}
                className="text-cyan-400 hover:text-white hover:bg-cyan-500 p-2 transition-all duration-300 border-2 border-cyan-500"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Features Section */}
            <div className="p-6 bg-[#1f2235] border-b-2 border-[#3a3f5c]">
              <h3 className="text-xl font-bold text-cyan-400 mb-4 uppercase tracking-wider">KEY FEATURES</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-[#2b2e42] text-gray-300 text-xs px-3 py-1 rounded-full border border-cyan-500/30 hover:border-cyan-500 transition"
                  >
                    {feature}
                  </div>
                ))}
              </div>

            </div>

            {/* Models Grid */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">
                AVAILABLE <span className="text-cyan-400">MODELS</span>
              </h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedProduct.models.map((model, index) => (
                  <div
                    key={index}
                    className="bg-[#1f2235] border-2 border-[#3a3f5c] p-6 hover:border-cyan-500 transition-all duration-300 group"
                  >
                    {/* Model Image */}
                    {model.image && (
                      <img
                        src={model.image}
                        alt={model.model}
                        className="w-full h-48 object-contain mb-4 rounded-md bg-white/5 p-2"
                      />
                    )}

                    {/* Model Header */}
                    <div className="border-b border-cyan-500/30 pb-4 mb-4">
                      <h4 className="text-xl font-bold text-cyan-400 mb-2 uppercase tracking-wide group-hover:text-cyan-300">
                        {model.model}
                      </h4>
                      {model.description && (
                        <p className="text-gray-400 text-sm">{model.description}</p>
                      )}
                    </div>

                    {/* Conditional Model Specs */}
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
                          <Spec
                            label="Dimensions"
                            value={`${model.dimensions.L} × ${model.dimensions.W} × ${model.dimensions.H} mm`}
                          />
                          <Spec label="Power" value={model.power} />
                          <Spec label="Voltage" value={model.voltage} />
                          <Spec label="Cut-Out Size" value={`${model.cut_out_size_AXB} mm`} />
                          <Spec
                            label="Controller"
                            value={`${model.controller_size_AXBxC} mm`}
                          />
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

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#1f2235] p-6 w-full max-w-md rounded-lg shadow-lg border border-cyan-500">

            <h2 className="text-xl font-bold text-white mb-4">Enter Your Details</h2>

            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full mb-3 px-3 py-2 bg-[#282b40] border border-gray-600 text-white"
            />

            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full mb-3 px-3 py-2 bg-[#282b40] border border-gray-600 text-white"
            />

            <input
              type="number"
              placeholder="Your Mobile Number"
              value={formData.phone} // Changed from formData.mobile to formData.phone
              maxLength={10}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full mb-3 px-3 py-2 bg-[#282b40] border border-gray-600 text-white"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-red-500 text-white hover:bg-red-600"
              >
                Cancel
              </button>

              <button
                onClick={handleBroucherDownload}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
              >
                Submit & Download
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductsPage;