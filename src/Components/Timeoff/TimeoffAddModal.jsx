import { useRef } from "react";
import { FiX, FiUser, FiCheckCircle } from "react-icons/fi";

export default function TimeoffAddModal({ open, onClose }) {
    const modalRef = useRef(null);

    if (!open) return null;

    const handleOverlayClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.25)" }}
            onMouseDown={handleOverlayClick}
        >
            <div
                ref={modalRef}
                className="bg-white rounded-lg shadow-lg w-full max-w-2xl relative p-0 animate-fade-in"
                onMouseDown={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-6 pt-6 pb-3 border-b">
                    <span className="text-[20px] font-normal text-[#424242]">
                        Qo‘shimcha dam olish hosil qilish
                    </span>
                    <button
                        className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-[#43b649] text-xl"
                        onClick={onClose}
                    >
                        <FiX />
                    </button>
                </div>
                <form className="px-6 py-6 space-y-5">
                    <div>
                        <span className="block text-[#424242] text-[16px] mb-2">Qo‘shimcha dam olish</span>
                        <div className="flex gap-8">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="type" defaultChecked className="accent-[#43b649]" />
                                <span className="text-[#424242] text-[15px]">Kunlik</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="type" className="accent-[#43b649]" />
                                <span className="text-[#424242] text-[15px]">Soatlik</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-[#757575] text-[15px] mb-2">Boshlanish *</label>
                            <input
                                type="date"
                                className="w-full border border-[#e0e0e0] rounded px-3 py-2 text-[15px] outline-none bg-white"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-[#757575] text-[15px] mb-2">Tugash *</label>
                            <input
                                type="date"
                                className="w-full border border-[#e0e0e0] rounded px-3 py-2 text-[15px] outline-none bg-white"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[#757575] text-[15px] mb-2">Xodimni tanlang *</label>
                        <button
                            type="button"
                            className="w-12 h-10 flex items-center justify-center border border-[#e0e0e0] rounded text-[#43b649] bg-white text-xl"
                        >
                            <FiUser />
                        </button>
                    </div>
                    <div>
                        <label className="block text-[#757575] text-[15px] mb-2">Qo'shimcha dam olish turi *</label>
                        <select
                            className="w-full border border-[#e0e0e0] rounded px-3 py-2 text-[15px] outline-none bg-white"
                            required
                        >
                            <option value="">Tanlang</option>
                            <option value="mehnat">Mehnat ta’tili</option>
                            <option value="bepul">Bepul ta’til</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[#757575] text-[15px] mb-2">Izoh</label>
                        <textarea
                            className="w-full border border-[#e0e0e0] rounded px-3 py-2 text-[15px] outline-none bg-white resize-none"
                            rows={2}
                        />
                    </div>
                    <div className="flex justify-end mt-6">
                        <button
                            className="flex items-center gap-2 bg-[#43b649] hover:bg-[#36953a] text-white px-6 py-2 rounded text-[15px] font-normal transition-colors"
                            type="submit"
                        >
                            <FiCheckCircle size={18} />
                            Saqlash
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}