import { Outlet } from "react-router-dom";

import { ErrorProvider } from "../../utils/context";

const BaseLayout = () => {
  return (
    <>
      <ErrorProvider>
        <Outlet />
      </ErrorProvider>
    </>
  );
};

export default BaseLayout;
