import { useState, useEffect } from "react";
import {
    IconButton,
    Tooltip,
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
    Button,
} from "@material-tailwind/react";
import Edit from "../../UI/Icons/Edit";
import { $api } from "../../../utils";
import { Alert } from "../../../utils/Alert";

export default function UserEdit({ data, refresh }) {
    const [open, setOpen] = useState(false);
    const [roles, setRoles] = useState([]);
    const [groups, setGroups] = useState([]);
    const [formData, setFormData] = useState({
        id: 0,
        username: "",
        password: "",
        groupId: 0,
        roleIds: []
    });
    const [loading, setLoading] = useState(false);

    const handleOpen = () => {
        if (!open) {
            setFormData({
                id: data.id,
                username: data.username || "",
                password: "",
                groupId: data.groupId || 0,
                roleIds: data.roles ? data.roles.map(role => role.id) : []
            });
            getAllRoles();
            getAllGroups();
        }
        setOpen(!open);
    };

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

    const updateUser = async () => {
        try {
            setLoading(true);
            const updateData = {
                id: formData.id,
                username: formData.username,
                groupId: formData.groupId,
                roleIds: formData.roleIds
            };
            if (formData.password.trim()) {
                updateData.password = formData.password;
            }

            const response = await $api.put(`/user/update`, updateData, {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            });

            if (response.data.success) {
                Alert(`Foydalanuvchi muvaffaqiyatli tahrirlandi`, "success");
                handleOpen();
                if (refresh) refresh();
            }
        } catch (error) {
            console.error("Foydalanuvchini yangilashda xatolik:", error);
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

    const getCurrentGroupName = () => {
        const group = groups.find(g => g.id === data.groupId);
        return group ? group.name : 'Nomaʼlum guruh';
    };

    const getCurrentRoleNames = () => {
        return data.roles ? data.roles.map(role => role.name).join(", ") : "Rol mavjud emas";
    };

    return (
        <>
            <Tooltip content="Tahrirlash">
                <IconButton variant="text" color="green" onClick={handleOpen}>
                    <Edit size={5} />
                </IconButton>
            </Tooltip>

            <Dialog open={open} handler={handleOpen} size="lg" className="w-full">
                <DialogHeader>Foydalanuvchini tahrirlash</DialogHeader>
                <DialogBody className="space-y-4 max-h-96 overflow-y-auto">
                    {/* Hozirgi maʼlumot */}
                    <Card className="w-full bg-blue-gray-50">
                        <CardBody className="py-3">
                            <Typography variant="small" color="blue-gray" className="font-medium">
                                Hozirgi maʼlumot: {data.username} | Guruh: {getCurrentGroupName()} | Rollar: {getCurrentRoleNames()}
                            </Typography>
                        </CardBody>
                    </Card>

                    {/* Username */}
                    <div>
                        <Input
                            label="Foydalanuvchi nomi"
                            value={formData.username}
                            onChange={(e) => handleInputChange("username", e.target.value)}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <Input
                            type="password"
                            label="Yangi parol (agar o‘zgartirish kerak bo‘lsa)"
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            placeholder="Yangi parol kiriting yoki bo‘sh qoldiring"
                        />
                    </div>

                    {/* Group select */}
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

                    {/* Roles */}
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
                        color="blue"
                        onClick={updateUser}
                        loading={loading}
                        disabled={!formData.username || formData.groupId === 0}
                    >
                        <span>Yangilash</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
