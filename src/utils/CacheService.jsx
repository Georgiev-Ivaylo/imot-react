import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const CacheService = ({ children, setUserToken, setClientToken }) => {
  const cacheService = new QueryClient({
    // queryCache: new QueryCache({
    //   onError: (error) => {
    //     if (!error.response || error.response.status === 401) {
    //       cacheService.cancelQueries();
    //       setUserToken(null);
    //       setClientToken(null);
    //     }
    //   },
    // }),
    // mutationCache: new MutationCache({
    //   onError: (error, _, __, mutation) => {
    //     // cache-level mutations error handler
    //     // const { mutationKey } = mutation.options;
    //     // toast.error(`API Mutation Error ${mutationKey ? `: ${mutation}` : ""}`)
    //     console.log("Mutation: ", error);
    //   },
    // }),
  });
  return (
    <QueryClientProvider client={cacheService}>{children}</QueryClientProvider>
  );
};
export default CacheService;
