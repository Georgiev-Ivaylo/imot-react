import axios from "axios";
import { useContext } from "react";
import { AuthContext, ErrorContext } from "utils/context";

export function useHttpConfiguration() {
  let url = process.env.REACT_APP_PUBLIC_HOST;
  const { isUser, userToken, clientToken, setUserToken, setClientToken } =
    useContext(AuthContext);
  const { error, setError } = useContext(ErrorContext);
  let headers = {
    "Content-Type": "application/json",
  };

  if (isUser) {
    url += "/admin";
    headers.Authorization = `Bearer ${userToken}`;
  } else if (clientToken) {
    headers.Authorization = `Bearer ${clientToken}`;
  }
  console.log(headers);

  // return { url, headers };

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
        console.error(
          "Response error:",
          error.response.status,
          error.response.data
        );
        if (error.response.status === 419) {
          if (isUser) {
            setUserToken(null);
          } else {
            setClientToken(null);
          }
        }
        setError(error.response);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request error:", error.request);
        setError({ data: { message: "Something went wrong..." } });
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error:", error.message);
        setError({ data: { message: "Something unexpected went wrong..." } });
      }
      return { data: {} };
      // return Promise.reject(error);
    }
  );

  return customAxios;
}

export function useHttpService(pathname) {
  // const { url, headers } = useHttpConfiguration(pathname);
  const apiCaller = useHttpConfiguration();

  // const fetchData = async (isMetaRequired = false) => {
  //   const response = await axios.get(url, {
  //     headers: headers,
  //   });

  //   if (isMetaRequired) {
  //     return response.data;
  //   }
  //   return response.data.data;
  // };

  // const createRecord = async (data) => {
  //   const response = await axios.post(url, {
  //     headers: headers,
  //     data: data,
  //   });
  //   return response.data.data;
  // };

  // const editRecord = async (data) => {
  //   const response = await axios.put(url, {
  //     headers: headers,
  //     data: data,
  //   });
  //   return response.data.data;
  // };

  // const deleteRecord = async () => {
  //   const response = await axios.delete(url, {
  //     headers: headers,
  //   });

  //   return response.data.data;
  // };

  const fetchData = async (isMetaRequired = false) => {
    const response = await apiCaller.get(pathname);

    if (isMetaRequired) {
      return response.data;
    }
    return response.data.data;
  };

  const createRecord = async (data) => {
    const response = await apiCaller.post(pathname, {
      data: data,
    });
    return response.data.data;
  };

  const editRecord = async (data) => {
    const response = await apiCaller.put(pathname, {
      data: data,
    });
    return response.data.data;
  };

  const deleteRecord = async () => {
    const response = await apiCaller.delete(pathname);

    return response.data.data;
  };

  return { fetchData, createRecord, editRecord, deleteRecord };
}
