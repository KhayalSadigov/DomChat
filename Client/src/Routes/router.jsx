import { createBrowserRouter } from "react-router-dom";
import Main from "../Pages/Main";
import Loginpage from "../Pages/Loginpage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "",
        element: <Loginpage />,
      },
    ],
  },
]);

export default router;
