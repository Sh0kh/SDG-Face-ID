import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    IconButton,
    Tooltip,
    Typography,
    Card,
    CardBody,
    Chip,
    Spinner,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { $api } from "../../../utils";
import EyeIcon from "../../UI/Icons/EyeIcon";

export default function RoleInfo({ data }) {
    const [open, setOpen] = useState(false);
    const [roleData, setRoleData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => setOpen(!open);

    const getRole = async () => {
        try {
            setLoading(true);
            const response = await $api.get(`/role/getOne?id=${data}`, {
                headers: {
                    "ngrok-skip-browser-warning": "true",
                },
            });

            setRoleData(response.data?.object);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open) {
            getRole();
        }
    }, [open]);

    const formatDate = (dateArray) => {
        if (!dateArray || !Array.isArray(dateArray)) return "N/A";
        const [year, month, day, hour, minute, second] = dateArray;
        return new Date(year, month - 1, day, hour, minute, second).toLocaleString('ru-RU');
    };

    return (
        <>
            <Tooltip content="Batafsil ma'lumot">
                <IconButton variant="text" color="blue" onClick={handleOpen}>
                    <EyeIcon size={5} />
                </IconButton>
            </Tooltip>

            <Dialog open={open} handler={handleOpen} size="md">
                <DialogHeader className="flex items-center gap-2">
                    <EyeIcon size={6} className="text-blue-500" />
                    <span>Lavozim haqida ma'lumot</span>
                </DialogHeader>

                <DialogBody className="max-h-[70vh] overflow-y-auto">
                    {loading ? (
                        <div className="flex justify-center items-center py-8">
                            <Spinner className="h-8 w-8 text-blue-500" />
                            <span className="ml-3 text-blue-500">Yuklanmoqda...</span>
                        </div>
                    ) : roleData ? (
                        <div className="space-y-6">
                            {/* Основная информация */}
                            <Card className="bg-blue-50 border border-blue-100">
                                <CardBody className="p-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <Typography variant="h5" color="blue-gray" className="font-semibold">
                                            {roleData.name}
                                        </Typography>
                                        <Chip
                                            value={`ID: ${roleData.id}`}
                                            size="sm"
                                            variant="ghost"
                                            color="blue"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <Typography variant="small" color="blue-gray" className="font-medium mb-1">
                                                Yaratilgan sana:
                                            </Typography>
                                            <Typography variant="small" color="gray">
                                                {formatDate(roleData.createdAt)}
                                            </Typography>
                                        </div>

                                        <div>
                                            <Typography variant="small" color="blue-gray" className="font-medium mb-1">
                                                Yangilangan sana:
                                            </Typography>
                                            <Typography variant="small" color="gray">
                                                {formatDate(roleData.updatedAt)}
                                            </Typography>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>

                            {/* Разрешения */}
                            <Card className="border border-gray-200">
                                <CardBody className="p-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <Typography variant="h6" color="blue-gray" className="font-semibold">
                                            Ruxsatlar
                                        </Typography>
                                        <Chip
                                            value={`${roleData.permissions?.length || 0} ta`}
                                            size="sm"
                                            variant="ghost"
                                            color="green"
                                        />
                                    </div>

                                    {roleData.permissions && roleData.permissions.length > 0 ? (
                                        <div className="space-y-3">
                                            {roleData.permissions.map((permission, index) => (
                                                <Card key={permission.id} className="bg-green-50 border border-green-100">
                                                    <CardBody className="p-3">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                                                    <Typography variant="small" color="white" className="font-bold">
                                                                        {index + 1}
                                                                    </Typography>
                                                                </div>
                                                                <div>
                                                                    <Typography variant="small" color="blue-gray" className="font-medium">
                                                                        {permission.name}
                                                                    </Typography>
                                                                    <Typography variant="small" color="gray" className="text-xs">
                                                                        ID: {permission.id}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                            <Chip
                                                                value="Faol"
                                                                size="sm"
                                                                color="green"
                                                                variant="ghost"
                                                            />
                                                        </div>

                                                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                                                            <div>
                                                                <Typography variant="small" color="gray" className="font-medium">
                                                                    Yaratilgan:
                                                                </Typography>
                                                                <Typography variant="small" color="gray">
                                                                    {formatDate(permission.createdAt)}
                                                                </Typography>
                                                            </div>
                                                            <div>
                                                                <Typography variant="small" color="gray" className="font-medium">
                                                                    Yangilangan:
                                                                </Typography>
                                                                <Typography variant="small" color="gray">
                                                                    {formatDate(permission.updatedAt)}
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-6">
                                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <Typography variant="h4" color="gray">
                                                    📝
                                                </Typography>
                                            </div>
                                            <Typography variant="small" color="gray">
                                                Bu lavozimda hech qanday ruxsat yo'q
                                            </Typography>
                                        </div>
                                    )}
                                </CardBody>
                            </Card>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <Typography variant="small" color="gray">
                                Ma'lumot topilmadi
                            </Typography>
                        </div>
                    )}
                </DialogBody>

                <DialogFooter>
                    <Button variant="text" color="blue-gray" onClick={handleOpen}>
                        Yopish
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}