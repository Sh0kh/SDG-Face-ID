import Dashboard from "../Components/Dashboard/Dashboard";
import Employees from "../Components/Employess/Employees";

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
]