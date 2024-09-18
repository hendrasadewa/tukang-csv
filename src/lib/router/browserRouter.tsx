import { createBrowserRouter } from "react-router-dom";
import { AppTemplate } from "@/lib/components/AppTemplate";
import { FilesPage } from "@/routes";

export const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppTemplate />,
    children: [
      {
        path: "/",
        element: <>Hello</>,
      },
      {
        path: "/files",
        element: <FilesPage />,
      },
    ],
  },
]);
