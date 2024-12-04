import ErrorCards from "components/common/ErrorCards";
import ToastCards from "components/common/ToastCards";
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

export const MessageContext = createContext();
export const MessageProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [errors, setErrors] = useState([]);
  return (
    <MessageContext.Provider
      value={{
        errors,
        setErrors,
        toasts,
        setToasts,
      }}
    >
      {children}
      {errors && <ErrorCards errors={errors} setErrors={setErrors} />}
      <ToastCards />
    </MessageContext.Provider>
  );
};
