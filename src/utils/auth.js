import { useContext } from "react";

import { AuthContext } from "./context";
import { useHttpService } from "utils/HttpService";

export function useUserSession() {
  const { userToken, setUserToken } = useContext(AuthContext);
  const { createRecord } = useHttpService("/login");

  const authenticateUser = async (formData, setErrors, setLoading) => {
    const data = await createRecord(formData, false);
    setLoading(false);
    if (!data["token"]) {
      setErrors(data);
      return;
    }

    setUserToken(data["token"]);
  };

  return [userToken, authenticateUser];
}
