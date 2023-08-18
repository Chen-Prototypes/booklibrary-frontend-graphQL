import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

import { useNavigate } from "react-router-dom";

const LoginForm = ({ setToken }) => {
  const navigate = useNavigate();

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log("Could not login");
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("booklibrary-user-token", token);
      navigate("/");
    }
  }, [result.data]); // eslint-disable-line

  const submit = async (e) => {
    e.preventDefault();

    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    console.log(username, password);
    login({ variables: { username, password } });
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input name="username" />
        </div>
        <div>
          password <input type="password" name="password" />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
