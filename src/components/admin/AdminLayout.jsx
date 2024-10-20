import { Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";

import AdminNavigation from "../common/navigation/AdminNavigation";
import { AuthContext } from "../../utils/context";
import Login from "./Login";

// export const metadata = {
//   title: "Administration",
//   description: "Manage estates",
// };

const AdminLayout = () => {
  const { userToken } = useContext(AuthContext);

  return (
    <div className="body-admin">
      <AdminNavigation />
      <main className="side-base-container">
        {userToken && <Outlet />}
        {!userToken && <Login />}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default AdminLayout;
