import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { BrowserRouter as Router, HashRouter, Routes, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { ItemContainer } from "./containers/item";
import Discover from "./pages/discover";
import Item from "./pages/item";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Create from "./pages/create";
import { AUTHENTICATED, NOT_AUTHENTICATED } from "./actions/action-types";
import MyList from "./pages/mylist";
import { FilterContextProvider } from "./components/menu/FilterContext";
import CreatePage from "./pages/create";
import Type from "./pages/type";
import { ToastContainer } from "react-toastify";
import MyPost from "./pages/myposts";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.authorization.loggedIn);
  async function isAuth() {
    try {
      const response = await fetch("auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      console.log(parseRes);
      parseRes.verified === true
        ? dispatch({ type: AUTHENTICATED, payload: parseRes.user })
        : dispatch({ type: NOT_AUTHENTICATED });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <>
      <FilterContextProvider>
        <HashRouter>
          {/* <ScrollToTop/> */}
          <Routes>
            <Route path={ROUTES.HOME} element={<Discover />}></Route>
            <Route path={`watch/:id`} element={<Item />}></Route>
            <Route path={`read/:id`} element={<Item />}></Route>
            <Route path={`play/:id`} element={<Item />}></Route>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGNUP} element={<Signup />} />
            <Route path={ROUTES.CREATE} element={<CreatePage />} />
            <Route path={ROUTES.POSTS} element={<MyPost/>}/>
            <Route
              path="/my-list"
              element={isLoggedIn ? <MyList /> : <Login />}
            />
            <Route path={`:id`} element={<Type/>}/>
          </Routes>
        </HashRouter>
      </FilterContextProvider>
    </>
  );
}

export default App;
