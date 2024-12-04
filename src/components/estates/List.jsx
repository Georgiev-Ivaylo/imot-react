import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import ListSkeleton from "components/estates/ListSkeleton";
import { AuthContext } from "utils/context";
import { useHttpService } from "utils/HttpService";
import ListItem from "components/estates/ListItem";

const List = () => {
  const [searchParams] = useSearchParams();
  const { isUser, userToken, clientToken } = useContext(AuthContext);

  let url = `/estates?page=${searchParams.get("page")}`;

  if (searchParams.get("query")) {
    url += "&query=" + searchParams.get("query");
  }

  if (searchParams.get("order_by")) {
    url += "&order_by=" + searchParams.get("order_by");
  }

  const { fetchData } = useHttpService(url);

  const {
    data: estates,
    error,
    isPending: loading,
  } = useQuery({
    queryKey: [url, userToken],
    queryFn: () => fetchData(),
    staleTime: 1000 * 60 * 10, // cache for 10 minutes
  });

  if (loading) {
    return <ListSkeleton />;
  }

  if (!estates || estates.length == 0) {
    return;
  }

  let pageItems = estates.map((estate) => (
    <ListItem estate={estate} key={estate.id} isUser={isUser} />
  ));
  if (estates.length <= 8) {
    for (let i = 0; i < 9 - estates.length; ++i) {
      pageItems.push(
        <ListItem
          key={`estate-fantom-${i}`}
          estate={{}}
          fantomKey={`fantom_${i}`}
          isHidden={true}
        />
      );
    }
  }

  return <ul className="box-grid">{pageItems}</ul>;
};

export default List;
