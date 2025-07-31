import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Typography,
    Card,
    CardBody,
    Checkbox,
    Spinner,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { $api } from "../../../utils";
import { Alert } from "../../../utils/Alert";
import Loading from "../../UI/Loadings/Loading";

export default function RoleCreate({ refresh }) {
    const [open, setOpen] = useState(false);
    const [roleName, setRoleName] = useState("");
    const [permissions, setPermissions] = useState([]);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [permissionsLoading, setPermissionsLoading] = useState(false); // ⬅️ для загрузки permissions

    const handleOpen = () => {
        if (!loading) setOpen(!open);
    };

    const handleCheckboxChange = (id) => {
        setSelectedPermissions((prev) =>
            prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
        );
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const NewData = {
                name: roleName,
                permissions: selectedPermissions,
            };
            await $api.post(`/role/create`, NewData);
            setRoleName("");
            setSelectedPermissions([]);
            Alert(`Lavozim muvaffaqiyatli yaratildi`, "success");
            setOpen(false);
            refresh()
        } catch (error) {
            Alert(
                `Xatolik: ${error.response?.data?.message || `Noma'lum xatolik`}`,
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    const getAllPermissions = async () => {
        try {
            setPermissionsLoading(true); // ⬅️ включаем loading
            const response = await $api.get(`/permission/getAll`, {
                headers: {
                    "ngrok-skip-browser-warning": "true",
                },
            });
            setPermissions(response.data?.object || []);
        } catch (error) {
            console.log(error);
        } finally {
            setPermissionsLoading(false); // ⬅️ выключаем loading
        }
    };

    useEffect(() => {
        if (open) {
            getAllPermissions();
        }
    }, [open]);



    return (
        <>
            <Button
                color="blue"
                size="sm"
                className="flex items-center gap-2"
                onClick={handleOpen}
            >
                <PlusIcon className="h-5 w-5" />
                Yangi lavozim qo'shish
            </Button>

            <Dialog open={open} handler={handleOpen} size="lg">
                <DialogHeader>Yangi lavozim qo'shish</DialogHeader>
                <DialogBody className="flex flex-col gap-6 max-h-[75vh] overflow-y-auto">
                    <Input
                        label="Lavozim nomi"
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                        required
                        disabled={loading}
                    />

                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Ruxsatlar
                        </Typography>

                        {permissionsLoading ? (
                            <div className="flex justify-center items-center py-6">
                                <Spinner className="h-6 w-6 text-blue-500" />
                                <span className="ml-2 text-blue-500 text-sm">Yuklanmoqda...</span>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {permissions.map((perm) => (
                                    <Card
                                        key={perm.id}
                                        className="w-full border border-blue-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
                                    >
                                        <CardBody className="py-2 px-4 flex items-center justify-between">
                                            <Typography variant="small" color="blue-gray">
                                                {perm.name}
                                            </Typography>
                                            <Checkbox
                                                checked={selectedPermissions.includes(perm.id)}
                                                onChange={() => handleCheckboxChange(perm.id)}
                                                disabled={loading}
                                                color="blue"
                                                ripple={false}
                                            />
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
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
                    <Button color="blue" onClick={handleSave} disabled={loading}>
                        {loading ? "Saqlanmoqda..." : "Saqlash"}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
