import { useEffect, useState } from "react";
import MiniSideBarCrud from "../MiniSidebar/MiniSideBarCrud";
import DepartmenCreate from "./components/DepartmentCreate";
import { $api } from "../../utils";
import Loading from "../UI/Loadings/Loading";
import { FiEdit, FiTrash2 } from "react-icons/fi"; // Иконки
import Delete from "../UI/Icons/Delete";
import Edit from "../UI/Icons/Edit";
import DepartmentDelete from "./components/DepartmentDelete";
import DepartmentEdit from "./components/DepartmentEdit";


export default function Department() {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllDepartments = async () => {
        try {
            setLoading(true);
            const response = await $api.get("/group/getAll", {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            });
            setDepartments(response.data?.object);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllDepartments();
    }, [])

    if (loading) {
        return (
            <Loading />
        )
    }


    return (
        <div className="Container">
            <div className="flex gap-4 p-4">
                {/* Chap menyu */}
                <MiniSideBarCrud />
                {/* O'ng kontent */}
                <div className="flex-1 bg-white rounded-[5px] shadow-sm ">
                    <div className="flex items-center justify-between  p-3">
                        <div className="text-[18px] font-normal text-[#424242]">Bo`limlar</div>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Foydalanuvchining to‘liq ismi"
                                className="border border-[#e0e0e0] rounded px-4 py-2 text-[15px] outline-none bg-white"
                                style={{ width: 260 }}
                            />
                            <DepartmenCreate refresh={getAllDepartments} />
                        </div>
                    </div>
                    <div className=" border border-[#ededeb] overflow-hidden">
                        <table className="w-full text-[15px]">
                            <thead>
                                <tr className="bg-[#f7f7f7] text-[#bdbdbd]">
                                    <th className="px-6 py-3 text-left font-normal">Nomi</th>
                                    <th className="px-6 py-3 text-left font-normal">Xodimlar soni</th>
                                    <th className="px-6 py-3 text-left font-normal"></th>
                                </tr>
                            </thead>

                            <tbody>
                                {departments?.length > 0 ? (
                                    departments.map((department) => (
                                        <tr
                                            key={department.id}
                                            className="group hover:bg-[#f9f9f9] transition-colors duration-200"
                                        >
                                            <td className="border-b-[2px] border-[#ededeb] py-[10px]">
                                                <div className="px-6 py-3 text-[#424242]">
                                                    {department.name}
                                                </div>
                                            </td>
                                            <td className="border-b-[2px] border-[#ededeb] py-[10px]">
                                                <div className="px-6 py-3 text-[#424242]">0</div>
                                            </td>
                                            <td className="border-b-[2px] border-[#ededeb] py-[10px]">
                                                <div className="px-6 py-3 text-[#424242] flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                    <DepartmentEdit data={department} refresh={getAllDepartments}/>
                                                    <DepartmentDelete id={department?.id} refresh={getAllDepartments} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3}>
                                            <div className="py-8 text-center italic text-[#424242] text-[17px]">
                                                Qo‘shimcha dam olish haqida ma’lumot yo‘q. Qo‘shimcha dam olish qo‘shish
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            <div className="w-full px-[25px] py-[25px]">
                                <span>
                                    Bo`limlar jami {departments?.length}
                                </span>
                            </div>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}