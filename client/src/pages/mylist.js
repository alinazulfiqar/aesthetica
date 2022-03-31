import React, { useState, useEffect } from "react";
import HeaderContainer from "../containers/header";
import { MenuContainer } from "../containers/menu";
import Discover from "../components/discover/index";
import * as ROUTES from "../constants/routes";
import book from "../images/book.svg";
import add from "../images/add.svg";
import watch from "../images/watch.svg";
import play from "../images/play.svg";
import remove from "../images/remove.svg"

import { useSelector } from "react-redux";

export default function MyList({ children }) {
  const [type, setType] = useState("");
  const [content, setContent] = useState([]);
  const [contentUpdated, setContentUpdated] = useState(false)
  const currentUser = useSelector((state) =>
    state.authorization.currentUser.userID
      ? state.authorization.currentUser.userID
      : state.authorization.currentUser
  );
  const listHandler = async () => {
    try {
      const res = await fetch("/my-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentUser: currentUser }),
      });
      const parseRes = await res.json();
      setContent(parseRes);
      setContentUpdated(false)
    } catch (err) {
      console.error(err.message);
    }
  };

  const removeFromListHandler = async (id)=> {
    try {
      const res = await fetch ("/my-list/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({currentUser: currentUser, contentID: id})
      })
      const parseRes = res.json()
      setContentUpdated(true)
      
      
    } catch (err) {
      console.error(err.message)
    }
  }
  useEffect(() => {
    listHandler();
  }, []);

  useEffect(() => {
    listHandler();
  }, [contentUpdated]);

  return (
    <>
      <HeaderContainer />
      <MenuContainer />
      <Discover>
        <Discover.TitleBig>My List</Discover.TitleBig>
        <Discover.Panel>
          {/* <Discover.PanelTitle>shit</Discover.PanelTitle> */}

          <Discover.ListPanelRow>
            {content.map((item, index) => (
              <Discover.PanelBox
                to={`/${
                  item.medium === "read"
                    ? "read"
                    : item.medium === "watch"
                    ? "watch"
                    : "play"
                }/${item.id}`}
                bg={item.imageurl}
              >
                <Discover.ItemText>{item.name}</Discover.ItemText>
                <Discover.IconPanel onClick={(e) => e.preventDefault()}>
                  <Discover.ItemLogo
                    src={
                      item.medium === "watch"
                        ? watch
                        : item.medium === "play"
                        ? play
                        : book
                    }
                  />
                  <Discover.ItemLogo src={remove} onClick={()=>removeFromListHandler(item.id)}/>
                </Discover.IconPanel>
              </Discover.PanelBox>
            ))}
          </Discover.ListPanelRow>
        </Discover.Panel>
      </Discover>
    </>
  );
}
