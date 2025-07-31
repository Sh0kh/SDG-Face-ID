import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    IconButton,
    Typography,
    Tooltip,
    Input,
} from "@material-tailwind/react";
import { useState } from "react";
import { Alert } from "../../../utils/Alert";
import { $api } from "../../../utils";
import Edit from "../../UI/Icons/Edit";

export default function GroupEdit({ data, refresh }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(data.name || "");

    const handleOpen = () => setOpen(!open);

    const handleEdit = async () => {
        setLoading(true);
        try {
            const EditData = {
                id: data.id,
                name: name,
            }
            await $api.put(`/group/update`, EditData, {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            });
            Alert("Guruh muvaffaqiyatli yangilandi", "success");
            handleOpen();
            refresh();
        } catch (error) {
            console.error(error);
            Alert("Guruhni yangilashda xatolik yuz berdi", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Tooltip content="Tahrirlash">
                <IconButton variant="text" color="green" onClick={handleOpen}>
                    <Edit size={5} />
                </IconButton>
            </Tooltip>

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Yangi guruh qo'shish</DialogHeader>
                <DialogBody className="flex flex-col gap-4">
                    <Input
                        label="Guruh nomi"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="gray" onClick={handleOpen} className="mr-2">
                        Bekor qilish
                    </Button>
                    <Button
                        variant="gradient"
                        color="blue"
                        onClick={handleEdit}
                        disabled={loading}
                    >
                        {loading ? "Saqlanmoqda..." : "Saqlash"}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
