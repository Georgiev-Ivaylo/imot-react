import { useContext } from "react";

import Search from "components/common/Search";
import List from "components/estates/List";
import Pagination from "components/estates/Pagination";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "utils/context";

const Estates = () => {
  const { isUser } = useContext(AuthContext);
  return (
    <>
      <h1 className="title">Estates!</h1>
      {isUser && (
        <Link to="./new" className="isolated-nav-btn">
          New
        </Link>
      )}
      <Search placeholder="Search by description..." />
      <List />
      <Pagination />
      <Outlet />
    </>
  );
};

export default Estates;
