import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Form from "../components/form";
import { AUTHENTICATED, NOT_AUTHENTICATED } from "../actions/action-types";
import { useNavigate } from "react-router";
import * as ROUTES from "../constants/routes";

export default function Signup({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { email, password, username } = inputs;

  const onChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password, username };
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      console.log(parseRes, response);
      if (response.ok === true) {
        localStorage.setItem("token", parseRes.token);
        dispatch({ type: AUTHENTICATED, payload: parseRes.authUser });
        navigate(ROUTES.HOME);
      }
    } catch (err) {
      console.error(err.message);
      dispatch({ type: NOT_AUTHENTICATED });
    }
  };
  return (
    <>
      <Form>
        <Form.Title>Sign Up</Form.Title>
        <Form.Base onSubmit={onSubmitForm}>
          <Form.Input
            placeholder="username"
            name="username"
            value={username}
            onChange={(e) => onChangeHandler(e)}
          ></Form.Input>
          <Form.Input
            type="email"
            placeholder="email address"
            name="email"
            value={email}
            onChange={(e) => onChangeHandler(e)}
          ></Form.Input>
          <Form.Input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={(e) => onChangeHandler(e)}
          ></Form.Input>
          <Form.Submit type="submit">Sign Up</Form.Submit>
        </Form.Base>
        <Form.Text>
          Already from around here?
          <Form.Link to="/login"> Welcome back.</Form.Link>
        </Form.Text>
      </Form>
    </>
  );
}
