import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BaseLayout from "components/common/BaseLayout";
import { adminRoutes } from "components/admin/routes";
import { clientRoutes } from "components/client/routes";
import NotFound from "components/NotFound";
import CacheService from "utils/CacheService";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <BaseLayout />,
      children: [{ ...adminRoutes }, { ...clientRoutes }],
    },
    // {
    //   path: "/admin/login",
    //   element: <Login />,
    // },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    // <CacheService setUserToken={setUserToken} setClientToken={setClientToken}>
    <CacheService>
      <RouterProvider router={router} />
    </CacheService>
  );
}

export default App;
