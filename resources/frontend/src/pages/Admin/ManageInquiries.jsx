import React, { useState, useEffect } from "react";
import { Loader2, Trash2, Filter } from "lucide-react";
import axios from "axios";
import host from "../../utils/host";
import AdminNav from "../../components/AdminNav";

function ManageInquiries() {
    const [inquiries, setInquiries] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState("ranveer");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios
            .get(`${host}/api/inquiries`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            })
            .then((res) => {
                const sortedData = res.data.data.sort((a, b) =>
                    a.request_served === b.request_served ? 0 : a.request_served ? 1 : -1
                );
                setInquiries(sortedData);
            })
            .catch((err) => {
                console.error("Error fetching inquiries:", err.response?.data || err);
            })
            .finally(() => setLoading(false));
    }, []);

    const toggleRequestServed = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.patch(
                `${host}/api/inquiries/${id}/toggle-served`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setInquiries((prev) => {
                const updated = prev.map((inq) =>
                    inq.id === id ? { ...inq, request_served: res.data.request_served } : inq
                );
                return updated.sort((a, b) =>
                    a.request_served === b.request_served ? 0 : a.request_served ? 1 : -1
                );
            });
        } catch (err) {
            console.error("Failed to toggle:", err);
        }
    };

    const deleteInquiry = async (id) => {
        if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${host}/api/inquiries/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setInquiries((prev) => prev.filter((inq) => inq.id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete inquiry. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-blue-50">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent"></div>
                    <p className="text-cyan-700 font-medium">Loading inquiries...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 blur-3xl animate-pulse"></div>
                <div
                    className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-3xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                ></div>
            </div>

            <div className="relative">
                {/* <nav className="bg-slate-900/50 backdrop-blur-xl border-b border-white/10 px-6 py-4">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">Smart Kitchen Solutions</h2>
                        <span className="text-slate-300 text-sm">Admin Dashboard</span>
                    </div>
                </nav> */}

                <AdminNav />

                <div className="flex flex-col justify-center items-center px-4 py-12">
                    <section className="w-full max-w-7xl mb-12 animate-fade-in">
                        <div className="text-center">
                            <span className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-none text-sm font-semibold border border-cyan-500/20">
                                CLIENT MANAGEMENT
                            </span>
                            <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-4">
                                Inquiry{" "}
                                <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                                    Dashboard
                                </span>
                            </h1>
                            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                                Track and manage all customer inquiries across your business units
                            </p>
                        </div>
                    </section>

                    <div className="w-full max-w-7xl mb-20 animate-fade-in-up">
                        <div className="bg-white rounded-none shadow-2xl overflow-hidden border border-cyan-100">
                            {inquiries.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full">
                                        <thead className="bg-blue-50 border-b border-cyan-100">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">
                                                    Sr. No.
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">
                                                    Name
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">
                                                    Email
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">
                                                    Phone
                                                </th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">
                                                    Message
                                                </th>
                                                <th className="px-6 py-4 text-center text-xs font-semibold text-blue-900 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-4 text-center text-xs font-semibold text-blue-900 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {inquiries.map((inq, index) => (
                                                <tr key={inq.id} className="hover:bg-blue-50 transition-colors duration-200">
                                                    <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                                                    <td className="px-6 py-4 text-gray-800 text-sm">{inq.name}</td>
                                                    <td className="px-6 py-4 text-gray-600 text-sm">{inq.email || "N/A"}</td>
                                                    <td className="px-6 py-4 text-gray-600 text-sm">{inq.phone}</td>
                                                    <td className="px-6 py-4 text-gray-600 text-sm max-w-xs truncate">
                                                        {inq.message}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <div className="flex items-center justify-center">
                                                            <button
                                                                onClick={() => toggleRequestServed(inq.id)}
                                                                className={`relative inline-flex h-7 w-14 items-center rounded transition-all duration-300 ease-in-out ${inq.request_served
                                                                    ? "bg-cyan-500 hover:bg-cyan-600 shadow-lg shadow-cyan-500/30 rounded-2xl"
                                                                    : "bg-slate-600 hover:bg-slate-500 rounded-2xl"
                                                                    }`}
                                                            >
                                                                <span
                                                                    className={`inline-block h-5 w-5 transform rounded-4xl bg-white shadow-lg transition-transform duration-300 ease-in-out ${inq.request_served ? "translate-x-8" : "translate-x-1"
                                                                        }`}
                                                                />
                                                            </button>
                                                            <span
                                                                className={`ml-3 text-sm font-semibold ${inq.request_served ? "text-cyan-400" : "text-orange-400"
                                                                    }`}
                                                            >
                                                                {inq.request_served ? "Resolved" : "Pending"}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <button
                                                            onClick={() => deleteInquiry(inq.id)}
                                                            className="w-9 h-9 flex items-center justify-center bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-none transition-all duration-200"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="p-12 text-center">
                                    <div className="w-16 h-16 bg-blue-100 flex items-center justify-center mx-auto mb-4 rounded-none">
                                        <Filter className="w-8 h-8 text-blue-500" />
                                    </div>
                                    <p className="text-gray-500 text-lg font-medium">No inquiries found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out;
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out;
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.6; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.05); }
                }
            `}</style>
        </div>
    );
}

export default ManageInquiries;
