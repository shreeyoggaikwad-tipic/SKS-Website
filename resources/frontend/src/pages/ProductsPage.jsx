import React, { useState, useEffect } from "react";
import Products from "../utils/Products"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BrochureDownloadModal from "../components/BrochureDownloadModal";

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
      {/* <section className="relative py-10 bg-white border-b-2 border-cyan-500">
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
      </section> */}

      <section className="py-20 bg-gradient-to-b from-white via-white/0 to-blue-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
            {Products.map((product) => (
              <div key={product.id} className="bg-white border-2 overflow-hidden group border-cyan-500 transition-all duration-300 cursor-pointer flex flex-col">
                <div className="relative overflow-hidden h-64 p-1">
                  <img src={product.image} alt={product.product_name} className="w-full h-full object-contain" />
                  <div className="absolute top-2 left-2 text-4xl transition-transform duration-300">{product.icon}</div>
                </div>
                <div className="p-3 text-center flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-blue-900 mb-2 uppercase group-hover:text-cyan-600">{product.product_name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{product.description}</p>
                  <div className="mt-auto pt-4">
                    <button onClick={() => openProductModal(product.id)} className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 text-xs font-bold uppercase hover:from-cyan-600 hover:to-blue-700">View Models</button>
                    <button onClick={() => setShowModal(true)} className="mt-2 w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 text-xs font-bold uppercase  hover:from-cyan-600 hover:to-blue-700">Download Brochure</button>
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
            <div className="sticky top-0 bg-white border-b-2 border-cyan-500 p-6 flex justify-between items-center z-10">
              <div>
                <h2 className="text-3xl font-bold text-blue-900 uppercase tracking-wide">{selectedProduct.product_name}</h2>
                <p className="text-cyan-600 mt-2">{selectedProduct.description}</p>
              </div>
              <button onClick={closeModal} className="text-cyan-600 hover:text-white hover:bg-cyan-500 p-2 transition-all duration-300 border-2 border-cyan-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            {/* <div className="p-6 bg-blue-50 border-b-2 border-cyan-200">
              <h3 className="text-xl font-bold text-cyan-600 mb-4 uppercase tracking-wider">KEY FEATURES</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.features.map((feature, index) => (
                  <div key={index} className="bg-white text-gray-600 text-xs px-3 py-1 rounded-full border border-cyan-500/30 hover:border-cyan-500 transition">{feature}</div>
                ))}
              </div>
            </div> */}
            <div className="p-6 bg-gradient-to-b from-white via-white/0 to-blue-950">
              <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">AVAILABLE <span>MODELS</span></h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedProduct.models.map((model, index) => (
                  <div key={index} className="bg-white border-4 p-6 border-cyan-500 transition-all duration-300 group">
                    {model.image && (<img src={model.image} alt={model.model} className="w-full h-48 object-contain mb-4 rounded-md bg-white p-2" />)}
                    <div className="border-b text-center border-cyan-500/30 pb-4 mb-4">
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