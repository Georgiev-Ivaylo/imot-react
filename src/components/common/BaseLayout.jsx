import { Outlet } from "react-router-dom";

import { MessageProvider } from "../../utils/context";

const BaseLayout = () => {
  return (
    <MessageProvider>
      <Outlet />
    </MessageProvider>
  );
};

export default BaseLayout;
