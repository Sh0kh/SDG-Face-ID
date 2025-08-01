import {
    Card,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import GroupsIcon from "../UI/Icons/Groups";
import { $api } from "../../utils";
import { useEffect, useState } from "react";
import Loading from "../UI/Loadings/Loading";
import User from "../UI/Icons/User";
import UserCreate from "./components/UserCreate";
import UserDelete from "./components/UserDelete";
import UserInfo from "./components/UserInfo";
import UserEdit from "./components/UserEdit";

export default function Users() {
    const [UserData, setUserData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 10;

    const getAllUser = async (page = 0) => {
        try {
            setLoading(true);
            const response = await $api.get(`/user/getAll?page=${page}&size=${pageSize}`, {
                headers: { 'ngrok-skip-browser-warning': 'true' }
            });
            const result = response.data?.object;
            setUserData(result?.content || []);
            setTotalPages(result?.totalPages || 0);
            setCurrentPage(result?.number || 0);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllUser(currentPage);
    }, []);

    const handlePrevPage = () => {
        if (currentPage > 0) {
            getAllUser(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            getAllUser(currentPage + 1);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="min-h-screen">
            <Card className="w-full shadow-lg p-4 mb-[20px]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <User />
                        <Typography variant="h5" color="blue-gray">
                            Xodimlar ro'yxati
                        </Typography>
                    </div>
                    <UserCreate refresh={() => getAllUser(currentPage)} />
                </div>
            </Card>

            <Card className="w-full shadow-lg">
                <CardBody>
                    {UserData.length === 0 ? (
                        <div className="text-center h-[400px] flex items-center justify-center py-8 text-blue-gray-500 font-medium text-sm">
                            Ma'lumot yo'q
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[500px] table-auto">
                                <thead>
                                    <tr className="bg-blue-50">
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-blue-gray-700">#</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-blue-gray-700">Ismi</th>
                                        <th className="px-4 py-3 text-right text-sm font-semibold text-blue-gray-700">Amallar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {UserData.map((user, index) => (
                                        <tr key={user.id} className="border-b hover:bg-blue-50/50 transition">
                                            <td className="px-4 py-3 text-sm text-gray-800">
                                                {currentPage * pageSize + index + 1}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-800">{user.username}</td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <UserInfo data={user} />
                                                    <UserEdit data={user} refresh={() => getAllUser(currentPage)} />
                                                    <UserDelete id={user.id} refresh={() => getAllUser(currentPage)} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Pagination Controls */}
                            <div className="flex justify-end mt-6 gap-4">
                                <Button
                                    variant="outlined"
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 0}
                                >
                                    Oldingi
                                </Button>
                                <Typography color="blue-gray" className="flex items-center">
                                    Sahifa {currentPage + 1} / {totalPages}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    onClick={handleNextPage}
                                    disabled={currentPage >= totalPages - 1}
                                >
                                    Keyingi
                                </Button>
                            </div>
                        </div>
                    )}
                </CardBody>
            </Card>
        </div>
    );
}
