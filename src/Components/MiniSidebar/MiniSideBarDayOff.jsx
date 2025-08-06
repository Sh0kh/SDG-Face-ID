import { useState } from "react";
import { FiClock, FiCheckCircle, FiXCircle, FiTrash2, FiPlus } from "react-icons/fi";


export default function MiniSideBar() {

    const [activeTab, setActiveTab] = useState(0);


    const tabs = [
        { label: "Kutilmoqda", icon: <FiClock size={18} /> },
        { label: "Qabul qilingan", icon: <FiCheckCircle size={18} /> },
        { label: "Rad etilgan", icon: <FiXCircle size={18} /> },
        { label: "O‘chirilgan", icon: <FiTrash2 size={18} /> },
    ];

    return (
        <>
            <div className="w-[320px] bg-white rounded-lg shadow-sm">
                <div className="px-6 py-4 text-[17px] font-normal text-[#424242] border-b border-[#ededeb]">
                    Qo‘shimcha dam olish ro‘yxati
                </div>
                <ul>
                    {tabs?.map((tab, idx) => (
                        <li
                            key={tab.label}
                            className={`flex items-center gap-3 px-6 py-3 cursor-pointer border-l-4 ${activeTab === idx
                                ? "bg-[#f7f7e8] border-[#43b649]"
                                : "bg-white border-transparent hover:bg-[#fafafa]"
                                }`}
                            onClick={() => setActiveTab(idx)}
                        >
                            <span
                                className={`rounded-full p-1 ${activeTab === idx ? "text-[#43b649]" : "text-[#bdbdbd]"
                                    }`}
                            >
                                {tab.icon}
                            </span>
                            <span
                                className={`text-[15px] ${activeTab === idx ? "text-[#424242]" : "text-[#757575]"
                                    }`}
                            >
                                {tab.label}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}