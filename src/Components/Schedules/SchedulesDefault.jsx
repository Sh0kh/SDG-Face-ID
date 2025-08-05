import { FiArrowLeft, FiSettings, FiPlusCircle, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

const data = [
	{
		name: "Jurabek Toshbekov",
		schedule: [
			"09:00 am-06:00 pm",
			"09:00 am-06:00 pm",
			"09:00 am-06:00 pm",
			"09:00 am-06:00 pm",
			"09:00 am-06:00 pm",
			"dam olish kuni",
			"dam olish kuni",
		],
	},
	{
		name: "Oybek Oybek",
		schedule: [
			"09:00 am-06:00 pm",
			"09:00 am-06:00 pm",
			"09:00 am-06:00 pm",
			"09:00 am-06:00 pm",
			"09:00 am-06:00 pm",
			"dam olish kuni",
			"dam olish kuni",
		],
	},
];

const days = [
	{ date: "08/04", label: "Dush" },
	{ date: "08/05", label: "Sesh" },
	{ date: "08/06", label: "Chor" },
	{ date: "08/07", label: "Pay" },
	{ date: "08/08", label: "Juma" },
	{ date: "08/09", label: "Shan" },
	{ date: "08/10", label: "Yak" },
];

function CrurentModal({ open, onClose }) {
    if (!open) return null;
    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-30 z-40"
                onClick={onClose}
                tabIndex={-1}
            />
            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                <div
                    className="bg-white rounded-lg shadow-lg w-full max-w-xl relative p-0 pointer-events-auto"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between px-6 pt-6 pb-3 border-b">
                        <span className="text-[20px] font-normal text-[#424242]">Jadval biriktirish</span>
                        <button
                            className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-[#757575] text-xl"
                            onClick={onClose}
                        >
                            <FiX />
                        </button>
                    </div>
                    <div className="px-6 py-4">
                        <div className="mb-5">
                            <label className="block text-[#757575] text-[15px] mb-2">Biriktirish vaqti</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full border border-[#e0e0e0] rounded px-3 py-2 text-[15px] outline-none bg-white pr-10"
                                    placeholder=""
                                    readOnly
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#bdbdbd] text-lg">
                                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                                </span>
                            </div>
                        </div>
                        <div className="mb-5">
                            <input
                                type="text"
                                className="w-full border border-[#e0e0e0] rounded px-3 py-2 text-[15px] outline-none bg-white"
                                placeholder="Qidiruv"
                            />
                        </div>
                        <div className="border border-[#e0e0e0] rounded mb-5 bg-[#fafafa]">
                            <div className="px-4 py-3 flex items-center gap-2 border-b">
                                <input type="checkbox" className="accent-[#43b649]" id="barchasi" />
                                <label htmlFor="barchasi" className="text-[#757575] text-[15px]">Barchasi</label>
                            </div>
                            <div className="px-4 py-3 flex items-center gap-2 border-b">
                                <input type="checkbox" className="accent-[#43b649]" id="boshqaruv" />
                                <label htmlFor="boshqaruv" className="text-[#757575] text-[15px]">Boshqaruv</label>
                                <span className="ml-auto bg-[#f3faf4] text-[#43b649] rounded px-2 py-0.5 text-[15px] font-medium">0</span>
                            </div>
                            <div className="px-4 py-3 flex items-center gap-2 border-b">
                                <input type="checkbox" className="accent-[#43b649]" id="default" />
                                <label htmlFor="default" className="text-[#43b649] text-[15px]">Default Department</label>
                                <select className="ml-2 border border-[#e0e0e0] rounded px-2 py-1 text-[15px]">
                                    <option>1</option>
                                </select>
                                <span className="ml-auto bg-[#f3faf4] text-[#43b649] rounded px-2 py-0.5 text-[15px] font-medium">1</span>
                            </div>
                            <div className="px-4 py-3 flex items-center gap-2">
                                <input type="checkbox" className="accent-[#43b649]" id="ishlab" />
                                <label htmlFor="ishlab" className="text-[#43b649] text-[15px]">Ishlab chiqarish</label>
                                <select className="ml-2 border border-[#e0e0e0] rounded px-2 py-1 text-[15px]">
                                    <option>1</option>
                                </select>
                                <span className="ml-auto bg-[#f3faf4] text-[#43b649] rounded px-2 py-0.5 text-[15px] font-medium">1</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <span className="text-[#bdbdbd] text-[15px]">
                                Tanlangan xodimlar soni <span className="bg-[#43b649] text-white rounded px-2 py-0.5 text-[15px] font-medium">0</span>
                            </span>
                            <button className="flex items-center gap-2 bg-[#43b649] hover:bg-[#36953a] text-white px-6 py-2 rounded text-[15px] font-normal transition-colors">
                                <FiPlusCircle size={18} />
                                Saqlash
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default function SchedulesDefault() {
	const [selectedDate, setSelectedDate] = useState("2025-08-05");
	const [hoverCell, setHoverCell] = useState({ row: null, col: null });
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const settingsRef = useRef(null);

	useEffect(() => {
		function handleClick(e) {
			if (settingsRef.current && !settingsRef.current.contains(e.target)) {
				setSettingsOpen(false);
			}
		}
		if (settingsOpen) {
			document.addEventListener("mousedown", handleClick);
		}
		return () => document.removeEventListener("mousedown", handleClick);
	}, [settingsOpen]);

	return (
		<div className="Container">
			<div className="bg-[#fff]  pb-6">
				<div className="flex items-center gap-2 px-6 pt-4 pb-2">
					<NavLink to={"/schedules"}>
					<button className="text-green-500 text-xl mr-1">
						<FiArrowLeft />
					</button>
					</NavLink>
					
					<span className="font-normal text-[20px] text-[#424242]">
						Default Schedule
					</span>
				</div>
				<div className="px-6 text-[#bdbdbd] text-[15px] mb-2">
					Elemntlar soni 1-2 jami 2
				</div>
				<div className="flex items-center justify-end gap-2 px-6 mb-2 relative">
					<input
						type="date"
						value={selectedDate}
						onChange={(e) => setSelectedDate(e.target.value)}
						className="border border-[#e0e0e0] rounded px-3 py-1.5 text-sm outline-none bg-white"
						style={{ width: 150 }}
					/>
					<button className="w-8 h-8 flex items-center justify-center border border-[#e0e0e0] rounded bg-white hover:bg-gray-50 text-[#757575] text-lg">
						&lt;
					</button>
					<button className="w-8 h-8 flex items-center justify-center border border-[#e0e0e0] rounded bg-white hover:bg-gray-50 text-[#757575] text-lg">
						&gt;
					</button>
					<button className="border border-[#e0e0e0] rounded px-3 py-1.5 text-sm bg-white hover:bg-gray-50 text-[#757575]">
						Bugun
					</button>
					<div className="relative" ref={settingsRef}>
						<button
							className="w-8 h-8 flex items-center justify-center border border-[#e0e0e0] rounded bg-white hover:bg-gray-50 text-[#757575] text-lg"
							onClick={() => setSettingsOpen((v) => !v)}
						>
							<FiSettings />
						</button>
						{settingsOpen && (
							<div className="absolute right-0 mt-2 w-56 bg-white border border-[#e0e0e0] rounded shadow z-20">
								<button className="flex items-center gap-2 px-4 py-3 w-full text-left hover:bg-gray-50 text-[#424242] text-[15px]">
									<FiEdit2 className="text-[#757575]" size={18} />
									O'zgartirish
								</button>
								<button className="flex items-center gap-2 px-4 py-3 w-full text-left hover:bg-gray-50 text-[#424242] text-[15px]">
									<FiTrash2 className="text-[#757575]" size={18} />
									O'chirib tashlash
								</button>
							</div>
						)}
					</div>
					<button
						className="flex items-center gap-1 bg-[#43b649] hover:bg-[#36953a] text-white px-4 py-2 rounded text-sm font-normal transition-colors"
						onClick={() => setModalOpen(true)}
					>
						<FiPlusCircle size={18} />
						Biriktirish
					</button>
				</div>
				<div className="rounded-2xl overflow-hidden border border-[#e0e0e0] bg-white mx-6">
					<table className="w-full text-[15px]">
						<thead>
							<tr>
								<th className="bg-[#f7f7f7] text-[#bdbdbd] font-normal px-6 py-3 text-left border-0 min-w-[180px]">
									<div className="flex items-center gap-1">
										To'liq ism
									</div>
								</th>
								{days.map((d, i) => (
									<th
										key={d.date}
										className={`px-6 py-3 text-left border-0 font-normal ${
											i === 0
												? "bg-[#ededeb] text-[#bdbdbd]"
												: "bg-[#f7f7f7] text-[#bdbdbd]"
										}`}
									>
										<div>
											<span>{d.date}</span>{" "}
											<span className="font-normal">{d.label}</span>
										</div>
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{data.map((row, rowIdx) => (
								<tr key={row.name} className="border-b last:border-b-0">
									<td className="px-6 py-4 border-0 font-normal text-[#424242]">
										{row.name}
									</td>
									{row.schedule.map((val, colIdx) => {
										// Jadvaldagi birinchi ustun (kun) va hover uchun ranglar
										const isFirstCol = colIdx === 0;
										const isHovered =
											hoverCell.row === rowIdx && hoverCell.col === colIdx;
										return (
											<td
												key={colIdx}
												className={
													`px-6 py-4 border-0 relative transition-colors duration-150 ` +
													(isFirstCol
														? "bg-[#f7f7f7] text-[#bdbdbd]"
														: isHovered
														? "bg-[#fafaf0]"
														: "bg-white text-[#424242]") +
													(val === "dam olish kuni" ? " text-[#bdbdbd]" : "")
												}
												onMouseEnter={() =>
													setHoverCell({ row: rowIdx, col: colIdx })
												}
												onMouseLeave={() =>
													setHoverCell({ row: null, col: null })
												}
											>
												{/* Qalam faqat hoverda va dam olish kuni bo'lmasa */}
												{isHovered && val !== "Dam olish kuni" ? (
													<button className="w-10 h-10 flex items-center justify-center border border-[#e0e0e0] rounded bg-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-sm">
														<FiEdit2 className="text-[#43b649]" size={20} />
													</button>
												) : (
													<span>{val}</span>
												)}
											</td>
										);
									})}
								</tr>
							))}
						</tbody>
					</table>
				</div>
				{/* Bottom info */}
				<div className="mt-4 flex justify-start px-6">
					<span className="text-[#bdbdbd] text-[15px]">
						Elemntlar soni 1-2 jami 2
					</span>
				</div>
				<CrurentModal open={modalOpen} onClose={() => setModalOpen(false)} />
			</div>
		</div>
	);
}
