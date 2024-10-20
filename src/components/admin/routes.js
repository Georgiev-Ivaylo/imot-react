import Account from "components/admin/account/Account";
import AdminLayout from "components/admin/AdminLayout";
import Dashboard from "components/admin/Dashboard";
import Estate from "components/estates/estate/Estate";
import EstateDelete from "components/estates/estate/EstateDelete";
import EstateManage from "components/estates/estate/EstateManage";
import Estates from "components/estates/Estates";
import { AuthProvider } from "utils/context";

export const adminRoutes = {
  path: "/admin",
  // parent route component
  element: (
    <AuthProvider isUser={true}>
      <AdminLayout />
    </AuthProvider>
  ),
  // child route components
  children: [
    {
      path: "/admin/",
      element: <Dashboard />,
    },
    {
      path: "/admin/estates",
      element: <Estates />,
      children: [
        {
          path: "/admin/estates/new",
          element: <EstateManage />,
        },
        {
          path: "/admin/estates/:estateId",
          element: <Estate />,
        },
        {
          path: "/admin/estates/:estateId/edit",
          element: <EstateManage />,
        },
        {
          path: "/admin/estates/:estateId/delete",
          element: <EstateDelete />,
        },
      ],
    },
    {
      path: "/admin/account",
      element: <Account />,
    },
  ],
};
