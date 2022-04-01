import React, { useState, useEffect } from "react";
import HeaderContainer from "../containers/header";
import { MenuContainer } from "../containers/menu";
import Discover from "../components/discover/index";
import * as ROUTES from "../constants/routes";
import book from "../images/book.svg";
import add from "../images/add.svg";
import watch from "../images/watch.svg";
import play from "../images/play.svg";
import deleteIcon from "../images/deleteIcon.svg"
import { useSelector } from "react-redux";
import Modal from "../components/modal"

// reactjs-popup

export default function MyPost({ children }) {
  const [type, setType] = useState("");
  const [showModal, setShowModal] = useState({state:false, id:0})
  const [content, setContent] = useState([]);
  const [contentUpdated, setContentUpdated] = useState(false)
  // const currentUser = useSelector((state) =>
  //   typeof(state.authorization.currentUser) === Object ?
  //   state.authorization.currentUser.userID : state.authorization.currentUser
  // );
const currentUser = useSelector((state) =>
    
    state.authorization.currentUser.userID 
  );
console.log(currentUser);

  const postHandler = async () => {
    try {
      const res = await fetch("/post/allposts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: currentUser }),
      });
      const parseRes = await res.json();
      setContent(parseRes);
      setContentUpdated(false)
    } catch (err) {
      console.error(err.message);
    }
  };

  const removeFromPostHandler = async (id)=> {
    try {
      const res = await fetch ("/post/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id: id})
      })
      const parseRes = res.json()
      setContentUpdated(true)
      setShowModal({state:false, id: id})
      
    } catch (err) {
      console.error(err.message)
    }
  }

  const modalHandler = (id) => {
    setShowModal({state: true, id: id})
  }
  useEffect(() => {
    postHandler();
  }, []);

  useEffect(() => {
    postHandler();
  }, [contentUpdated]);
  return (
    <>
      <HeaderContainer />
      <MenuContainer />
      <Discover>
      {showModal.state ? <Modal>
        <Modal.Text>Are you sure you want to delete this post?</Modal.Text>
        <div style={{display:"flex", flexDirection: "row", justifyContent:"space-evenly", alignItems:"center", marginTop:"2rem"}}>
        <Modal.Button onClick={()=>removeFromPostHandler(showModal.id)}>Yes</Modal.Button>
        <Modal.Button onClick={()=> setShowModal({state: false, id:showModal.id})}>No</Modal.Button>
        </div>
      </Modal> : null}
        <Discover.TitleBig>My Posts</Discover.TitleBig>
        <Discover.Panel>
          {/* <Discover.PanelTitle>shit</Discover.PanelTitle> */}

          <Discover.ListPanelRow>
            {content.map((item, index) => (
              <Discover.PanelBox
                key={item.id}
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
                  <Discover.ItemLogo style={{filter:"invert(100%)"}} src={deleteIcon} 
                  onClick={()=>modalHandler(item.id)}/>
                </Discover.IconPanel>
              </Discover.PanelBox>
              
            ))}
          </Discover.ListPanelRow>
        </Discover.Panel>
      </Discover>
    </>
  );
}