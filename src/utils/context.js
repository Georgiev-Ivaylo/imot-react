import ErrorCards from "components/common/ErrorCards";
import { createContext, useContext, useEffect, useState } from "react";
import { useStorage } from "utils/useStorage";

export const AuthContext = createContext();
export const AuthProvider = ({ children, isUser }) => {
  const { setItem, getItem } = useStorage();
  //   const [isUser, setIsUser] = useState(isUser);
  const [userToken, setUserToken] = useState(getItem("userToken"));
  const [clientToken, setClientToken] = useState(getItem("clientToken"));
  useEffect(() => {
    setItem("userToken", userToken);
  }, [userToken]);
  useEffect(() => {
    setItem("clientToken", clientToken);
  }, [clientToken]);

  return (
    <AuthContext.Provider
      value={{
        isUser,
        userToken,
        setUserToken,
        clientToken,
        setClientToken,
      }}
    >
      {children}
      <ErrorCards />
    </AuthContext.Provider>
  );
};

export const ErrorContext = createContext();
export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);
  return (
    <ErrorContext.Provider
      value={{
        error,
        setError,
      }}
    >
      {children}
      <ErrorCards />
    </ErrorContext.Provider>
  );
};
