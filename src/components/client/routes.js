import Home from "components/client/Home";
import ClientLayout from "components/client/ClientLayout";
import Estate from "components/estates/estate/Estate";
import Estates from "components/estates/Estates";
import { AuthProvider } from "utils/context";

export const clientRoutes = {
  path: "/",
  // parent route component
  element: (
    <AuthProvider isUser={false}>
      <ClientLayout />
    </AuthProvider>
  ),
  // child route components
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/estates",
      element: <Estates />,
    },
    {
      path: "/estates/:estateId",
      element: <Estate />,
    },
  ],
};
