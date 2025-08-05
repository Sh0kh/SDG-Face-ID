import React, { useState, useRef, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { FaRegCalendarAlt, FaRegListAlt, FaUsers, FaExpand, FaTimes } from "react-icons/fa";

const reportData = [
    {
        title: "Ish vaqti hisobotlari",
        items: [
            "Bo‘limlar bo‘yicha",
            "Xodimlar bo‘yicha",
            { label: "Xodimlar hisoboti", beta: true },
            "Kechikishlar va Erta ketishlar",
            "Ish jadvallari (Xodimlar bo‘yicha)",
            "T12",
            "Hisoblash davri uchun xodimlar bo‘yicha umumiy hisobot",
            "Ishdan bo‘shatilgan xodimlar bo‘yicha ish haqi",
            "Kelmagan xodimlar bo‘yicha hisobot",
            "Lokatsiyalar bo‘yicha T12",
        ],
    },
    {
        title: "Fakt hisobotlar",
        items: [
            "Kelish/Ketish",
            "Bir oy davomida xodimlar tashrifi",
            "Xodimlar tashrifi",
            "Lokatsiyalar bo‘yicha Kelish/Ketish",
            "Xodimlar bo‘yicha Kelish/Ketish",
        ],
    },
    {
        title: "Statistik hisobotlar",
        items: [
            "Xodimlarning tug‘ilgan kunlari",
            "Ishdan bo‘shatilgan xodimlar",
            "Yosh profili",
            "Gender profili",
            "Xodimlar soni",
            "Qabul qilingan xodimlar",
            "Bo‘limlar bo‘yicha xodimlar tashrifining statistikasi",
            "Xodimlarning kuzatib boriladigan hujjatlari",
            "Qurilmadagi tashriflar statistikasi",
            "Bo‘limlar bo‘yicha ishdan bo‘shatishlar statistikasi",
            "Ishdan bo‘shatishlar statistikasi",
        ],
    },
    {
        title: "Ish haqi",
        items: [],
    },
];

export default function Report() {
    const [activeReport, setActiveReport] = useState(null);
    const [filterOpen, setFilterOpen] = useState(false);
    const filterRef = useRef(null);

    const allReports = reportData.flatMap(group =>
        group.items.map(item =>
            typeof item === "string"
                ? { label: item, beta: false, group: group.title }
                : { ...item, group: group.title }
        )
    );

    useEffect(() => {
        function handleClick(e) {
            if (filterRef.current && !filterRef.current.contains(e.target)) {
                setFilterOpen(false);
            }
        }
        if (filterOpen) document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [filterOpen]);
    if (!activeReport) {
        return (
            <div className="p-4">
                <div className="flex flex-col gap-4">
                    <div className="flex gap-4">
                        <div className="bg-[#f7f7f7] rounded-t-lg px-6 py-2 text-[#43b649] text-[17px] font-normal border-b-2 border-[#e0e0e0] w-fit">
                            Hisobotlar
                        </div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
                        <div className="col-span-1 flex flex-col gap-4">
                            <div className="bg-[#fafafa] rounded-lg">
                                <div className="px-6 py-3 text-[#bdbdbd] text-[15px] border-b border-[#ededeb] font-normal">
                                    {reportData[0].title}
                                </div>
                                <ul>
                                    {reportData[0].items.map((item, idx) => {
                                        const label = typeof item === "string" ? item : item.label;
                                        const beta = typeof item === "string" ? false : item.beta;
                                        return (
                                            <li
                                                key={idx}
                                                className="flex items-center px-6 py-2 border-b last:border-b-0 border-[#ededeb] text-[#424242] text-[15px] cursor-pointer hover:bg-[#f3f3f3] transition"
                                                onClick={() => setActiveReport(label)}
                                            >
                                                <span className="w-4 h-4 rounded-full border border-[#43b649] flex items-center justify-center mr-3">
                                                    <span className="w-2 h-2 bg-[#43b649] rounded-full block"></span>
                                                </span>
                                                {label}
                                                {beta && (
                                                    <span className="ml-2 bg-[#fff0f0] text-[#e53935] text-[11px] font-semibold px-2 py-0.5 rounded">
                                                        BETA
                                                    </span>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            <div className="bg-[#fafafa] rounded-lg">
                                <div className="px-6 py-3 text-[#bdbdbd] text-[15px] border-b border-[#ededeb] font-normal">
                                    {reportData[1].title}
                                </div>
                                <ul>
                                    {reportData[1].items.map((item, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-center px-6 py-2 border-b last:border-b-0 border-[#ededeb] text-[#424242] text-[15px] cursor-pointer hover:bg-[#f3f3f3] transition"
                                            onClick={() => setActiveReport(item)}
                                        >
                                            <span className="w-4 h-4 rounded-full border border-[#43b649] flex items-center justify-center mr-3">
                                                <span className="w-2 h-2 bg-[#43b649] rounded-full block"></span>
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-span-1 flex flex-col gap-4">
                            <div className="bg-[#fafafa] rounded-lg">
                                <div className="px-6 py-3 text-[#bdbdbd] text-[15px] border-b border-[#ededeb] font-normal">
                                    {reportData[2].title}
                                </div>
                                <ul>
                                    {reportData[2].items.map((item, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-center px-6 py-2 border-b last:border-b-0 border-[#ededeb] text-[#424242] text-[15px] cursor-pointer hover:bg-[#f3f3f3] transition"
                                            onClick={() => setActiveReport(item)}
                                        >
                                            <span className="w-4 h-4 rounded-full border border-[#43b649] flex items-center justify-center mr-3">
                                                <span className="w-2 h-2 bg-[#43b649] rounded-full block"></span>
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-[#fafafa] rounded-lg h-full flex flex-col">
                                <div className="px-6 py-3 text-[#bdbdbd] text-[15px] border-b border-[#ededeb] font-normal">
                                    {reportData[3].title}
                                </div>
                                <div className="flex-1 flex items-center justify-center text-[#bdbdbd] text-[17px]">
                                    Hisobotlar mavjud emas
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const reportObj = allReports.find(r => r.label === activeReport);

    return (
        <div className="p-4 bg-[#f3f3f3] min-h-screen">
            <div className="flex border-b border-[#ededed] bg-white">
                <div className="flex">
                    <div className="px-6 py-3 text-[#424242] text-[16px] font-normal border-b-2 border-[#43b649] bg-[#f7f7f7] rounded-tl-lg">
                        Hisobotlar
                    </div>
                    <div className="px-6 py-3 text-[#43b649] text-[16px] font-normal border-b-2 border-[#43b649] bg-[#f7f7e8] flex items-center gap-2 relative -ml-2 rounded-t-lg">
                        {activeReport}
                        <button
                            className="ml-2 text-[#43b649] hover:bg-[#e0e0e0] rounded-full p-1"
                            onClick={() => setActiveReport(null)}
                        >
                            <FiX size={16} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-white border border-[#ededed] rounded mt-4 p-3 flex items-center gap-3 shadow-sm relative">
                <div className="flex items-center gap-1 justify-center" >
                    <input
                        type="text"
                        className="border border-[#e0e0e0] rounded px-4 py-2 text-[15px] outline-none bg-white"
                        value="29.07.2025 - 05.08.2025"
                        readOnly
                        style={{cursor: "pointer" }}
                        
                    />
                    <button
                        className="  w-8 h-8 flex items-center justify-center text-[#bdbdbd] hover:bg-[#f3f3f3] rounded"
                        tabIndex={-1}
                        onClick={() => setFilterOpen(v => !v)}
                        style={{ marginLeft: "-36px" }}
                    >
                        <FaRegCalendarAlt size={18} />
                    </button>
                    {filterOpen && (
                        <div className="absolute left-0 top-12 z-30 bg-white rounded-xl shadow-lg border border-[#ededeb] w-[420px] p-0 animate-fade-in">
                            <div className="p-4">
                                <input
                                    type="text"
                                    placeholder="Qidiruv"
                                    className="w-full border border-[#e0e0e0] rounded px-3 py-2 text-[15px] outline-none mb-4"
                                />
                                <div className="border border-[#e0e0e0] rounded bg-white overflow-hidden">
                                    <div className="flex items-center px-4 py-3 border-b">
                                        <input type="checkbox" className="accent-[#43b649] mr-2" id="barchasi" />
                                        <label htmlFor="barchasi" className="text-[#757575] text-[15px]">Barchasi</label>
                                    </div>
                                    <div className="flex items-center px-4 py-3 border-b">
                                        <input type="checkbox" className="accent-[#43b649] mr-2" id="boshqaruv" />
                                        <label htmlFor="boshqaruv" className="text-[#757575] text-[15px]">Boshqaruv</label>
                                        <span className="ml-auto bg-[#f3faf4] text-[#43b649] rounded px-2 py-0.5 text-[15px] font-medium">0</span>
                                    </div>
                                    <div className="flex items-center px-4 py-3 border-b">
                                        <input type="checkbox" className="accent-[#43b649] mr-2" id="default" />
                                        <label htmlFor="default" className="text-[#43b649] text-[15px]">Default Department</label>
                                        <select className="ml-2 border border-[#e0e0e0] rounded px-2 py-1 text-[15px]">
                                            <option>1</option>
                                        </select>
                                        <span className="ml-auto bg-[#f3faf4] text-[#43b649] rounded px-2 py-0.5 text-[15px] font-medium">1</span>
                                    </div>
                                    <div className="flex items-center px-4 py-3">
                                        <input type="checkbox" className="accent-[#43b649] mr-2" id="ishlab" />
                                        <label htmlFor="ishlab" className="text-[#43b649] text-[15px]">Ishlab chiqarish</label>
                                        <select className="ml-2 border border-[#e0e0e0] rounded px-2 py-1 text-[15px]">
                                            <option>1</option>
                                        </select>
                                        <span className="ml-auto bg-[#f3faf4] text-[#43b649] rounded px-2 py-0.5 text-[15px] font-medium">1</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <button ref={filterRef} onClick={() => setFilterOpen(v => !v)} className="w-9 h-9 flex items-center justify-center border border-[#e0e0e0] rounded bg-white text-[#43b649] text-lg">
                    <FaRegListAlt size={18} />
                </button>
                <button className="w-9 h-9 flex items-center justify-center border border-[#e0e0e0] rounded bg-white text-[#43b649] text-lg">
                    <FaUsers size={18} />
                </button>
                <button className="bg-[#ffd600] hover:bg-[#ffca00] text-[#424242] px-6 py-2 rounded text-[15px] font-medium flex items-center gap-2">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M9 12h6M12 9v6"/></svg>
                    Hisobot tuzish
                </button>
                <div className="flex-1"></div>
                <button className="w-9 h-9 flex items-center justify-center border border-[#e0e0e0] rounded bg-white text-[#43b649] text-lg">
                    <FaExpand size={18} />
                </button>
                <button className="w-9 h-9 flex items-center justify-center border border-[#e0e0e0] rounded bg-[#ededed] text-[#757575] text-lg">
                    <FaTimes size={18} />
                </button>
            </div>
            {/* Sahifa kontenti */}
            <div className="p-8 text-[#bdbdbd] text-[18px]">
                {activeReport} sahifasi uchun kontent shu yerda chiqadi.
            </div>
        </div>
    );
}