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

const Home = lazy(() => import("../../containers/Home/Home"));
const Book = lazy(() => import("../../containers/Book/Book"));
const Plot = lazy(() => import("../../containers/Plot/Plot"));

interface Asset {
  name: string;
  bid: number;
  ask: number;
  last: number;
  timestamp: string;
}

export const AppRouter = () => {
  const [assets, setAssets] = useState<Record<string, Asset[]>>({
    WTI: [],
    YPF: [],
    SOY: [],
    SP500: [],
  });


  // Filter assets to get only those that are WTI
  const assetWTI = assets["WTI"];

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
    // Shows all assets with their Bid, Last, Ask data
    {
      path: "/book",
      element: (
        <PublicRoute
          element={
            <>
              <Box sx={{ marginTop: "70px" }}>
                <NavBar />
                <Book assets={assets} setAssets={setAssets}/>
              </Box>
            </>
          }
        />
      ),
    },
    // Shows time series chart of WTI asset
    {
      path: "/plot",
      element: (
        <PublicRoute
          element={
            <>
              <Box sx={{ marginTop: "70px" }}>
                <NavBar />
                {assets.WTI.length > 0 ? (
                  <Plot
                    name="WTI"
                    lastValues={assetWTI.map((asset) => ({
                      timestamp: asset.timestamp,
                      last: asset.last,
                    }))}
                  />
                ) : (
                  <Box>No asset available</Box>
                )}
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
