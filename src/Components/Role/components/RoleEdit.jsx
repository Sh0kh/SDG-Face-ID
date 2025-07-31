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
    Tooltip,
    IconButton,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { $api } from "../../../utils";
import { Alert } from "../../../utils/Alert";
import Edit from "../../UI/Icons/Edit";

export default function RoleEdit({ refresh, data }) {
    const [open, setOpen] = useState(false);
    const [roleName, setRoleName] = useState("");
    const [permissions, setPermissions] = useState([]);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [permissionsLoading, setPermissionsLoading] = useState(false);

    const handleOpen = () => {
        if (!loading) setOpen(!open);
    };

    const handleCheckboxChange = (id) => {
        setSelectedPermissions((prev) =>
            prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
        );
    };

    const getRole = async () => {
        try {
            const response = await $api.get(`/role/getOne?id=${data}`, {
                headers: {
                    "ngrok-skip-browser-warning": "true",
                },
            });

            const roleData = response.data?.object;
            setRoleName(roleData?.name || "");

            // Извлекаем ID разрешений из массива permissions
            const permissionIds = roleData?.permissions?.map(perm => perm.id) || [];
            setSelectedPermissions(permissionIds);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const updateData = {
                id: data,
                name: roleName,
                permissions: selectedPermissions,
            };

            // Используем PUT запрос для обновления роли
            await $api.put(`/role/update?id=${data}`, updateData);

            Alert(`Lavozim muvaffaqiyatli tahrirlandi`, "success");
            setOpen(false);
            refresh();
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
            setPermissionsLoading(true);
            const response = await $api.get(`/permission/getAll`, {
                headers: {
                    "ngrok-skip-browser-warning": "true",
                },
            });
            setPermissions(response.data?.object || []);
        } catch (error) {
            console.log(error);
        } finally {
            setPermissionsLoading(false);
        }
    };

    useEffect(() => {
        if (open) {
            getAllPermissions();
            getRole();
        }
    }, [open]);

    return (
        <>
            <Tooltip content="Tahrirlash">
                <IconButton variant="text" color="green" onClick={handleOpen}>
                    <Edit size={5} />
                </IconButton>
            </Tooltip>

            <Dialog open={open} handler={handleOpen} size="lg">
                <DialogHeader>Lavozimni tahrirlash</DialogHeader>
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