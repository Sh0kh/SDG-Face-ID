import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Spinner,
} from "@material-tailwind/react";
import { $api } from "../../../utils";
import { Alert } from "../../../utils/Alert";

export default function DepartmenCreate({ refresh }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false); // Loading state

    const handleOpen = () => {
        if (!loading) {
            setOpen(!open);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await $api.post("/group/create", { name });
            Alert(`Bo'lim muvaffaqiyatli yaratildi`, "success");
            setOpen(false);
            refresh()
            setName("");
        } catch (error) {
            console.error("Xato:", error);
            Alert(`Xatolik: ${error}`, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Qo'shish tugmasi */}
            <button
                className="flex items-center gap-2 bg-[#43b649] hover:bg-[#36953a] text-white px-4 py-2 rounded text-[15px] font-normal transition-colors"
                onClick={handleOpen}
                disabled={loading}
            >
                <FiPlus size={18} />
                Qo'shish
            </button>

            {/* Modal */}
            <Dialog
                open={open}
                handler={handleOpen}
                className="mt-10"
                size="sm"
            >
                <DialogHeader>
                    <div className="flex items-center justify-between w-full">
                        <h2 className="text-lg font-semibold text-[#424242]">
                            Yangi bo‘lim qo‘shish
                        </h2>
                        <button
                            className="text-gray-500 text-[15px] hover:text-gray-700"
                            onClick={handleOpen}
                            disabled={loading}
                        >
                            ✖
                        </button>
                    </div>
                </DialogHeader>

                <DialogBody className="pt-[0px]">
                    <input
                        type="text"
                        placeholder="Bo‘lim nomi"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={loading}
                        className="w-full border border-gray-300 rounded px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-[#43b649]"
                    />
                </DialogBody>

                <DialogFooter>
                    <Button
                        color="green"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex items-center gap-2"
                    >
                        {loading && <Spinner className="h-4 w-4" />}
                        {loading ? "Yuklanmoqda..." : "Saqlash"}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
