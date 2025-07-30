import {
    Card,
    CardBody,
    Typography,
    Button,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import GroupsIcon from "../UI/Icons/Groups";
import EyeIcon from "../UI/Icons/EyeIcon";
import Edit from "../UI/Icons/Edit";
import Delete from "../UI/Icons/Delete";
import GroupCreate from "./components/GroupCreate";
import { $api } from "../../utils";
import { useEffect, useState } from "react";
import Loading from "../UI/Loadings/Loading";

export default function Groups() {
    const [groupsData, setGroupsData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllGroups = async () => {
        try {
            setLoading(true);
            const response = await $api.get(`/group/getAll`);
            setGroupsData(response.data || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllGroups();
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
                        <GroupsIcon />
                        <Typography variant="h5" color="blue-gray">
                            Guruhlar ro'yxati
                        </Typography>
                    </div>
                    <GroupCreate />
                </div>
            </Card>

            <Card className="w-full shadow-lg">
                <CardBody>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[500px] table-auto">
                            <thead>
                                <tr className="bg-blue-50">
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-blue-gray-700">#</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-blue-gray-700">Nomi</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-blue-gray-700">A'zolar soni</th>
                                    <th className="px-4 py-3 text-right text-sm font-semibold text-blue-gray-700">Amallar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupsData?.map((group, index) => (
                                    <tr key={group.id} className="border-b hover:bg-blue-50/50 transition">
                                        <td className="px-4 py-3 text-sm text-gray-800">{index + 1}</td>
                                        <td className="px-4 py-3 text-sm text-gray-800">{group.name}</td>
                                        <td className="px-4 py-3 text-sm text-gray-800">{group.members} ta</td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Tooltip content="Ko'rish">
                                                    <IconButton variant="text" color="blue">
                                                        <EyeIcon size={5} />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip content="Tahrirlash">
                                                    <IconButton variant="text" color="green">
                                                        <Edit size={5} />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip content="O'chirish">
                                                    <IconButton variant="text" color="red">
                                                        <Delete size={5} />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
