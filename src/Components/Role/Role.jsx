import {
    Card,
    CardBody,
    Typography,
    Button,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { $api } from "../../utils";
import { useEffect, useState } from "react";
import Loading from "../UI/Loadings/Loading";
import Task from "../UI/Icons/Tasks";
import RoleCreate from "./components/RoleCreate";
import RoleDelete from "./components/RoleDelete";
import RoleEdit from "./components/RoleEdit";
import RoleInfo from "./components/RoleInfo";


export default function Role() {
    const [RoleData, setRoleData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllRoles = async () => {
        try {
            setLoading(true);
            const response = await $api.get(`/role/getAll`, {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            });
            setRoleData(response.data?.object || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }



    useEffect(() => {
        getAllRoles();
    }, [])


    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className=" min-h-screen">
            <Card className="w-full shadow-lg p-4 mb-[20px]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Task />
                        <Typography variant="h5" color="blue-gray">
                            Lavozimlar ro'yxati
                        </Typography>
                    </div>
                    <RoleCreate refresh={getAllRoles} />
                </div>
            </Card>

            <Card className="w-full shadow-lg">
                <CardBody>
                    {RoleData.length === 0 ? (
                        <div className="text-center h-[400px] flex items-center  justify-center py-8 text-blue-gray-500 font-medium text-sm">
                            Ma'lumot yo'q
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[500px] table-auto">
                                <thead>
                                    <tr className="bg-blue-50">
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-blue-gray-700">#</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-blue-gray-700">Nomi</th>
                                        <th className="px-4 py-3 text-right text-sm font-semibold text-blue-gray-700">Amallar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {RoleData.map((role, index) => (
                                        <tr key={role.id} className="border-b hover:bg-blue-50/50 transition">
                                            <td className="px-4 py-3 text-sm text-gray-800">{index + 1}</td>
                                            <td className="px-4 py-3 text-sm text-gray-800">{role.name}</td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <RoleInfo data={role?.id} />
                                                    <RoleEdit data={role?.id} refresh={getAllRoles} />
                                                    <RoleDelete id={role.id} refresh={getAllRoles} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardBody>
            </Card>

        </div>
    );
}
