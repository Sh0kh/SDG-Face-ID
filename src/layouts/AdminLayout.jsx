import { Outlet } from "react-router-dom";
import AdminHeader from "../Components/Header/AdminHeader";



export default function AdminLayout() {
    return (
        <div className="flex w-[100%] overflow-hidden pt-[80px] bg-[#EEEEEE] relative">
            <div className="w-full min-h-screen">
                <AdminHeader />
                <Outlet />
            </div>
        </div>
    )
}