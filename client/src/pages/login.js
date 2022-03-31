import React, { useState } from "react";
import Form from "../components/form";
import { useDispatch } from "react-redux";
import { AUTHENTICATED, NOT_AUTHENTICATED } from "../actions/action-types";
import { useNavigate } from "react-router";
import * as ROUTES from "../constants/routes";

export default function Login({ children }) {
  const redirectLocation = window.location.href;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const { username, password } = inputs;
  const onChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { username, password };
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      if (response.ok === true) {
        localStorage.setItem("token", parseRes.token);
        dispatch({ type: AUTHENTICATED, payload: parseRes.authUser });
        redirectLocation.includes("my-list")
          ? navigate("/my-list")
          : navigate(ROUTES.HOME);
      }
    } catch (err) {
      console.error(err.message);
      dispatch({ type: NOT_AUTHENTICATED });
    }
  };
  return (
    <>
      <Form>
        <Form.Title>Log In</Form.Title>
        <Form.Base onSubmit={onSubmitForm}>
          <Form.Input
            placeholder="username"
            name="username"
            value={username}
            onChange={onChangeHandler}
          ></Form.Input>
          <Form.Input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={onChangeHandler}
          ></Form.Input>
          <Form.Submit type="submit">Log In</Form.Submit>
        </Form.Base>
        <Form.Text>
          First time here?<Form.Link to="/signup"> Join us.</Form.Link>
        </Form.Text>
      </Form>
    </>
  );
}
