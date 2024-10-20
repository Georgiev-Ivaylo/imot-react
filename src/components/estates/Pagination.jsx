import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useHttpService } from "utils/HttpService";

const Pagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  let url = "/estates?get_pages=true";

  if (searchParams.get("query") !== null) {
    url += `&query=${searchParams.get("query")}`;
  }
  const { fetchData } = useHttpService(url);

  const { data: totalPages, isPending: loading } = useQuery({
    queryKey: [url],
    queryFn: async () => {
      const fullResponse = await fetchData(true);
      return fullResponse.meta.last_page;
    },
    staleTime: 1000 * 60 * 10, // cache for 10 minutes
  });

  const createPageURL = (pageNumber) => {
    searchParams.set("page", pageNumber);
    setSearchParams(searchParams);
  };

  if (totalPages <= 1) {
    return;
  }

  return (
    <div className="pag-grid">
      {currentPage >= 2 && (
        <span
          onClick={() => createPageURL(currentPage - 1)}
          className="pag-btn left-arrow"
        ></span>
      )}
      {currentPage >= 2 && (
        <span
          onClick={() => createPageURL(currentPage - 1)}
          className="pag-btn"
        >
          {" "}
          {currentPage - 1}{" "}
        </span>
      )}
      <span className="pag-btn active"> {currentPage} </span>
      {currentPage <= totalPages - 1 && (
        <span
          onClick={() => createPageURL(currentPage + 1)}
          className="pag-btn"
        >
          {" "}
          {currentPage + 1}{" "}
        </span>
      )}
      {currentPage <= totalPages - 2 && (
        <span
          onClick={() => createPageURL(currentPage + 2)}
          className="pag-btn"
        >
          {" "}
          {currentPage + 2}{" "}
        </span>
      )}
      {currentPage <= totalPages - 1 && (
        <span
          onClick={() => createPageURL(currentPage + 1)}
          className="pag-btn right-arrow"
        ></span>
      )}
    </div>
  );
};

export default Pagination;
