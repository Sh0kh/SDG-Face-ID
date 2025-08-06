import { useState } from "react";
import { FiClock, FiCheckCircle, FiXCircle, FiTrash2, FiPlus } from "react-icons/fi";


export default function MiniSideBarCrud() {

    const [activeTab, setActiveTab] = useState(0);


    const tabs = [
        { label: "Bolimlar", icon: <FiClock size={18} /> },
        { label: "Lavozimlar", icon: <FiCheckCircle size={18} /> },
        { label: "Rad etilgan", icon: <FiXCircle size={18} /> },
        { label: "O‘chirilgan", icon: <FiTrash2 size={18} /> },
    ];

    return (
        <>
            <div className="w-[320px] bg-white h-fit rounded-lg shadow-sm">
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