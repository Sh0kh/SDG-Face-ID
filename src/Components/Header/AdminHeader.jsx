import React, { useState } from "react";
import { ChevronDown, Bell, User, Settings, Menu } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export default function AdminHeader(props) {
    const navigate = useNavigate();
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="fixed w-full z-30 top-0 px-6 bg-MainColor">
            <div className="Container">
                <div className="flex items-center justify-between">
                    {/* Logo and Navigation */}
                    <div className="flex items-center">
                        <h1 className="text-white text-2xl px-4 font-bold">Logo</h1>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `text-white px-5 py-5 text-sm ${isActive
                                    ? "bg-[#249B71] border-b-4 border-b-[#07885B]"
                                    : "hover:bg-[#249B71] hover:border-b-[#249B71] border-b-4 border-b-MainColor"
                                }`
                            }
                        >
                            Bosh sahifa
                        </NavLink>
                        <NavLink
                            to="/employees"
                            className={({ isActive }) =>
                                `text-white px-5 py-5 text-sm ${isActive
                                    ? "bg-[#249B71] border-b-4 border-b-[#07885B]"
                                    : "hover:bg-[#249B71] hover:border-b-[#249B71] border-b-4 border-b-MainColor"
                                }`
                            }
                        >
                            Xodimlar
                        </NavLink>
                        <NavLink
                            to="/schedules"
                            className={({ isActive }) =>
                                `text-white px-5 py-5 text-sm ${isActive
                                    ? "bg-[#249B71] border-b-4 border-b-[#07885B]"
                                    : "hover:bg-[#249B71] hover:border-b-[#249B71] border-b-4 border-b-MainColor"
                                }`
                            }
                        >
                            Ish jadvallari
                        </NavLink>
                        <NavLink
                            to="/reports"
                            className={({ isActive }) =>
                                `text-white px-5 py-5 text-sm ${isActive
                                    ? "bg-[#249B71] border-b-4 border-b-[#07885B]"
                                    : "hover:bg-[#249B71] hover:border-b-[#249B71] border-b-4 border-b-MainColor"
                                }`
                            }
                        >
                            Hisobotlar
                        </NavLink>
                    </div>

                    {/* Static Dropdown Menus */}
                    <div className="flex items-center ">

                        {/* Qoshimcha Dam olish */}
                        <div
                            className="relative"
                            onMouseEnter={() => setOpenIndex(0)}
                            onMouseLeave={() => setOpenIndex(null)}
                        >
                            <div className="flex items-center gap-2 border-x-[#56BA96] border-x-[1px] hover:bg-[#249B71] p-5 cursor-pointer">
                                <Bell className="w-5 h-5 text-white" />
                                <ChevronDown className="w-4 h-4 text-[#068A5B]" />
                            </div>
                            {openIndex === 0 && (
                                <div className="absolute top-[60px] left-0 w-48 bg-[#249B71] z-50 shadow-lg rounded-b-lg">
                                    <button
                                        onClick={() => navigate("/timeoff")}
                                        className="w-full text-left px-4 py-3 text-sm text-white rounded-b-lg hover:bg-MainColor transition"
                                    >
                                        Qoshimcha Dam olish
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Bildirishnomalar */}
                        <div
                            className="relative"
                            onMouseEnter={() => setOpenIndex(1)}
                            onMouseLeave={() => setOpenIndex(null)}
                        >
                            <div className="flex items-center gap-2 border-x-[#56BA96] border-x-[1px] hover:bg-[#249B71] p-5 cursor-pointer">
                                <Menu className="w-5 h-5 text-white" />
                                <ChevronDown className="w-4 h-4 text-[#068A5B]" />
                            </div>
                            {openIndex === 1 && (
                                <div className="absolute top-[60px] left-0 w-48 bg-[#249B71] z-50 shadow-lg rounded-b-lg">
                                    <NavLink
                                        to="/department">
                                        <button
                                            className="w-full text-left px-4 py-3 text-sm text-white rounded-b-lg hover:bg-MainColor transition"
                                        >
                                            Bolimlar
                                        </button>
                                    </NavLink>
                                </div>
                            )}
                        </div>

                        {/* Sozlamalar */}
                        <div
                            className="relative"
                            onMouseEnter={() => setOpenIndex(2)}
                            onMouseLeave={() => setOpenIndex(null)}
                        >
                            <div className="flex items-center gap-2 border-x-[#56BA96] border-x-[1px] hover:bg-[#249B71] p-5 cursor-pointer">
                                <Settings className="w-5 h-5 text-white" />
                                <ChevronDown className="w-4 h-4 text-[#068A5B]" />
                            </div>
                            {openIndex === 2 && (
                                <div className="absolute top-[60px] right-0 w-48 bg-[#249B71] z-50 shadow-lg rounded-b-lg">
                                    <div className="px-4 py-3 text-white text-sm border-b border-white/20">
                                        Sozlamalar
                                    </div>
                                    <button
                                        onClick={() => alert("Sozlamalar paneli ochildi")}
                                        className="w-full text-left px-4 py-3 text-sm text-white hover:bg-MainColor transition"
                                    >
                                        Sozlash
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Chiqish */}
                        <div
                            className="relative"
                            onMouseEnter={() => setOpenIndex(3)}
                            onMouseLeave={() => setOpenIndex(null)}
                        >
                            <div className="flex items-center gap-2 border-x-[#56BA96] border-x-[1px] hover:bg-[#249B71] p-5 cursor-pointer">
                                <User className="w-5 h-5 text-white" />
                                <ChevronDown className="w-4 h-4 text-[#068A5B]" />
                            </div>
                            {openIndex === 3 && (
                                <div className="absolute top-[60px] right-0 w-48 bg-[#249B71] z-50 shadow-lg rounded-b-lg">
                                    <div className="px-4 py-3 text-white text-sm border-b border-white/20">
                                        Chiqish
                                    </div>
                                    <button
                                        onClick={() => {
                                            localStorage.clear();
                                            navigate("/login");
                                        }}
                                        className="w-full text-left px-4 py-3 text-sm text-white hover:bg-MainColor transition"
                                    >
                                        Chiqish
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Optional children slot */}
                {props.children}
            </div>
        </div>
    );
}
