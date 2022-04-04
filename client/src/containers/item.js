import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Item from "../components/item/index";
import add from "../images/add.svg";
import remove from "../images/remove.svg"
import deleteIcon from "../images/deleteIcon.svg"
import book from "../images/book.svg";
import play from "../images/play.svg";
import watch from "../images/watch.svg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Modal from "../components/modal"
import * as ROUTES from "../constants/routes"

import {ToastContainer, toast} from 'react-toastify';


export function ItemContainer({ children }) {
  const currentUser = useSelector((state) =>
    state.authorization.currentUser.userID
      ? state.authorization.currentUser.userID
      : state.authorization.currentUser
  );
  const isLoggedIn = useSelector((state) => state.authorization.loggedIn);
  const [content, setContent] = useState([]);
  const [contentUpdated, setContentUpdated] = useState(false)
  const [showModal, setShowModal] = useState({state:false, id:0})
  const navigate = useNavigate()
  const { id } = useParams();
  async function getContent() {
    const res = await fetch("/content");
    const array = await res.json();
    setContent(array);
  }

    // list state management
    const [inList, setInList] = useState([])
    const [listUpdated, setListUpdated] = useState(false)
  

  const listHandler = async (id) => {
    if (isLoggedIn) {
      try {
        const res = await fetch("/my-list/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ currentUser: currentUser, contentID: id }),
        });
        const parseRes = await res.json();
        setListUpdated(true)
      } catch (err) {
        console.error(err.message);
      }
    }
  };

    // get list info
    const getListHandler = async () => {
      if (isLoggedIn) {
        try {
          const res = await fetch("/my-list/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ currentUser: currentUser }),
          });
          const parseRes = await res.json();
          setInList(parseRes) 
          setListUpdated(false)     
        } catch (err) {
          console.error(err.message);
        }
      }
    }; 
// remove from list
    const removeFromListHandler = async (id)=> {
      try {
        const res = await fetch ("/my-list/remove", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({currentUser: currentUser, contentID: id})
        })
        setListUpdated(true)
        const parseRes = await res.json()
        
        
      } catch (err) {
        console.error(err.message)
      }
    }

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
      navigate(ROUTES.HOME)
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

  useEffect(() => {
    getContent();
    getListHandler();

  }, []);

  useEffect(() => {
    getListHandler()
  }, [listUpdated]);

  return (
    <Item>
      <ToastContainer
      position="top-center"
      autoClose={1200}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover={false}
      theme="dark"
      />
        {showModal.state ? <Modal>
        <Modal.Text>Are you sure you want to delete this post?</Modal.Text>
        <div style={{display:"flex", flexDirection: "row", justifyContent:"space-evenly", alignItems:"center", marginTop:"2rem"}}>
        <Modal.Button onClick={()=>removeFromPostHandler(showModal.id)}>Yes</Modal.Button>
        <Modal.Button onClick={()=> setShowModal({state: false, id:showModal.id})}>No</Modal.Button>
        </div>
      </Modal> : null}
      <Item.Header />
      <Item.Box>
        {content
          .filter((item) => item.id === +id)
          .map((item, index) => (
            <React.Fragment key={item.id}>
              <Item.Title>{item.name}</Item.Title>
              <Item.IconPanel>
                 
                {item.u_id === currentUser ? <Item.Icon src={deleteIcon}onClick={()=>modalHandler(item.id)}/>: null}
                <Item.Icon   onClick={() => {
                          if(inList.some((entry)=> entry.id ===item.id)){
                            removeFromListHandler(item.id)
                            toast("Removed from list!")
                          }else{
                          listHandler(item.id)
                          toast("Added to list!")

                          }
                        }}
                        src={inList.some((entry)=> entry.id ===item.id) ? remove :
                          add}
                      />
                <Item.Icon
                  src={
                    item.medium === "watch"
                      ? watch
                      : item.medium === "read"
                      ? book
                      : play
                  }
                />
                <Item.Text>{item.type}</Item.Text>
                <Item.Text>{item.genre}</Item.Text>
              </Item.IconPanel>

              <Item.Panel>
                <Item.HeaderImage
                  src={item.imageurl}
                  alt="Product Image"
                />
           
                <Item.TextCard>
                  <Item.Text>{item.description}</Item.Text>
                </Item.TextCard>
              </Item.Panel>

              <a href={item.wheretofind} target="_blank" rel="noreferrer">
                <Item.WhereToFind>
                  {item.medium === "watch"
                    ? "Watch Now"
                    : item.medium === "read"
                    ? "Read Now"
                    : "Play Now"}
                </Item.WhereToFind>
              </a>
            </React.Fragment>
          ))}
      </Item.Box>
    </Item>
  );
}
