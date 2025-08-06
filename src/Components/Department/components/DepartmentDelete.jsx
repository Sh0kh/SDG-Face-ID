import { useState } from "react";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import Delete from "../../UI/Icons/Delete";
import { $api } from "../../../utils";
import { Alert } from "../../../utils/Alert";

export default function DepartmentDelete({ id, refresh }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const handleDelete = async () => {
        try {
            const response = await $api.delete(`/group/delete/${id}`)
            Alert(`Muvaffaqiyatli `, "success");
            handleOpen()
            refresh()
        } catch (error) {
            console.log(error)
            Alert(`Xatolik: ${error}`, "error");
        }
    };

    return (
        <>
            <button
                className="text-[#424242] hover:text-red-800"
                title="O‘chirish"
                onClick={handleOpen}
            >
                <Delete size={5} />
            </button>

            <Dialog open={open} handler={handleOpen} className="mt-[-100px]">
                <DialogHeader>Bo‘limni o‘chirish</DialogHeader>
                <DialogBody>
                    Siz ushbu bo‘limni o‘chirmoqchimisiz? Bu amal qaytarib bo‘lmaydi.
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="gray" onClick={handleOpen} className="mr-2">
                        Bekor qilish
                    </Button>
                    <Button variant="filled" color="red" onClick={handleDelete}>
                        Ha, o‘chirish
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
