import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
} from "@material-tailwind/react";
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { $api } from "../../../utils";
import { Alert } from "../../../utils/Alert";

export default function TaskCreate({ refresh }) {
    const [open, setOpen] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
        setTaskName("");
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const NewData = { name: taskName };
            await $api.post(`/permission/create`, NewData);
            Alert(`Vazifa muvaffaqiyatli yaratildi`, "success");
            setOpen(false);
            refresh();
        } catch (error) {
            Alert(`Xatolik: ${error.response?.data?.message || `Noma'lum xatolik`}`, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                color="blue"
                size="sm"
                className="flex items-center gap-2"
                onClick={handleOpen}
            >
                <PlusIcon className="h-5 w-5" />
                Yangi vazifa qo'shish
            </Button>

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Yangi vazifa qo'shish</DialogHeader>
                <DialogBody className="flex flex-col gap-4">
                    <Input
                        label="Vazifa nomi"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        required
                    />
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="gray" onClick={handleOpen} className="mr-2">
                        Bekor qilish
                    </Button>
                    <Button
                        color="blue"
                        onClick={handleSave}
                        disabled={loading || !taskName.trim()}
                        className="flex items-center gap-2"
                    >
                        {loading && (
                            <svg
                                className="animate-spin h-5 w-5 text-white"
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
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>
                        )}
                        {loading ? "Saqlanmoqda..." : "Saqlash"}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
