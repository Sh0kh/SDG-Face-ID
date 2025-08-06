import Dashboard from "../Components/Dashboard/Dashboard";
import Department from "../Components/Department/Department";
import Employees from "../Components/Employess/Employees";
import Report from "../Components/Report/Report";
import Schedules from "../Components/Schedules/Schedules";
import SchedulesDefault from "../Components/Schedules/SchedulesDefault";
import Timeoff from "../Components/Timeoff/Timeoff";

export const routes = [
    {
        name: "Dashboard",
        path: "/",
        component: <Dashboard />,
    },
      {
        name: "Employees",
        path: "/employees",
        component: <Employees />,
    },
       {
        name: "Schedules",
        path: "/schedules",
        component: <Schedules />,
    },
     {
        name: "Schedules",
        path: "/schedules/:ID",
        component: <SchedulesDefault />,
    },
     {
        name: "Report",
        path: "/reports",
        component: <Report />,
    },
    {
        name: "Timeoff",
        path: "/timeoff",
        component: <Timeoff />,
    },
    {
        name: "department",
        path: "/department",
        component: <Department />,
    },
    
]