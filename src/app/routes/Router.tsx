import { useState } from "react";
import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { NavBar } from "../../Layout/NavBar/NavBar";
import PublicRoute from "./PublicRouter";
import LoadingBackdrop from "../../components/shared/LoadingBackdrop";
import { Box } from "@mui/material";
import useWebSocket from "../../hooks/useWebSocket";

const Home = lazy(() => import("../../containers/Home/Home"));
const Book = lazy(() => import("../../containers/Book/Book"));

interface Asset {
  name: string;
  bid: number;
  ask: number;
  last: number;
  timestamp: string;
}

export const AppRouter = () => {
  const [assets, setAssets] = useState<Asset[]>([]);

  // Service WebSocket
  useWebSocket(setAssets);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/home" replace />,
    },
    {
      path: "/home",
      element: (
        <PublicRoute
          element={
            <>
              <Box sx={{ marginTop: "70px" }}>
                <NavBar />
                <Home />
              </Box>
            </>
          }
        />
      ),
    },
    {
      path: "/book",
      element: (
        <PublicRoute
          element={
            <>
              <Box sx={{ marginTop: "70px" }}>
                <NavBar />
                  <Book assets={assets} />
              </Box>
            </>
          }
        />
      ),
    },
  ]);

  return (
    <Suspense fallback={<LoadingBackdrop />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};
