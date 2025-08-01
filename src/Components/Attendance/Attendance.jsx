import { useEffect, useState } from "react";
import { $api } from "../../utils";
import {
    Card,
    Typography,
    Select,
    Option,
    Button,
    Input,
    Tabs,
    TabsHeader,
    Tab,
    TabsBody,
    TabPanel,
    Avatar,
} from "@material-tailwind/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ClockIcon, UserCircleIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import Loading from "../UI/Loadings/Loading";

export default function Attendance() {
    const [attendanceData, setAttendanceData] = useState([]);
    const [filter, setFilter] = useState("haftalik");
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("jadval");
    const [loading, setLoading] = useState(true);

    // Format date from array [2025, 7, 30] to "2025-07-30"
    const formatDate = (dateArray) => {
        if (!dateArray || dateArray.length < 3) return "Noma'lum";
        const [year, month, day] = dateArray;
        return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    };

    // Format time from array [9, 30] to "09:30"
    const formatTime = (timeArray) => {
        if (!timeArray || timeArray.length < 2) return "Noma'lum";
        const [hours, minutes] = timeArray;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    };

    // Translate status
    const translateStatus = (status) => {
        switch (status) {
            case "CAME": return "Kelgan";
            case "LATE": return "Kechikkan";
            case "ABSENT": return "Kelmagan";
            default: return status;
        }
    };

    // Get status color
    const getStatusColor = (status) => {
        switch (status) {
            case "CAME": return "green";
            case "LATE": return "orange";
            case "ABSENT": return "red";
            default: return "blue";
        }
    };

    const getAllAttendanceByUser = async () => {
        try {
            setLoading(true);
            const response = await $api.get("/attendance/getAll?page=0&size=10", {
                headers: {
                    "ngrok-skip-browser-warning": "true"
                }
            });

            if (response.data && response.data.object?.content) {
                setAttendanceData(response.data.object?.content);
            }
        } catch (error) {
            console.error("Xatolik: Davomat ma'lumotlarini olishda:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllAttendanceByUser();
    }, []);

    // Prepare chart data
    const prepareChartData = () => {
        const daysOfWeek = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];

        // Group by day of week
        const groupedData = attendanceData.reduce((acc, record) => {
            const date = new Date(...record.data);
            const dayOfWeek = daysOfWeek[date.getDay()];

            if (!acc[dayOfWeek]) {
                acc[dayOfWeek] = { kelgan: 0, kechikkan: 0, kelmagan: 0 };
            }

            if (record.status === "CAME") acc[dayOfWeek].kelgan++;
            else if (record.status === "LATE") acc[dayOfWeek].kechikkan++;
            else acc[dayOfWeek].kelmagan++;

            return acc;
        }, {});

        return daysOfWeek.map(day => ({
            name: day,
            kelgan: groupedData[day]?.kelgan || 0,
            kechikkan: groupedData[day]?.kechikkan || 0,
            kelmagan: groupedData[day]?.kelmagan || 0,
        }));
    };

    const chartData = prepareChartData();

    // Calculate summary statistics
    const summaryStats = attendanceData.reduce((acc, record) => {
        if (record.status === "CAME") acc.kelgan++;
        else if (record.status === "LATE") acc.kechikkan++;
        else acc.kelmagan++;
        return acc;
    }, { kelgan: 0, kechikkan: 0, kelmagan: 0 });

    const filteredData = attendanceData.filter(item =>
        item.userId.toString().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <div className="pb-6">
            <Typography variant="h3" color="blue-gray" className="mb-6">
                Davomat Monitoringi
            </Typography>



            <Tabs value={activeTab} className="mb-6">
                <TabsHeader>
                    <Tab value="jadval" onClick={() => setActiveTab("jadval")}>
                        Jadval ko'rinishi
                    </Tab>
                    <Tab value="statistika" onClick={() => setActiveTab("statistika")}>
                        Statistika
                    </Tab>
                </TabsHeader>
                <TabsBody>
                    <TabPanel value="jadval">
                        <Card className="overflow-scroll">
                            <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                    <tr>
                                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                                Xodim ID
                                            </Typography>
                                        </th>
                                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                                Sana
                                            </Typography>
                                        </th>
                                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                                Kelish vaqti
                                            </Typography>
                                        </th>
                                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                                Ketish vaqti
                                            </Typography>
                                        </th>
                                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                            <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                                Holati
                                            </Typography>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((item, index) => (
                                        <tr key={index} className="even:bg-blue-gray-50/50">
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <Avatar
                                                        src={`https://ui-avatars.com/api/?name=User+${item.userId}&background=random`}
                                                        size="sm"
                                                    />
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {item.userId}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <CalendarDaysIcon className="h-4 w-4" />
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {formatDate(item.data)}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <ClockIcon className="h-4 w-4" />
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {formatTime(item.checkInTime)}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <ClockIcon className="h-4 w-4" />
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {item.checkOutTime ? formatTime(item.checkOutTime) : "Kelmagan"}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <Typography
                                                    variant="small"
                                                    color={getStatusColor(item.status)}
                                                    className="font-normal"
                                                >
                                                    {translateStatus(item.status)}
                                                </Typography>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Card>
                    </TabPanel>
                    <TabPanel value="statistika">
                        <Card className="p-4">
                            <Typography variant="h5" color="blue-gray" className="mb-4">
                                Davomat statistikasi (haftalik)
                            </Typography>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={chartData}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="kelgan" fill="#4CAF50" name="Kelganlar" />
                                        <Bar dataKey="kechikkan" fill="#FFC107" name="Kechikkanlar" />
                                        <Bar dataKey="kelmagan" fill="#F44336" name="Kelmaganlar" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </TabPanel>
                </TabsBody>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card className="p-4 bg-green-50">
                    <Typography variant="h6" color="green">
                        Kelgan xodimlar
                    </Typography>
                    <Typography variant="h3" color="green">
                        {summaryStats.kelgan}
                    </Typography>
                    <Typography variant="small" color="green">
                        Jami yozuvlar: {attendanceData.length}
                    </Typography>
                </Card>
                <Card className="p-4 bg-amber-50">
                    <Typography variant="h6" color="amber">
                        Kechikkan xodimlar
                    </Typography>
                    <Typography variant="h3" color="amber">
                        {summaryStats.kechikkan}
                    </Typography>
                    <Typography variant="small" color="amber">
                        {attendanceData.length > 0 ?
                            `${Math.round((summaryStats.kechikkan / attendanceData.length) * 100)}%` :
                            "0%"}
                    </Typography>
                </Card>
                <Card className="p-4 bg-red-50">
                    <Typography variant="h6" color="red">
                        Kelmagan xodimlar
                    </Typography>
                    <Typography variant="h3" color="red">
                        {summaryStats.kelmagan}
                    </Typography>
                    <Typography variant="small" color="red">
                        Oxirgi haftada
                    </Typography>
                </Card>
            </div>
        </div>
    );
}