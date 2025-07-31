import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import GroupsIcon from "../UI/Icons/Groups";
import Task from "../UI/Icons/Tasks";
import Role from "../UI/Icons/Role";

export default function Sidebar() {
    const [role] = useState("admin");
    const location = useLocation();

    const groupedMenuItems = [
        {
            section: "Asosiy",
            items: [
                {
                    id: 1,
                    title: "Bosh sahifa",
                    path: "/",
                    icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5"
                            viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M3 9.75L12 3l9 6.75M4.5 10.5v9.75h5.25V15h4.5v5.25H19.5V10.5" />
                        </svg>
                    )
                },
            ]
        },
        {
            section: "Sozlamalar",
            items: [
                {
                    id: 1,
                    title: "Guruhlar",
                    path: "/groups",
                    icon: (
                        <GroupsIcon />
                    )
                },
                {
                    id: 2,
                    title: "Vazifalar",
                    path: "/tasks",
                    icon: (
                        <Task size={6} />
                    )
                },
                {
                    id: 2,
                    title: "Lavozimlar",
                    path: "/role",
                    icon: (
                        <Role size={6} />
                    )
                },
            ]
        },

    ];

    return (
        <Card className="h-[95%] w-[280px] fixed top-[15px] left-[15px] z-50 shadow-xl bg-white/30 backdrop-blur-md border border-white/20 px-6 py-6 overflow-y-auto">
            <div className="flex items-center gap-3 mb-8">
                <span className="text-xl font-semibold text-gray-800">SDG Face ID</span>
            </div>

            {/* Меню с разделами */}
            <div className="flex flex-col gap-6">
                {groupedMenuItems.map((group) => (
                    <div key={group.section}>
                        <Typography variant="small" color="gray" className="mb-2 uppercase font-medium text-xs tracking-widest">
                            {group.section}
                        </Typography>
                        <div className="flex flex-col gap-2">
                            {group.items.map((item) => (
                                <NavLink
                                    key={item.id}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 
                                        ${isActive
                                            ? "bg-white/80 text-blue-600 font-semibold shadow-md"
                                            : "text-gray-700 hover:bg-white/40 hover:text-blue-600"}`
                                    }
                                >
                                    <span className="w-6 h-6">{item.icon}</span>
                                    <span className="text-sm">{item.title}</span>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
