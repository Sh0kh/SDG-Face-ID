import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import TimeoffAddModal from "./TimeoffAddModal";
import MiniSideBar from "../MiniSidebar/MiniSideBarDayOff";



export default function Timeoff() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="Container">
            <div className="flex gap-4 p-4">
                {/* Chap menyu */}
                <MiniSideBar />
                {/* O'ng kontent */}
                <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-[18px] font-normal text-[#424242]">{"Davom etmoqda "}</div>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Foydalanuvchining to‘liq ismi"
                                className="border border-[#e0e0e0] rounded px-4 py-2 text-[15px] outline-none bg-white"
                                style={{ width: 260 }}
                            />
                            <button
                                className="flex items-center gap-2 bg-[#43b649] hover:bg-[#36953a] text-white px-4 py-2 rounded text-[15px] font-normal transition-colors"
                                onClick={() => setModalOpen(true)}
                            >
                                <FiPlus size={18} />
                                Qo'shish
                            </button>
                        </div>
                    </div>
                    <div className="rounded-lg border border-[#ededeb] overflow-hidden">
                        <table className="w-full text-[15px]">
                            <thead>
                                <tr className="bg-[#f7f7f7] text-[#bdbdbd]">
                                    <th className="px-6 py-3 text-left font-normal">Xodim</th>
                                    <th className="px-6 py-3 text-left font-normal">Sabab</th>
                                    <th className="px-6 py-3 text-left font-normal">Oraliq</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={3}>
                                        <div className="py-8 text-center italic text-[#424242] text-[17px]">
                                            Qo‘shimcha dam olish haqida ma’lumot yo‘q. Qo‘shimcha dam olish qo‘shish
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <TimeoffAddModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
    );
}