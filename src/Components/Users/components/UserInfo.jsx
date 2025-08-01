import {
    IconButton,
    Tooltip,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Typography
} from "@material-tailwind/react";
import { useState } from "react";
import EyeIcon from "../../UI/Icons/EyeIcon";

export default function UserInfo({ data }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const userRole = data?.roles?.[0]?.name || "Noma'lum rol";
    const userPermissions = data?.roles?.[0]?.permissions || [];

    return (
        <>
            <Tooltip content="Batafsil ma'lumot">
                <IconButton variant="text" color="blue" onClick={handleOpen}>
                    <EyeIcon size={5} />
                </IconButton>
            </Tooltip>

            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Foydalanuvchi haqida</DialogHeader>
                <DialogBody divider>
                    <Typography variant="h6" color="blue-gray">
                        Foydalanuvchi nomi: <span className="font-normal">{data.username}</span>
                    </Typography>

                    <Typography variant="h6" color="blue-gray" className="mt-2">
                        Rol: <span className="font-normal">{userRole}</span>
                    </Typography>

                    <Typography variant="h6" color="blue-gray" className="mt-2">
                        Ruxsatlar:
                    </Typography>
                    {userPermissions.length > 0 ? (
                        <ul className="list-disc list-inside text-sm mt-1">
                            {userPermissions.map((perm, idx) => (
                                <li key={idx}>{perm}</li>
                            ))}
                        </ul>
                    ) : (
                        <Typography variant="small" className="mt-1 italic text-gray-500">
                            Ruxsatlar mavjud emas
                        </Typography>
                    )}
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={handleOpen}>
                        Yopish
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
