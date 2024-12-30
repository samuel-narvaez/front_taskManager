import { createBrowserRouter } from "react-router-dom";
import  App  from "./App";
import Login from "./pages/auth/Login";
import Tasks from "./pages/task/Task";
export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                path: "",
                Component: Login
            },
            {
                path: "tasks",
                Component: Tasks
            }
        ]
    }
])