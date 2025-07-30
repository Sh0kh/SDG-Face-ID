import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar/Sidebar";
import AdminHeader from "../Components/Header/AdminHeader";



export default function AdminLayout() {
    return (
        <div className="flex w-[100%] overflow-hidden pt-[100px] pr-[20px] bg-[#FAFAFA] relative">
            <Sidebar />
            <div className="ml-[320px] mt-[10px] w-full min-h-screen">
                <AdminHeader />
                <Outlet />
            </div>
        </div>
    )
}