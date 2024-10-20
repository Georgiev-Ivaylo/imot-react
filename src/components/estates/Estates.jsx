import { Suspense } from "react";

import Search from "components/common/Search";
import List from "components/estates/List";
import Pagination from "components/estates/Pagination";
import ListSkeleton from "components/estates/ListSkeleton";
import { Outlet } from "react-router-dom";

const Estates = () => {
  return (
    <>
      <h1 className="title">Estates!</h1>
      <Search placeholder="Search by description..." />
      {/* <Suspense key={query + currentPage} fallback={<ListSkeleton />}> */}
      {/* <List /> */}
      {/* </Suspense> */}

      {/* <Suspense fallback={<ListSkeleton />}>
        <List />
      </Suspense> */}
      <List />
      {/* <Suspense fallback={<h1 className="title">Loading...</h1>}> */}
      <Pagination />
      {/* </Suspense> */}
      <Outlet />
    </>
  );
};

export default Estates;
