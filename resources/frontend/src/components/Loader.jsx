import React, { useState, useEffect } from 'react';

const EnhancedLoadingScreen = ({ Logo }) => {
    return (
      <>
        <style>
          {`
          @keyframes pulse-glow {
            0%, 100% {
              box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
            }
            50% {
              box-shadow: 0 0 40px rgba(59, 130, 246, 0.8);
            }
          }
          
          @keyframes slide-up {
            0% {
              opacity: 0;
              transform: translateY(40px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes gradient-shift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          
          @keyframes rotate-slow {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          
          @keyframes bounce-dot {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-5px);
            }
          }
          
          @keyframes shimmer-text {
            0% {
              background-position: -100% 0;
            }
            100% {
              background-position: 100% 0;
            }
          }
          
          .gradient-bg {
            background: linear-gradient(135deg, #282b40 0%, #3a3d5c 25%, #4d5178 50%, #606594 75%, #7379b0 100%);
            background-size: 400% 400%;
            animation: gradient-shift 15s ease infinite;
          }
          
          .glass-effect {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .shimmer-text {
            background: linear-gradient(90deg, #fff 0%, #f0f0f0 50%, #fff 100%);
            background-size: 200% 100%;
            animation: shimmer-text 3s ease-in-out infinite;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .loading-spinner {
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-top: 3px solid #fff;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: rotate-slow 1s linear infinite;
          }
          
          .bounce-dot {
            animation: bounce-dot 1.4s infinite ease-in-out both;
          }
          
          .bounce-dot:nth-child(1) { animation-delay: -0.32s; }
          .bounce-dot:nth-child(2) { animation-delay: -0.16s; }
          
          .pulse-glow {
            animation: pulse-glow 2s ease-in-out infinite;
          }
          
          .slide-up {
            animation: slide-up 0.8s ease-out forwards;
          }
          
          .slide-up-delay-1 { animation-delay: 0.2s; opacity: 0; }
          .slide-up-delay-2 { animation-delay: 0.4s; opacity: 0; }
          .slide-up-delay-3 { animation-delay: 0.6s; opacity: 0; }
          
          @media (max-width: 768px) {
            .mobile-title {
              font-size: 2rem;
            }
            .mobile-subtitle {
              font-size: 0.875rem;
            }
            .mobile-logo {
              height: 5rem;
            }
          }
          
          @media (max-width: 480px) {
            .mobile-title {
              font-size: 1.5rem;
            }
            .mobile-subtitle {
              font-size: 0.75rem;
            }
            .mobile-logo {
              height: 4rem;
            }
          }
        `}
        </style>

        <div className="fixed inset-0 gradient-bg flex flex-col items-center justify-center z-50 px-4">
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20"></div>
          
          {/* Floating geometric elements */}
          <div className="absolute top-20 left-20 w-16 h-16 border-2 border-white/20 rounded-lg rotate-45 animate-spin-slow"></div>
          <div className="absolute top-40 right-32 w-8 h-8 border border-white/30 rounded-full bounce-dot"></div>
          <div className="absolute bottom-32 left-32 w-12 h-12 border-2 border-white/25 rounded-lg pulse-glow"></div>
          <div className="absolute bottom-20 right-20 w-6 h-6 bg-white/20 rounded-full bounce-dot" style={{ animationDelay: '0.5s' }}></div>
          
          {/* Main loading container */}
          <div className="relative z-10 text-center max-w-lg mx-auto">
            {/* Logo container with glass effect */}
            <div className="slide-up mb-8">
              <div className="glass-effect rounded-2xl p-6 inline-block pulse-glow">
                <img
                  src={Logo}
                  alt="Smart Kitchen Solutions"
                  className="h-20 sm:h-24 md:h-32 mobile-logo w-auto mx-auto"
                />
              </div>
            </div>
            
            {/* Company name */}
            <div className="slide-up slide-up-delay-1 mb-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl mobile-title font-bold text-white mb-2">
                Smart Kitchen
              </h1>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white/90 shimmer-text">
                Solutions
              </h2>
            </div>
            
            {/* Tagline */}
            <div className="slide-up slide-up-delay-2 mb-8">
              <p className="text-base sm:text-lg md:text-xl text-white/80 font-light tracking-wide">
                Innovating Culinary Excellence
              </p>
            </div>
            
            {/* Loading indicator */}
            <div className="slide-up slide-up-delay-3">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-3 h-3 bg-white rounded-full bounce-dot"></div>
                <div className="w-3 h-3 bg-white rounded-full bounce-dot"></div>
                <div className="w-3 h-3 bg-white rounded-full bounce-dot"></div>
              </div>
            </div>
          </div>
          
          {/* Bottom gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent"></div>
          
          {/* Side decorative lines */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 w-px h-32 bg-white/20"></div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 w-px h-32 bg-white/20"></div>
        </div>
      </>
    );
  }

export default EnhancedLoadingScreen;