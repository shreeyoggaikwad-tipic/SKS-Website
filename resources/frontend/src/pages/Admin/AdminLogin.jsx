import React, { useState } from 'react';
import axios from "axios";
import { ArrowLeft, Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import host from '../../utils/host'

function AdminLogin() {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
        if (error) setError('');
    };

    const handleSubmit = async () => {
        if (!loginData.email || !loginData.password) {
            setError('Please enter both email and password');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post(`${host}/api/auth/login`, loginData);
            localStorage.setItem("token", response.data.token);
            navigate("/admin/inquiries");
        } catch (err) {
            setError(err?.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white flex items-center justify-center px-4 py-8 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 blur-3xl animate-pulse"></div>
                <div
                    className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-3xl animate-pulse"
                    style={{ animationDelay: '1s' }}
                ></div>
            </div>

            <div className="relative w-full max-w-md">
                {/* Back Button */}
                <button
                    onClick={() => navigate("/")}
                    className="mb-6 flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Back to Home</span>
                </button>

                {/* Login Card */}
                <div className="bg-white/95 backdrop-blur-xl rounded-none shadow-2xl p-10 border border-white/20 animate-fade-in">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Portal</h1>
                        <p className="text-slate-600 font-medium">Smart Kitchen Solutions</p>
                        <div className="mt-4 inline-block px-4 py-1 bg-cyan-50 rounded-none">
                            <span className="text-xs font-semibold text-cyan-700">SECURE ACCESS</span>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-none animate-shake">
                            <div className="flex items-center">
                                <span className="text-red-500 text-xl mr-3">⚠️</span>
                                <span className="text-red-700 text-sm font-medium">{error}</span>
                            </div>
                        </div>
                    )}

                    {/* Login Form */}
                    <div className="space-y-5">
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
                                <input
                                    type="email"
                                    name="email"
                                    value={loginData.email}
                                    onChange={handleChange}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-none focus:bg-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all duration-300 text-slate-900 placeholder:text-slate-400"
                                    placeholder="admin@example.com"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Password
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleChange}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                                    className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-none focus:bg-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all duration-300 text-slate-900 placeholder:text-slate-400"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-4 rounded-none font-semibold hover:from-cyan-600 hover:to-cyan-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-cyan-500/30 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-none animate-spin"></div>
                                    <span>Authenticating...</span>
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" />
                                    <span>Sign In to Dashboard</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-slate-200">
                        <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="font-medium">Secure Admin Access</span>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-8px); }
                    75% { transform: translateX(8px); }
                }
                .animate-fade-in { animation: fade-in 0.6s ease-out; }
                .animate-shake { animation: shake 0.4s ease-in-out; }
            `}</style>
        </div>
    );
}

export default AdminLogin;
