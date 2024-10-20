import { useContext } from "react";

import { AuthContext } from "./context";

export function useUserSession() {
  const { userToken, setUserToken } = useContext(AuthContext);

  const authenticateUser = async (formData, setErrors, setLoading) => {
    await fetch(`${process.env.REACT_APP_PUBLIC_HOST}/login/user`, {
      method: "POST",
      body: formData,
    })
      .then(async function (response) {
        const data = await response.json();
        const status = response.status;
        return { data, status };
      })
      .then(function ({ data, status }) {
        setLoading(false);
        if (status !== 200) {
          setErrors(data);
          return;
        }
        setUserToken(data["data"]["token"]);
      });
  };

  return [userToken, authenticateUser];
}
