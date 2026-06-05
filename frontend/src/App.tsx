import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Landing from "./page/Landing";
import Register from "./page/Register";
import Login from "./page/Login";

import DashBoard from "./page/DashBoard";
import Habits from "./page/Habits";

import DashboardLayout from "./layout/DashboardLayout";
import Insights from "./page/Insights";

const router = createBrowserRouter([
  {
    path: "/landing",
    element: <Landing />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "dashboard",
        element: <DashBoard />,
      },
      {
        path: "habits",
        element: <Habits />,
      },
      {
        path:"insights",
        element:<Insights/>
      }
    ],
  },

  {
    path: "/",
    element: <Navigate to="/landing" replace />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;