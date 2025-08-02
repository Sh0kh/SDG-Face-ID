import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    Typography,
    Input,
    Button,
} from "@material-tailwind/react";
import { UserCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { $api } from "../../utils";

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        username: "",
        groupId: null,
        roles: []
    });

    const getProfile = async () => {
        try {
            const response = await $api.get(`/user/me?accessToken=${localStorage.getItem("token")}`, {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            });
            if (response.data.success) {
                setUser(response.data.object);
            }
        } catch (error) {
            console.error("Profilni olishda xatolik:", error);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setIsEditing(false);
        alert("Ma'lumotlar saqlandi");
    };

    return (
        <div className="min-h-screen flex items-center mt-[20px] justify-center">
            <Card className="w-full max-w-xl shadow-xl rounded-2xl p-8 bg-white">
                <div className="flex flex-col items-center gap-4 mb-6">
                    <UserCircleIcon className="w-24 h-24 text-blue-400" />
                    <Typography variant="h4" className="text-blue-gray-800 font-bold">
                        Profil Ma'lumotlari
                    </Typography>
                </div>

                <CardBody className="flex flex-col gap-6">
                    {/* Username */}
                    <div>
                        <Typography className="mb-1 text-sm text-blue-gray-600">Foydalanuvchi nomi</Typography>
                        {isEditing ? (
                            <Input
                                name="username"
                                value={user.username}
                                onChange={handleChange}
                            />
                        ) : (
                            <Typography className="font-medium">{user.username}</Typography>
                        )}
                    </div>

                    {/* Group ID */}
                    <div>
                        <Typography className="mb-1 text-sm text-blue-gray-600">Guruh ID</Typography>
                        <Typography className="font-medium">{user.groupId || "Nomaʼlum"}</Typography>
                    </div>

                    {/* Role */}
                    <div>
                        <Typography className="mb-1 text-sm text-blue-gray-600">Rol</Typography>
                        <Typography className="font-medium">
                            {user.roles.length > 0 ? user.roles.map(role => role.name).join(", ") : "Rol topilmadi"}
                        </Typography>
                    </div>

                    {/* Permissions */}
                    <div>
                        <Typography className="mb-1 text-sm text-blue-gray-600">Ruxsatlar</Typography>
                        {user.roles.length > 0 && user.roles[0].permissions.length > 0 ? (
                            <ul className="list-disc list-inside text-sm text-gray-700">
                                {user.roles[0].permissions.map((perm, idx) => (
                                    <li key={idx}>{perm.name}</li>
                                ))}
                            </ul>
                        ) : (
                            <Typography className="text-sm text-gray-500 italic">
                                Ruxsatlar yo‘q
                            </Typography>
                        )}
                    </div>

                    {/* Edit button */}
                    <div className="mt-4 flex justify-end">
                        {isEditing ? (
                            <Button color="green" onClick={handleSave}>
                                Saqlash
                            </Button>
                        ) : (
                            <Button
                                color="blue"
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2"
                            >
                                <PencilSquareIcon className="w-5 h-5" />
                                Tahrirlash
                            </Button>
                        )}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
F