import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, MessageContext } from "utils/context";

export function useHttpConfiguration() {
  let url = process.env.REACT_APP_PUBLIC_HOST;
  const { isUser, userToken, clientToken, setUserToken, setClientToken } =
    useContext(AuthContext);
  const { errors, setErrors } = useContext(MessageContext);
  let headers = {
    "Content-Type": "application/json",
  };

  if (isUser) {
    url += "/admin";
    headers.Authorization = `Bearer ${userToken}`;
  } else if (clientToken) {
    headers.Authorization = `Bearer ${clientToken}`;
  }

  const customAxios = axios.create({
    baseURL: url,
    timeout: 5000,
    headers: headers,
  });

  // Adding global error handling interceptor
  customAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // console.error(
        //   "Response error:",
        //   error.response.status,
        //   error.response.data
        // );
        if (error.response.status === 419) {
          if (isUser) {
            setUserToken(null);
          } else {
            setClientToken(null);
          }
        }
        setErrors([...errors, error.response.data]);
        return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        // console.error("Request error:", error.request);
        setErrors([...errors, { message: "Something went wrong..." }]);
      } else {
        // Something happened in setting up the request that triggered an error
        // console.error("Error:", error.message);
        setErrors([
          ...errors,
          { message: "Something unexpected went wrong..." },
        ]);
      }
      // return {};
      return { data: {} };
      // return Promise.reject(error);
    }
  );

  return customAxios;
}

export function useHttpService(pathname) {
  const apiCaller = useHttpConfiguration();
  const { toasts, setToasts } = useContext(MessageContext);
  let newToasts = toasts;
  const navigate = useNavigate();

  const fetchData = async (isMetaRequired = false) => {
    const response = await apiCaller.get(pathname);

    if (isMetaRequired) {
      return response.data;
    }
    return response.data.data;
  };

  const createRecord = async (data, isNotPendingData = true) => {
    const response = await apiCaller.post(pathname, data);

    if (response.status === 200 && isNotPendingData) {
      newToasts.push(response.data);
      setToasts(newToasts);
      navigate(-1);
    }
    return response.data.data;
  };

  const editRecord = async (data, extraPath) => {
    const response = await apiCaller.put(pathname + extraPath, {
      data: data,
    });

    if (response.status === 200) {
      newToasts.push(response.data);
      setToasts(newToasts);
      navigate(-1);
    }
    return response.data.data;
  };

  const deleteRecord = async () => {
    const response = await apiCaller.delete(pathname);

    if (response.status === 200) {
      newToasts.push(response.data);
      setToasts(newToasts);
      navigate(-1);
    }
    return response.data.data;
  };

  return { fetchData, createRecord, editRecord, deleteRecord };
}
