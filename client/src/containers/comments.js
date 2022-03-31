import React, { useEffect, useState } from "react";
import Comments from "../components/comments";
import upvote from "../images/upvote.svg";
import downvote from "../images/downvote.svg";
import replyIcon from "../images/reply.svg";
import editIcon from "../images/edit.svg";
import deleteIcon from "../images/deleteIcon.svg"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function CommentsContainer({ children, ...restProps }) {
  const { id } = useParams();

  const loggedIn = useSelector((state) => state.authorization.loggedIn);

  const [input, setInput] = useState("");

  const [updatedComment, setUpdatedComment] = useState({})

  const [value, setValue] = useState("");

  const [reply, setReply] = useState({});


  const [parentID, setParentID] = useState();

  const [showReply, setShowReply] = useState({ show: false, comment_id: 0 });

  const [edit, setEdit] = useState({show: false, comment_id: 0})

  const [username, setUsername] = useState("")

  const currentUser = useSelector((state) =>
    state.authorization.currentUser.userID
      ? state.authorization.currentUser.userID
      : state.authorization.currentUser
  );

  const userName = useSelector((state) =>
    state.authorization.currentUser.userName
      ? state.authorization.currentUser.userName
      : "user"
  );

  const [commentsArray, setCommentsArray] = useState([]);
  const [repliesArray, setRepliesArray] = useState([]);

  const onChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const onChangeReplyHandler = (e, cid) => {
    const value = e.target.value;
    if (e.target.id == cid) {
      setReply({ id: cid, value: value });
    }
  };

  const onChangeUpdatedCommentHandler = (e, cid) => {
    const value = e.target.value;
    if (e.target.id == cid) {
      setUpdatedComment({ id: cid, value: value });
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/comments/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: currentUser,
          content_id: +id,
          votes: 1,
          comment: input,
        }),
      });
      const parseRes = await res.json();
      setInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // send in the comment
  const onReplyHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/comments/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: currentUser,
          content_id: +id,
          votes: 1,
          comment: reply.value,
          parent_comment_id: parentID ? parentID : null,
        }),
      });
      const parseRes = await res.json();
      setReply("");
    } catch (err) {
      console.error(err);
    }
  };

  async function fetchComments() {
    try {
      const response = await fetch(`/comments/${+id}`);
      const comments = await response.json();
      setCommentsArray(comments);
      // console.log(comments);
    } catch (err) {
      console.error(err);
    }
  }

  const showReplyHandler = (cid) => {
    setShowReply({ show: !showReply.show, comment_id: cid });
    setParentID(cid);
  };

  
  function timeComparisonHandler(time) {
    // current time
    const currentTime = new Date();
    const currentd = currentTime.getDate();
    const currentmo = currentTime.getMonth();
    const currenty = currentTime.getYear();
    const currenth = currentTime.getHours();
    const currentmi = currentTime.getMinutes();

    // compare comment time
    const commentTime = new Date(time);
    const commentd = commentTime.getDate();
    const commentmo = commentTime.getMonth();
    const commenty = commentTime.getYear();
    const commenth = commentTime.getHours();
    const commentmi = commentTime.getMinutes();

    // compare
    const dateDiff = currentd - commentd;
    const monthDiff = currentmo - commentmo;
    const yearDiff = currenty - commenty;
    const hourDiff = currenth - commenth;
    const minDiff = currentmi - commentmi;

    if (yearDiff >= 1) {
      return `${yearDiff === 1 ? "a year ago" : yearDiff + " years ago"}`;
    } else if (monthDiff >= 1) {
      return `${monthDiff === 1 ? "a month ago" : monthDiff + " months ago"}`;
    } else if (dateDiff >= 1) {
      return `${dateDiff === 1 ? "a day ago" : dateDiff + " days ago"}`;
    } else if (hourDiff >= 1) {
      return `${hourDiff === 1 ? "an hour ago" : hourDiff + " hours ago"}`;
    } else if (minDiff >= 1) {
      return `${minDiff === 1 ? "a minute ago" : minDiff + " minutes ago"}`;
    } else if (minDiff < 1) {
      return `moments ago`;
    }
  }

  // function nestedComments(commentList) {
  //   const commentMap = {};

  //   commentList.forEach((comment) => (commentMap[comment.id] = comment));

  //   commentList.forEach((comment) => {
  //     if (comment.parent_comment_id !== null) {
  //       const parent = commentMap[comment.parent_comment_id];
  //       (parent.children = parent.children || []).push(comment);
  //     }
  //   });

  //   return commentList.filter((comment) => {
  //     return comment.parent_comment_id === null;
  //   });
  // }

  const ReplyBody = ({ item }) => {
    return (
      <Comments.CommentBox
        id={item.comment_id}
        onChange={(e) => onChangeReplyHandler(e, item.comment_id)}
        cols="120"
        rows="6"
        placeholder="What are your thoughts?"
        value={reply.id === item.comment_id ? reply.value : ""}
        autoFocus
        {...restProps}
      ></Comments.CommentBox>
    );
  };
  const testerFunction = () => {
    commentsArray.map((currelement, index, array) => {
      array
        .filter(
          (arrayComment) =>
            arrayComment.parent_comment_id === currelement.comment_id
        )
        .map((item) => repliesArray.push(item));
    });
    // console.log(repliesArray);
    // commentsArray.filter((comment, index, array) =>
    //   comment.parent_comment_id
    //     ? array
    //         .filter(
    //           (arrayComment) =>
    //             arrayComment.parent_comment_id === comment.comment_id
    //         )
    //         .map((commentWparents) => console.log(commentWparents))
    //     : null
    // );
  };

  const editCommentHandler = async(e, commentID) => {
    e.preventDefault()
    if(updatedComment.id === commentID){
      try {
        const res = await fetch("/comments/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            updated_comment: updatedComment.value,
            comment_id: +commentID,
          }),
        });
        setUpdatedComment({ id: commentID, value: "" });
        
      } catch (err) {
        console.error(err.message)
      }
    }
    
  }

  const deleteCommentHandler = async(commentID) => {
      try {
        const res = await fetch("/comments/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comment_id: +commentID
          }),
        });
        
      } catch (err) {
        console.error(err.message)
      }

    
  }


  function Tree({ treeData, parentId = null, level = 0 }) {
    const items = treeData.filter(
      (item) => item.parent_comment_id === parentId
    );

    if (!items.length) return null;

    return (
      <>
        {items.map((item,index) => (
          <Comments.CommentRow key={item.id} item={item} level={level}>
            <Comments.TextSmall>
              {item.user_name}
              <br /> Posted: {timeComparisonHandler(item.posting_date)}
            </Comments.TextSmall>
            <Comments.CommentText>{item.comment_text}</Comments.CommentText>
            <Comments.CommentBar >
              <Comments.Icon src={upvote} />
              <Comments.TextSmall>1</Comments.TextSmall>
              <Comments.Icon src={downvote} />
              <Comments.Icon
                src={replyIcon}
                onClick={() => showReplyHandler(item.comment_id)}
              />
              <Comments.TextSmall
                onClick={() => showReplyHandler(item.comment_id)}
              >
                Reply
              </Comments.TextSmall>
              <Comments.Icon src={editIcon} 
              onClick={()=> item.u_id === currentUser ? setEdit({show: !edit.show, comment_id: item.comment_id}) : null}
              
              />
              <Comments.TextSmall
              onClick={()=> item.u_id === currentUser ? setEdit({show: !edit.show, comment_id: item.comment_id}) : null}
              >Edit</Comments.TextSmall>

              <Comments.Icon src={deleteIcon} 
              onClick={()=> item.u_id === currentUser ? deleteCommentHandler(item.comment_id) : null}
              
              />
              <Comments.TextSmall
              onClick={()=> item.u_id === currentUser ? deleteCommentHandler(item.comment_id) : null}
              >Delete</Comments.TextSmall>
              
            </Comments.CommentBar>
            {showReply.show === true &&
            showReply.comment_id === item.comment_id ? (
              <Comments.CommentContainer
                
                onSubmit={onReplyHandler}
              >
                {ReplyBody({ item: item })}
                <Comments.Submit />
              </Comments.CommentContainer>
            ) : null}
             {
              edit.show && edit.comment_id === item.comment_id ?
              <Comments.CommentContainer
              onSubmit={(e)=>editCommentHandler(e,item.comment_id)}>
              <Comments.CommentBox
              id={item.comment_id}
              onChange={(e) => onChangeUpdatedCommentHandler(e, item.comment_id)}
              cols="120"
              rows="6"
              placeholder={item.comment_text}
              value={updatedComment.id === item.comment_id ? updatedComment.value : null}
              autoFocus
              {...restProps}
              ></Comments.CommentBox> 
                <Comments.Submit />
              </Comments.CommentContainer>
              : null
              
            } 
            {Tree({
              treeData: treeData,
              parentId: item.comment_id,
              level: level + 1,
            })}
          </Comments.CommentRow>
        ))}
      </>
    );
  }

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    fetchComments();
  }, [commentsArray]);

  return (
    <Comments {...restProps}>
      {children}
      <Comments.TextSmall>
        {loggedIn ? `Comment as ${userName}` : "Log in to comment."}
      </Comments.TextSmall>
      <Comments.CommentContainer onSubmit={onSubmitHandler}>
        <Comments.CommentBox
          name="comments"
          onChange={onChangeHandler}
          cols="120"
          rows="10"
          placeholder="What are your thoughts?"
          value={input}
          {...restProps}
        ></Comments.CommentBox>
        <br></br>
        <Comments.Submit />
      </Comments.CommentContainer>

      {Tree({ treeData: commentsArray })}
    </Comments>
  );
}

// working on stuff here
