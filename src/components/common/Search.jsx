import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function useDebounce(cb, delay) {
  const [debounceValue, setDebounceValue] = useState(cb);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(cb);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [cb, delay]);
  return debounceValue;
}

const Search = ({ placeholder }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const originalQuery = searchParams.get("query")?.toString();
  const [query, setQuery] = useState(originalQuery);
  const debouncedQuery = useDebounce(query, 2000);

  useEffect(() => {
    if (originalQuery === debouncedQuery) {
      return;
    }

    searchParams.set("page", 1);
    if (debouncedQuery) {
      searchParams.set("query", debouncedQuery);
      setSearchParams(searchParams);
      return;
    }

    searchParams.delete("query");
    setSearchParams(searchParams);
  }, [debouncedQuery]);

  useEffect(() => {
    if (searchParams.get("order_by")) {
      return;
    }

    searchParams.set("order_by", "price");
    setSearchParams(searchParams);
  }, []);
  const handleOrder = (event) => {
    searchParams.set("page", 1);
    if (event.target.value) {
      searchParams.set("order_by", event.target.value);
      setSearchParams(searchParams);

      return;
    }

    searchParams.delete("order_by");
  };

  return (
    <div className="search-grid">
      <input
        className="search-quick"
        placeholder={placeholder}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <select
        value={searchParams.get("order_by")?.toString()}
        onChange={handleOrder}
        className="search-select"
      >
        <option value="price">Lowest price</option>
        <option value="-price">Highest price</option>
        <option value="created_at">Oldest offers</option>
        <option value="-created_at">Latest offers</option>
      </select>
    </div>
  );
};

export default Search;
