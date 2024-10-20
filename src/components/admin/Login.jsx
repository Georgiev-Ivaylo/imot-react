import { useState } from "react";

import Input from "../common/form/Input";
import { useUserSession } from "../../utils/auth";

const Login = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [userToken, authenticateUser] = useUserSession();
  // const { userToken: sessionUserToken } = useUserSession();
  console.log(userToken);

  function onSubmit(event) {
    event.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    setErrors({});

    const formData = new FormData(event.currentTarget);

    authenticateUser(formData, setErrors, setLoading);
  }

  return (
    <>
      <h1 className="title">Welcome back</h1>
      <form onSubmit={onSubmit} className="form">
        <Input
          type="email"
          name="email"
          error_msg={errors.data && errors.data.email}
        />
        <Input
          type="password"
          name="password"
          error_msg={errors.data && errors.data.password}
        />
        <button type="submit" className="form-btn">
          {loading ? "Loading" : "Login"}
        </button>
      </form>
      {errors && <p className="description-error">{errors.message}</p>}
    </>
  );
};

export default Login;
