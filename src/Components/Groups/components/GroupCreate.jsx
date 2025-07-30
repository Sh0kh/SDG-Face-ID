import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { $api } from "../../../utils";
import { Alert } from "../../../utils/Alert";

export default function GroupCreate() {
    const [open, setOpen] = useState(false);
    const [groupName, setGroupName] = useState("");

    const handleOpen = () => setOpen(!open);

    const handleSave = async () => {
        try {
            const NewData = {
                name: groupName,
            };
            const response = await $api.post(`/group/create`, NewData);
            setGroupName("");
            Alert(`Guruh muvaffaqiyatli yaratildi`, "success");
            setOpen(false);
        } catch (error) {
            Alert(`Xatolik: ${err.response?.data?.message || `Noma'lum xatolik`}`, "error");
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
                Yangi guruh qo'shish
            </Button>

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Yangi guruh qo'shish</DialogHeader>
                <DialogBody className="flex flex-col gap-4">
                    <Input
                        label="Guruh nomi"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        required
                    />
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="gray" onClick={handleOpen} className="mr-2">
                        Bekor qilish
                    </Button>
                    <Button color="blue" onClick={handleSave}>
                        Saqlash
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
