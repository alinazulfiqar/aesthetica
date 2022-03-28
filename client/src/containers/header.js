import React, { useState, useContext } from "react";
import Header from "../components/header";
import user from "../images/user.svg";
import * as ROUTES from "../constants/routes";
import heart from "../images/heart.svg";
import logout from "../images/logout.svg";
import { useDispatch, useSelector } from "react-redux";
import login from "../images/login.svg";
import { NOT_AUTHENTICATED } from "../actions/action-types";
import hamburger from "../images/hamburger.svg"
import close from "../images/close.svg"
import { FilterContext } from "../components/menu/FilterContext";
import addIcon from "../images/addIcon.svg"
import logo from "../images/logo.svg"
import logo2 from "../images/logo2.svg"

export default function HeaderContainer({ children }) {

  const {hideMenu, setHideMenu} = useContext(FilterContext)
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.authorization.loggedIn);
  const [showBar, setShowBar] = useState(false);
  // const userHandler = () => {
  //   setShowBar(!showBar);
  // };

  const logOutHandler = () => {
    if (authStatus) {
      localStorage.removeItem("token");
      dispatch({ type: NOT_AUTHENTICATED });
    }
  };


  return (
    <Header>
      {children}
      <Header.Icon src={user} onClick={()=> setShowBar(!showBar)} />
      <Header.Bar showBar={showBar}>
        <Header.BarLink>
          <Header.LinkIcon src={authStatus ? logout : login} />
          <Header.Text
            to={!authStatus ? ROUTES.LOGIN : ROUTES.HOME}
            onClick={() => logOutHandler()}
          >
            {authStatus ? "Log Out" : "Log In"}
          </Header.Text>
        </Header.BarLink>
        <Header.BarLink>
          <Header.LinkIcon src={heart} />
          <Header.Text to={ROUTES.LIST}>My List</Header.Text>
        </Header.BarLink>
        <Header.BarLink>
          <Header.LinkIcon src={addIcon} />
          <Header.Text to={ROUTES.CREATE}>Create New</Header.Text>
        </Header.BarLink>
        <Header.BarLink>
          <Header.LinkIcon src={heart} />
          <Header.Text to={ROUTES.POSTS}>My Posts</Header.Text>
        </Header.BarLink>
      </Header.Bar>
      <Header.Icon src={hideMenu ? hamburger : close} onClick={()=> {
        setHideMenu(!hideMenu)
        }} 
      ></Header.Icon>
      
    </Header>
  );
}
