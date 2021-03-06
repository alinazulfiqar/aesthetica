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
  const navigate = useNavigate();

  // change name later this is for voting variable

  const [variable, setVariable] = useState(false)
  const [votesUpdated, setVotesUpdated] =useState(false)
  // authorization checks
  const currentUser = useSelector((state) =>
    state.authorization.currentUser.userID
      ? state.authorization.currentUser.userID
      : state.authorization.currentUser
  );
  const isLoggedIn = useSelector((state) => state.authorization.loggedIn);

  // voting checks
  const [voted, setVoted] = useState({});
  const [downvoted, setDownvoted] = useState({});

  // active voting arrays
  const [promptUp, setPromptUp] = useState([]);
  const [promptDown, setPromptDown] = useState([]);

  // get upvotes/downvotes

  const [userVotes, setUserVotes] = useState([])
  // // pass entry.id to getVotes function
  // get votes
  const [votes, setVotes] = useState([]);



  

  // list state management
  const [inList, setInList] = useState([])
  const [listUpdated, setListUpdated] = useState(false)


  

  // state for rendering content

  // getting filters to apply to content
  const [filterApplied, setFilterApplied] = useState(false);
  const [mediumFilterApplied, setMediumFilterApplied] = useState(false);
  const [filteredContent, setFilteredContent] = useState([]);
  const { filterArray, setFilterArray, medium, setMedium, hideMenu, setHideMenu } = useContext(FilterContext);

  const [content, setContent] = useState([])
  const idParams = useParams(

  )
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
        setVotesUpdated(true)
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

    async function getUserVotes() {
      try {
        const res = await fetch("/vote/uservotes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: currentUser }),
        });
  
        const parseRes = await res.json();
        setVotesUpdated(false)
        setUserVotes(parseRes)
      } catch (err) {
        console.error(err);
      }
    }

  useEffect(() => {
    getContent()
    getListHandler();
    setFilterApplied(false);
    setMediumFilterApplied(false);
    getVotes();
    // console.log(filterArray.map((array) => array.values));
    if (isLoggedIn) {
      getUserVotes();
    }
  }, []);

  useEffect(() => {
    getContent()
    getListHandler();
    setFilterApplied(false);
    setMediumFilterApplied(false);
    getVotes();
  }, [idParams]);


  useEffect(() => {
    let result = content;
    result = genreFilter(result)
    result = mediumFilter(result)
    setFilteredContent(result)
    
  }, [filterArray, setFilterArray, medium, setMedium]);


  useEffect(() => {
      getVotes()
      getUserVotes();

    if (downvoted.id === voted.id && downvoted.voted === true) {
      setVariable(false)
      
    }
    else if (downvoted.id === voted.id && voted.voted === true) {
      setVariable(true)
      

    }
    // NOTE FROM 2/14:
    // voting is wonky rn, pls return to fix; when u vote on something, it doesn't show voted after refresh unless voted or downvotdd are triggered again. FIx this. THanks
  }, [voted, downvoted, setVoted, setDownvoted]);

  useEffect(() => {
    getListHandler()
  }, [listUpdated]);

  useEffect(() => {
    getUserVotes()
  }, [votesUpdated]);

  
  return (
    <>
      <HeaderContainer />
      <MenuContainer />
      <Discover onClick={()=> hideMenu===false ? setHideMenu(true) : null}>
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
                         

                          if (promptDown.includes(entry.id)) {
                            const filtered = promptDown.filter(
                              (item) => item !== entry.id
                            );
                            setPromptDown(filtered);
                          }
                        }}
                        src={upvote}
                        // voted={
                        //   (voted.voted === true && voted.id === entry.id) ||
                        //   promptUp.includes(entry.id) ||
                        //   JSON.parse(localStorage.getItem("uservotes"))?.some(
                        //     (item) =>
                        //       item.c_id === entry.id &&
                        //       item.values === "upvote" &&
                        //       item.u_id === currentUser
                        //   ) && variable === true
                        //     ? true
                        //     : false
                        // }

                        voted={
                          voted.voted === true && voted.id === entry.id ||
                            promptUp.includes(entry.id) || userVotes.some(item=> item.c_id===entry.id && item.values==="upvote") 
                            && variable === true
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
                        // downvoted={
                        //   (downvoted.voted === true &&
                        //     downvoted.id === entry.id) ||
                        //   promptDown.includes(entry.id) ||
                        //   JSON.parse(localStorage.getItem("uservotes"))?.some(
                        //     (item) =>
                        //       item.c_id === entry.id &&
                        //       item.values === "downvote" &&
                        //       item.u_id === currentUser
                        //   )&& variable === false
                        //     ? true
                        //     : false
                        // }
                        downvoted={
                          downvoted.voted === true && downvoted.id === entry.id 
                        ||  promptDown.includes(entry.id) || userVotes.some(item=> item.c_id===entry.id && item.values==="downvote") 
         && variable === false

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
