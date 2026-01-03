import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import PrivacyPolicy from "../pages/privacy-policy/page";
import Requirements from "../pages/requirements/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/requirements",
    element: <Requirements />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
