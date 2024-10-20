import MainNavigation from "components/common/navigation/MainNavigation";
import { Outlet } from "react-router-dom";

const ClientLayout = () => {
  return (
    <div className="body">
      <MainNavigation />
      <main className="base-container">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default ClientLayout;
