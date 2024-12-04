import { useState } from "react";

import Input from "../common/form/Input";
import { useUserSession } from "../../utils/auth";

const Login = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [userToken, authenticateUser] = useUserSession();

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
          label="Email"
          type="email"
          name="email"
          error_msg={errors?.email}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          error_msg={errors?.password}
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
