import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Input,
} from "@material-tailwind/react";
import { useState } from "react";
import Edit from "../../UI/Icons/Edit";
import axios from "axios";
import { Alert } from "../../../utils/Alert";
import { $api } from "../../../utils";

export default function DepartmentEdit({ data, refresh }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(data?.name);
    const [loading, setLoading] = useState(false); // 🔹 loading state

    const handleOpen = () => setOpen(!open);

    const handleUpdate = async () => {
        try {
            setLoading(true);
            const EditData = {
                id: data?.id,
                name: name
            }
            await $api.put(`/group/update`, EditData);
            Alert(`Bo'lim muvaffaqiyatli yaratildi`, "success");
            handleOpen();
            refresh();
        } catch (error) {
            Alert(`Xatolik: ${error}`, "error");
        } finally {
            setLoading(false); // 🔹 stop loading
        }
    };

    return (
        <>
            <button
                className="text-[#424242] hover:text-blue-800"
                title="Tahrirlash"
                onClick={handleOpen}
            >
                <Edit size={5} />
            </button>

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>
                    <div className="flex items-center justify-between w-full">
                        <h2 className="text-lg font-semibold text-[#424242]">
                            Bo‘lim nomini tahrirlash
                        </h2>
                        <button
                            className="text-gray-500 text-[15px] hover:text-gray-700"
                            onClick={handleOpen}
                        >
                            ✖
                        </button>
                    </div>
                </DialogHeader>

                <DialogBody className="flex flex-col gap-4">
                    <Input
                        label="Bo‘lim nomi"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={loading} // 🔹 disable input during loading
                    />
                </DialogBody>

                <DialogFooter>
                    <Button
                        color="blue"
                        onClick={handleUpdate}
                        disabled={loading}
                        className="flex items-center gap-2"
                    >
                        {loading ? (
                            <>
                                <svg
                                    className="animate-spin h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                    />
                                </svg>
                                Saqlanmoqda...
                            </>
                        ) : (
                            "Saqlash"
                        )}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
