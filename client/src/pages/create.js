import React, {useState, useEffect} from "react";
import HeaderContainer from "../containers/header";
import Create from "../components/create/index";
import watch from "../images/watch.svg";
import play from "../images/play.svg";
import book from "../images/book.svg";
import * as ROUTES from "../constants/routes"
import { MenuContainer } from "../containers/menu";
import {ToastContainer, toast} from 'react-toastify';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



export default function CreatePage() {
const [inputs, setInputs] = useState({
  title:"",
  whereToFind:""
})
const {title, whereToFind} = inputs;

const navigate = useNavigate()

const currentUser = useSelector((state) =>
    state.authorization.currentUser.userID
      ? state.authorization.currentUser.userID
      : state.authorization.currentUser
  );

const [medium, setMedium] = useState("")
const [type, setType] = useState("")
const [genre, setGenre] = useState("")
const [buttonEnabled, setButtonEnabled] = useState("false")


const onChangeHandler = (e) => {
  setInputs({...inputs, [e.target.name]:e.target.value})
  }

const mediumHandler =(e)=> {
  setMedium(e.target.getAttribute("data-value"))
 
  }

const typeHandler = (e)=> {
  setType(e.target.value) 
    
}

const genreHandler = (e)=> {
  setGenre(e.target.value)
}

const onSubmitHandler = async (e) => {
  e.preventDefault()
  // get description and imageurl
  if(genre && type && medium && title.length>0 && whereToFind.length>0){
    try {
      const response = await fetch(`http://localhost:5000/scrape/${medium}`, {
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({url:whereToFind})
      })
      const parseResponse = await response.json()
      const {description, imageUrl} = parseResponse[0]
      // post to db
      const res = await fetch('http://localhost:5000/post/submit', {
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({user_id: currentUser, name: title, medium: medium, type: type, genre:genre, description: description, imageURL:imageUrl, whereToFind:whereToFind})
      })
      const parseRes = await res.json()
      if (res.ok && parseRes!=="Content already exists. Consider browsing instead."){
        toast("Hooray! Content added!")
        setTimeout(() => {
          navigate(ROUTES.POSTS)
        }, 1000);
      }
      else if(parseRes==="Content already exists. Consider browsing instead."){
        toast("Content alreedy exists. Consider browsing instead.")
      }
      else{
      toast("Aww, something went wrong!")

      }
      
    } catch (err) {
      toast("Aww, something went wrong!")
      console.error(err.message)
    }
  }
  }
  useEffect(() => {
  if(genre.length>0 && type.length>0 && medium.length>0 && title.length>0 && whereToFind.length>0){
    setButtonEnabled(true)
  }
  else{
    setButtonEnabled(false)
  }

   }
  , [genre, medium, type, title, whereToFind])
  
  
  
  return (
    <>
      <HeaderContainer />
      <MenuContainer />
      <Create>
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
        <Create.Base onSubmit={onSubmitHandler}>

        <Create.Title>Know of a hidden gem? Contribute!</Create.Title>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Create.Text>
              title<span style={{ color: "red" }}>*</span>
            </Create.Text>
            <Create.Input
              name="title"
              placeholder="Enter content title"
              
              onChange={onChangeHandler}
              value={title}
            />
          </div>

          

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Create.Text>
              medium<span style={{ color: "red" }}>*</span>
            </Create.Text>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "4rem",
              }}
            >
              <Create.Button bg={book} data-value="read" type="radio" name="medium"  onClick={(e)=>mediumHandler(e)}/>
              <Create.Button bg={watch} data-value="watch"type="radio" name="medium"onClick={(e)=>mediumHandler(e)}/>
              <Create.Button bg={play} data-value="play"type="radio" name="medium"onClick={(e)=>mediumHandler(e)}/>
            </div>
          </div>
          
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Create.Text>
              type
              <span
                style={{ fontSize: "1rem", color: "red", paddingLeft: "2px" }}
              >
                (select only one)
              </span>
            </Create.Text>
            <Create.RowMain onChange={typeHandler}>
              <Create.Column>
                <Create.Row>
                  <Create.Checkbox type="radio" name="type" value="cottagecore"/>
                  <Create.Text>Cottagecore</Create.Text>
                </Create.Row>
                <Create.Row>
                  <Create.Checkbox type="radio"name="type" value="steampunk"/>
                  <Create.Text>Steampunk</Create.Text>
                </Create.Row>
                <Create.Row>
                  <Create.Checkbox type="radio" name="type"value="cyberpunk"/>
                  <Create.Text>Cyberpunk</Create.Text>
                </Create.Row>
                </Create.Column>
                <Create.Column>
                <Create.Row>
                  <Create.Checkbox type="radio" name="type"value="medieval"/>
                  <Create.Text>Medieval</Create.Text>
                </Create.Row> <Create.Row>
                  <Create.Checkbox type="radio" name="type"value="dark-academia"/>
                  <Create.Text>Dark Academia</Create.Text>
                </Create.Row> <Create.Row>
                  <Create.Checkbox type="radio" name="type" value="victorian"/>
                  <Create.Text>Victorian</Create.Text>
                </Create.Row>
              </Create.Column>
            </Create.RowMain>
          </div>


              
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Create.Text>
              genre
              <span
                style={{ fontSize: "1rem", color: "red", paddingLeft: "2px" }}
              >
                (select only one)
              </span>
            </Create.Text>
            <Create.RowMain onChange={genreHandler}>
              <Create.Column>
                <Create.Row>
                  <Create.Checkbox type="radio" name="genre" value="adventure"/>
                  <Create.Text>Adventure</Create.Text>
                </Create.Row>
                <Create.Row>
                  <Create.Checkbox type="radio"name="genre" value="drama" />
                  <Create.Text>Drama</Create.Text>
                </Create.Row>
                <Create.Row>
                  <Create.Checkbox type="radio" name="genre" value="fantasy"/>
                  <Create.Text>Fantasy</Create.Text>
                </Create.Row>
                <Create.Row>
                  <Create.Checkbox type="radio" name="genre" value="horror"/>
                  <Create.Text>Horror</Create.Text>
                </Create.Row>
              </Create.Column>
              <Create.Column>
                <Create.Row>
                  <Create.Checkbox type="radio" name="genre"value="historical"/>
                  <Create.Text>Historical</Create.Text>
                </Create.Row>
                <Create.Row>
                  <Create.Checkbox type="radio" name="genre" value="rpg"/>
                  <Create.Text>RPG</Create.Text>
                </Create.Row>
                <Create.Row>
                  <Create.Checkbox type="radio"name="genre"value="sci-fi" />
                  <Create.Text>Sci-Fi</Create.Text>
                </Create.Row>
                <Create.Row>
                  <Create.Checkbox type="radio"name="genre"value="romance" />
                  <Create.Text>Romance</Create.Text>
                </Create.Row>
              </Create.Column>
            </Create.RowMain>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Create.Text>
              Where on the interwebs can we find this?
              <span style={{ color: "red" }}>*</span>
            </Create.Text>
            <Create.Input
              name="whereToFind"
              placeholder="A URL where we can play/watch/read this content."
              
              onChange={onChangeHandler}
              value={whereToFind}
            />
          </div>
          <Create.Submit type="submit" buttonEnabled={buttonEnabled} />
        </div>
        </Create.Base>

      </Create>
    </>
  );
}
