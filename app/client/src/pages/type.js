import React, { useState, useEffect, useContext } from "react";
import HeaderContainer from "../containers/header";
import { MenuContainer } from "../containers/menu";
import Discover from "../components/discover/index";
import * as ROUTES from "../constants/routes";
import book from "../images/book.svg";
import add from "../images/add.svg";
import remove from "../images/remove.svg"
import watch from "../images/watch.svg";
import play from "../images/play.svg";
import upvote from "../images/upvote.svg";
import downvote from "../images/downvote.svg";
import { FilterContext } from "../components/menu/FilterContext";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

export default function Type({ children }) {
    const idParams = useParams()

    const navigate = useNavigate()

      // change name later this is for voting variable

  const [variable, setVariable] = useState(false)

  // authorization checks
  const currentUser = useSelector((state) =>
    state.authorization.currentUser.userID
      ? state.authorization.currentUser.userID
      : state.authorization.currentUser
  );
  const isLoggedIn = useSelector((state) => state.authorization.loggedIn);

  // list state management
  const [inList, setInList] = useState([])
  const [listUpdated, setListUpdated] = useState(false)

  // voting checks
  const [voted, setVoted] = useState({});
  const [downvoted, setDownvoted] = useState({});
  // active voting arrays
  const [promptUp, setPromptUp] = useState([]);
  const [promptDown, setPromptDown] = useState([]);

  // get upvotes/downvotes
  const [userVotes, setUserVotes] = useState({});

  // // pass entry.id to getVotes function
  // get votes
  const [votes, setVotes] = useState([]);
  const [count, setCount] = useState();

  const [userData, setUserData] = useState([]);

  const [counter, setCounter] = useState([]);


  // state for rendering content
  const [content, setContent] = useState([]);
  

  // getting filters to apply to content
  const [filterApplied, setFilterApplied] = useState(false);
  const [mediumFilterApplied, setMediumFilterApplied] = useState(false);
  const [mediumArray, setMediumArray] = useState([])
  const [filteredContent, setFilteredContent] = useState([]);
  const { filterArray, setFilterArray, medium, setMedium } = useContext(FilterContext);


  // functions/handlers

  async function getContent () {
    const res = await fetch("/content")
    const parseRes = await res.json()
    setContent(parseRes.filter((content)=> content.type === idParams.id))
  }



 const genreFilter = (array) => {

   if (filterArray.length !== 0 && filterArray && filterArray.checked === true) {
   setFilterApplied(true)
     return array.filter((item)=> item.genre === filterArray.values)
   }
   else {
     setFilterApplied(false)
    return array

   }
 }
 const mediumFilter = (array) => {
  if (medium.length !== 0 && medium && medium.checked === true) {
    setMediumFilterApplied(true)
   
    if (medium.values === "TV/movies"){
        return array.filter((element)=> element.medium === "watch")
    }
    else if(medium.values === "books"){
        return array.filter((element)=> element.medium === "read")
    }
    else if(medium.values === "games"){
        return array.filter((element)=> element.medium === "play")
    }
  
  }
  else {
    setMediumFilterApplied(false)
    return array

  }
}
  // const genreFilter = (array) => {
  //   console.log(medium);
  //   console.log(filterArray);
  //   setFilterApplied(true);

  //   const genreArr = filterArray.values;
  //   const mediumValue = medium.values 
  //   if (genreArr === filterArray.values && filterArray.checked === false) {
  //   setFilterApplied(false);
  //   }
  //   const filtered = array.filter((element, index, arr) => element.genre === genreArr);
  //   setFilteredArray(filtered);


  //   if (mediumFilterApplied && filterApplied){
  //     const filtered = array.filter((element)=> element.genre === genreArr && element.medium === (medium.value === "games" ? "play" : "books" ? "read" : "watch"))
  //   setFilteredArray(filtered);

  //   }
  //   // const filtered2 = arr.filter((element)=> element.medium === )


  //   if (!filterArray || filterArray.length === 0) {
  //   setFilterApplied(false);
  //   }
  // };

  // const mediumFilter = (array) => {
  //     setMediumFilterApplied(true)

  //     if (medium.values && medium.checked === false){
  //       setMediumFilterApplied(false);
  //     }
  //     if (medium.values === "TV/movies"){
  //       const filtered = array.filter((element)=> element.medium === "watch")
  //     setFilteredArray(filtered)

  //     }
  //     else if(medium.values === "books"){
  //       const filtered = array.filter((element)=> element.medium === "read")
  //     setFilteredArray(filtered)


  //     }
  //     else if(medium.values === "games"){
  //       const filtered = array.filter((element)=> element.medium === "play")
  //     setFilteredArray(filtered)


  //     }
  //     console.log(medium.values);

  //     if (!medium || medium.length ===0) {
  //       setMediumFilterApplied(false);
  //       }
  // }

 

  

  const voteHandler = async (id, value) => {
    if (!isLoggedIn) {
      navigate(ROUTES.LOGIN);
    }
    if (isLoggedIn) {
      try {
        const res = await fetch("/vote/votes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: currentUser,
            content_id: id,
            value: value,
          }),
        });
        const parseRes = await res.json();
        // const vote = await getVotes(id);
        if (res.ok === true && value === "upvote") {
          setVoted({ voted: true, id: id });
          setDownvoted({ voted: false, id: id });
          setPromptUp([...promptUp, id]);
        

          if (parseRes == "deleted") {
            setVoted({ voted: false, id: id });
            const filtered = promptUp.filter((item) => item !== id);
            setPromptUp(filtered);
            localStorage.setItem(
              "uservotes",
              JSON.stringify(
                JSON.parse(localStorage.getItem("uservotes")).filter(
                  (item) => item.c_id !== id && item.u_id !== currentUser
                )
              )
            );
          }
        }
        if (res.ok === true && value === "downvote") {
          setVoted({ voted: false, id: id });
          setDownvoted({ voted: true, id: id });
          setPromptDown([...promptDown, id]);
        
          if (parseRes == "deleted") {
            setDownvoted({ voted: false, id: id });
            const filtered = promptDown.filter((item) => item !== id);
            setPromptDown(filtered);

            localStorage.setItem(
              "uservotes",
              JSON.stringify(
                JSON.parse(localStorage.getItem("uservotes")).filter(
                  (item) => item.c_id !== id && item.u_id !== currentUser
                )
              )
            );
          }
        }
        // return vote;
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
// add to list
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
  // post version that got a votes count
  async function getVotes1(id) {
    try {
      const res = await fetch("/vote/allvotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ c_id: id }),
      });

      const parseRes = await res.json();
      return parseRes;
      // console.log(parseRes, id);
    } catch (err) {
      console.error(err);
    }
  }

  // get version

  async function getVotes() {
    try {
      const res = await fetch("/vote/votestable");
      const parseRes = await res.json();
      const voteArray = [...parseRes];
      setVotes(voteArray);
      return voteArray;
    } catch (err) {
      console.error(err);
    }
  }

  const filterVoteHandler = (id) => {
    // check user's votes
    const filteredArray = votes.filter((item) => item.c_id === id);
    const count =
      filteredArray.filter((filteredItem) => filteredItem.values === "upvote")
        .length -
      filteredArray.filter((filteredItem) => filteredItem.values === "downvote")
        .length;
    return count;
  };

  const userVoteHandler = () => {
    const userArray = votes.filter((item) => item.u_id === currentUser);

    // set/retrieve prev votes from user
    if (userArray.length !== 0) {
      localStorage.setItem("uservotes", JSON.stringify(userArray));
      return userArray;
    }
  };

  useEffect(() => {
    getContent()
    setFilterApplied(false);
    setMediumFilterApplied(false)
    setFilterArray("")
    setMedium("")
  }, [idParams]);

  useEffect(() => {
    getContent();
    getListHandler()
    setFilterApplied(false);
    setMediumFilterApplied(false)
    getVotes();
    if (isLoggedIn) {
      userVoteHandler();
    }
  }, []);

  useEffect(() => {
    let result = content;
    result = genreFilter(result)
    result = mediumFilter(result)
    setFilteredContent(result)
    
  }, [filterArray, setFilterArray, medium, setMedium]);

  
  // useEffect(() => {
  //   // mediumFilter(content)
  // }, [medium, setMedium]);


  useEffect(() => {
    if (getVotes().length !== 0) {
      userVoteHandler();
    }
    if (downvoted.id === voted.id && downvoted.voted === true) {
      setVariable(false)
      
    }
    else if (downvoted.id === voted.id && voted.voted === true) {
      setVariable(true)
      

    }
  }, [voted, downvoted, setVoted, setDownvoted]);

  useEffect(() => {
    getListHandler()
  }, [listUpdated]);


  return (
    <>
      <HeaderContainer />
      <MenuContainer />
      <Discover>
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
        <Discover.TitleBig>{idParams.id}</Discover.TitleBig>
        <Discover.Panel>

          <Discover.ListPanelRow>
            {(filterApplied || mediumFilterApplied ? filteredContent : content)
            .map((entry, index) => (
              <Discover.PanelBox
              
                to={`/${
                  entry.medium === "read"
                    ? "read"
                    : entry.medium === "watch"
                    ? "watch"
                    : "play"
                }/${entry.id}`}
                bg={entry.imageurl}
              >
                <Discover.ItemText>{entry.name}</Discover.ItemText>
                <Discover.IconPanel onClick={(e) => e.preventDefault()}>

                  <Discover.ItemLogo
                    src={
                      entry.medium === "watch"
                        ? watch
                        : entry.medium === "play"
                        ? play
                        : book
                    }
                  />
                  <Discover.ItemUpvote
                        key={entry.id}
                        onClick={() => {
                          voteHandler(entry.id, "upvote");
                          getVotes1(entry.id).then(function (result) {
                            setCounter([result, entry.id]);
                          });

                          if (promptDown.includes(entry.id)) {
                            const filtered = promptDown.filter(
                              (item) => item !== entry.id
                            );
                            setPromptDown(filtered);
                          }
                        }}
                        src={upvote}
                        voted={
                          (voted.voted === true && voted.id === entry.id) ||
                          promptUp.includes(entry.id) ||
                          JSON.parse(localStorage.getItem("uservotes"))?.some(
                            (item) =>
                              item.c_id === entry.id &&
                              item.values === "upvote" &&
                              item.u_id === currentUser
                          ) && variable === true
                            ? true
                            : false
                        }
                      ></Discover.ItemUpvote>
                      <Discover.Count>
                        {filterVoteHandler(entry.id) + 1}
                      </Discover.Count>
                      <Discover.ItemDownvote
                        onClick={() => {
                          voteHandler(entry.id, "downvote");
                      
                        
                      

                          if (promptUp.includes(entry.id)) {
                            const filtered = promptUp.filter(
                              (item) => item !== entry.id
                            );
                            setPromptUp(filtered);
                          }
                        }}
                        src={downvote}
                        downvoted={
                          (downvoted.voted === true &&
                            downvoted.id === entry.id) ||
                          promptDown.includes(entry.id) ||
                          JSON.parse(localStorage.getItem("uservotes"))?.some(
                            (item) =>
                              item.c_id === entry.id &&
                              item.values === "downvote" &&
                              item.u_id === currentUser
                          )&& variable === false
                            ? true
                            : false
                        }
                      />

                        <Discover.AddToList
                        onClick={() => {
                          if(inList.some((item)=> item.id ===entry.id)){
                            removeFromListHandler(entry.id)
                            toast("Removed from list!")
                          }else{
                          listHandler(entry.id)
                          toast("Added to list!")

                          }
                        }}
                        
                          
                        src={inList.some((item)=> item.id ===entry.id) ? remove :
                          add}
                      />
                </Discover.IconPanel>
              </Discover.PanelBox>
            ))}
          </Discover.ListPanelRow>
        </Discover.Panel>
      </Discover>
    </>
  );
}
