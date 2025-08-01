import { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Select,
    Option,
    Card,
    CardBody,
    Typography,
    Checkbox,
} from "@material-tailwind/react";
import { $api } from "../../../utils";
import { PlusIcon } from "lucide-react";
import { Alert } from "../../../utils/Alert";

export default function UserCreate({ refresh }) {
    const [open, setOpen] = useState(false);
    const [roles, setRoles] = useState([]);
    const [groups, setGroups] = useState([]);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        groupId: 0,
        roleIds: []
    });
    const [loading, setLoading] = useState(false);

    const handleOpen = () => setOpen(!open);

    const getAllRoles = async () => {
        try {
            const response = await $api.get(`/role/getAll`, {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            });
            if (response.data.success) {
                setRoles(response.data.object);
            }
        } catch (error) {
            console.error("Rollarni olishda xatolik:", error);
        }
    };

    const getAllGroups = async () => {
        try {
            const response = await $api.get(`/group/getAll`, {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            });
            if (response.data.success) {
                setGroups(response.data.object);
            }
        } catch (error) {
            console.error("Guruhlarni olishda xatolik:", error);
        }
    };

    const createUser = async () => {
        try {
            setLoading(true);
            const response = await $api.post(`/user/create`, formData, {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            });

            if (response.data.success) {
                handleOpen();
                setFormData({
                    username: "",
                    password: "",
                    groupId: 0,
                    roleIds: []
                });
            }
            Alert(`Xodim muvaffaqiyatli yaratildi`, "success");
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

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleRoleToggle = (roleId) => {
        setFormData(prev => ({
            ...prev,
            roleIds: prev.roleIds.includes(roleId)
                ? prev.roleIds.filter(id => id !== roleId)
                : [...prev.roleIds, roleId]
        }));
    };

    useEffect(() => {
        getAllRoles();
        getAllGroups();
    }, []);

    return (
        <>
            <Button
                color="blue"
                size="sm"
                className="flex items-center gap-2"
                onClick={handleOpen}
            >
                <PlusIcon className="h-5 w-5" />
                Yangi xodim qo'shish
            </Button>

            <Dialog open={open} handler={handleOpen} size="lg" className="w-full">
                <DialogHeader>Yangi foydalanuvchi yaratish</DialogHeader>
                <DialogBody className="space-y-4 max-h-96 overflow-y-auto">
                    {/* Username Input */}
                    <div>
                        <Input
                            label="Foydalanuvchi nomi"
                            value={formData.username}
                            onChange={(e) => handleInputChange("username", e.target.value)}
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <Input
                            type="password"
                            label="Parol"
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            required
                        />
                    </div>

                    {/* Group Selection */}
                    <div>
                        <Select
                            label="Guruhni tanlang"
                            value={formData.groupId.toString()}
                            onChange={(value) => handleInputChange("groupId", parseInt(value))}
                        >
                            {groups.map((group) => (
                                <Option key={group.id} value={group.id.toString()}>
                                    {group.name}
                                </Option>
                            ))}
                        </Select>
                    </div>

                    {/* Roles Selection */}
                    <div>
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                            Rollarni tanlang
                        </Typography>
                        <Card className="w-full">
                            <CardBody className="space-y-2">
                                {roles.map((role) => (
                                    <div key={role.id} className="flex items-center">
                                        <Checkbox
                                            id={`role-${role.id}`}
                                            checked={formData.roleIds.includes(role.id)}
                                            onChange={() => handleRoleToggle(role.id)}
                                            ripple={false}
                                            className="h-5 w-5 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                                        />
                                        <div className="ml-3 flex-1">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-medium"
                                            >
                                                {role.name}
                                            </Typography>
                                            {role.permissions && role.permissions.length > 0 && (
                                                <Typography
                                                    variant="small"
                                                    color="gray"
                                                    className="text-xs"
                                                >
                                                    Ruxsatlar: {role.permissions.map(p => p.name).join(", ")}
                                                </Typography>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </CardBody>
                        </Card>
                    </div>
                </DialogBody>

                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Bekor qilish</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={createUser}
                        loading={loading}
                        disabled={!formData.username || !formData.password || formData.groupId === 0}
                    >
                        <span>Yaratish</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
