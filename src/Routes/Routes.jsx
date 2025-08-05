import Dashboard from "../Components/Dashboard/Dashboard";
import Employees from "../Components/Employess/Employees";
import Schedules from "../Components/Schedules/Schedules";
import SchedulesDefault from "../Components/Schedules/SchedulesDefault";

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
    
]