import React, { useState } from "react";
import { ChevronDown, Bell, User, Settings, LogOut, Menu } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export default function AdminHeader(props) {
    const navigate = useNavigate();
    const [openIndex, setOpenIndex] = useState(null);

    const modals = [
        {
            title: "Qoshimcha  Dam olish ",
            action: () => navigate("/timeoff"),
            btnText: "Qoshimcha  Dam olish",
            icon: <Bell className="w-5 h-5 text-white" />,

        },
        {
            title: "Bildirishnomalar",
            action: () => alert("Bildirishnomalar ochildi"),
            btnText: "Ko'rish",
            icon: <Menu className="w-5 h-5 text-white" />,

        },
        {
            title: "Sozlamalar",
            action: () => alert("Sozlamalar paneli ochildi"),
            btnText: "Sozlash",
            icon: <Settings className="w-5 h-5 text-white" />,
        },
        {
            title: "Chiqish",
            action: () => {
                localStorage.clear();
                navigate("/login");
            },
            btnText: "Chiqish",
            icon: <User className="w-5 h-5 text-white" />,
        }
    ];

    const renderMenuBlock = (item, index) => (
        <div
            key={index}
            className="relative flex items-center gap-4"
            onMouseEnter={() => setOpenIndex(index)}
            onMouseLeave={() => setOpenIndex(null)}
        >
            <div className="flex items-center gap-2 border-x-[#56BA96] border-x-[1px]  hover:bg-[#249B71] p-5 cursor-pointer">
                {item.icon}
                <ChevronDown className="w-4 h-4 text-[#068A5B]" />
            </div>

            {openIndex === index && (
                <div
                    className={`absolute top-[60px] w-48 bg-[#249B71] z-50 shadow-lg rounded-b-lg ${index === 0 ? "left-0" : "right-0"
                        }`}
                >
                    <div className="px-4 py-3 text-white text-sm border-b border-white/20">
                        {item.title}
                    </div>
                    <button
                        onClick={item.action}
                        className="w-full text-left px-4 py-3 text-sm text-white hover:bg-MainColor transition"
                    >
                        {item.btnText}
                    </button>
                </div>
            )}
            {props.children}
        </div>
    );

    return (
        <div className="fixed w-full z-30 top-0 px-6 bg-MainColor">
            <div className="Container">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <h1 className="text-white text-2xl px-4 font-bold">Logo</h1>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `text-white px-5 py-5 border-b-4 text-sm ${isActive ? "bg-[#249B71]  border-b-[#07885B]" : "hover:bg-[#249B71]"
                                }`
                            }
                        >
                            Bosh sahifa
                        </NavLink>
                        <NavLink
                            to="/employees"
                            className={({ isActive }) =>
                                `text-white px-5 py-5 text-sm ${isActive ? "bg-[#249B71]  border-b-[#07885B]" : "hover:bg-[#249B71]"
                                }`
                            }
                        >
                            Xodimlar
                        </NavLink>
                        <NavLink
                            to="/schedules"
                            className={({ isActive }) =>
                                `text-white px-5 py-5 text-sm ${isActive ? "bg-[#249B71]  border-b-[#07885B]" : "hover:bg-[#249B71]"
                                }`
                            }
                        >
                            Ish jadvallari
                        </NavLink>
                        <NavLink
                            to="/reports"
                            className={({ isActive }) =>
                                `text-white px-5 py-5 text-sm ${isActive ? "bg-[#249B71] border-b-4 border-b-[#07885B]" : "hover:bg-[#249B71]"
                                }`
                            }
                        >
                            Hisobotlar
                        </NavLink>

                    </div>

                    <div className="flex items-center">
                        {modals.map((item, i) => renderMenuBlock(item, i))}
                    </div>
                </div>
            </div>
        </div>
    );
}
