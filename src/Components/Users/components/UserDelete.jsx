import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    IconButton,
    Typography,
    Tooltip,
} from "@material-tailwind/react";
import { useState } from "react";
import { Alert } from "../../../utils/Alert";
import { $api } from "../../../utils";
import Delete from "../../UI/Icons/Delete";

export default function UserDelete({ id, refresh }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => {
        if (!loading) setOpen(!open);
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            await $api.delete(`/user/delete?userId=${id}`, {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            });
            refresh();
            Alert("Xodim muvaffaqiyatli o'chirildi", "success");
            handleOpen();
        } catch (error) {
            console.log(error);
            Alert("Xodimni o'chirishda xatolik yuz berdi", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Tooltip content="O'chirish">
                <IconButton variant="text" color="red" onClick={handleOpen}>
                    <Delete size={5} />
                </IconButton>
            </Tooltip>

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Xodimni o‘chirish</DialogHeader>
                <DialogBody divider>
                    <Typography color="gray">
                        Siz ushbu xodimni o‘chirmoqchimisiz? Ushbu amal qaytarib bo‘lmaydi.
                    </Typography>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="gray"
                        onClick={handleOpen}
                        className="mr-2"
                        disabled={loading}
                    >
                        Bekor qilish
                    </Button>
                    <Button
                        variant="gradient"
                        color="red"
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading ? "O‘chirilmoqda..." : "O‘chirish"}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
