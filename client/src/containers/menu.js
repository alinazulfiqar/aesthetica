import React, { useState, useContext } from "react";
import { FilterContext } from "../components/menu/FilterContext";
import Menu from "../components/menu/index";
import * as ROUTES from "../constants/routes";
import right from "../images/right.svg";
import up from "../images/up.svg";
import logo from "../images/logo.svg"
import logo2 from "../images/logo2.svg"
import logo3 from "../images/logo3.svg"


export function MenuContainer({ children }) {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const { filterArray, setFilterArray, medium, setMedium, hideMenu, setHideMenu } = useContext(FilterContext);
  // const [push, setPush] = useState([]);

  const [isChecked, setIsChecked] = useState({});

  const onClickHandler = () => {
    setShow((show) => !show);
  };

  const onClickHandler2 = () => {
    setShow1((show1) => !show1);
  };

  const onChangeGenreHandler = (e) => {
    // console.log(e.target.checked, e.target.value);
    const values = e.target.value;
    const checked = e.target.checked;
    // const duplicate = push.find((item) => item.values === values);

    // if (duplicate) {
    //   const filtered = push.filter((array) => array.values !== values);
    //   push.pop();
    //   setFilterArray(filtered);
    // } else {
    // push.push({ values, checked });
    if (!checked){
      setFilterArray([])
    }else{
      setFilterArray({ values, checked, id: e.target.id });

    }


  };

  const onChangeMediumHandler = (e)=>{
    const values = e.target.value;
    const checked = e.target.checked;

    if (!checked){
      setMedium([])
    }else{
      setMedium({values, checked, id:e.target.id})

    }

    
  }

  const media = [
    "games",
    "TV/movies",
    "books"
  ]

  const genreArrays = [
    "adventure",
    "drama",
    "fantasy",
    "sci-fi",
    "romance",
    "horror",
    "historical",
    "RPG",
  ];
  return (
    <Menu>
      <Menu.List onClick={()=>setHideMenu(true)}>
        <Menu.ListItem to="/">
          <Menu.Icon src={logo3}/>
        </Menu.ListItem>
        <Menu.ListItem to="/cottagecore">
          <Menu.Text>Cottagecore</Menu.Text>
        </Menu.ListItem>
        <Menu.ListItem to="/steampunk">
          <Menu.Text>Steampunk</Menu.Text>
        </Menu.ListItem>
        <Menu.ListItem to="/cyberpunk">
          <Menu.Text>Cyberpunk</Menu.Text>
        </Menu.ListItem>
        <Menu.ListItem to="/dark-academia">
          <Menu.Text>Dark Academia</Menu.Text>
        </Menu.ListItem>
        <Menu.ListItem to="/medieval">
          <Menu.Text>Medieval</Menu.Text>
        </Menu.ListItem>
        <Menu.ListItem to="/victorian">
          <Menu.Text>Victorian</Menu.Text>
        </Menu.ListItem>
      </Menu.List>

<div>
      <Menu.FilterContainer onClick={() => onClickHandler()}>
        <Menu.FilterIcon src={show ? up : right} />
        <Menu.FilterTitle>FILTER BY GENRE</Menu.FilterTitle>
      </Menu.FilterContainer>
      {show ? (
        <Menu.FilterListContainer>
          {genreArrays.map((genre, index) => (
            <Menu.FilterListText>
              <Menu.FilterList
                key={index}
                id={index}
                type="checkbox"
                isChecked={
                  filterArray.checked === true && filterArray.id == index
                    ? true
                    : false
                }
                value={genre}
                label={genre}
                onChange={onChangeGenreHandler}
              ></Menu.FilterList>
              <Menu.FilterText>{genre}</Menu.FilterText>
            </Menu.FilterListText>
          ))}
        </Menu.FilterListContainer>
      ) : null}

<Menu.FilterContainer onClick={() => onClickHandler2()}>
        <Menu.FilterIcon src={show1 ? up : right} />
        <Menu.FilterTitle>FILTER BY MEDIUM</Menu.FilterTitle>
      </Menu.FilterContainer>
      {show1 ? (
        <Menu.FilterListContainer>
          {media.map((entry, index) => (
            <Menu.FilterListText>
              <Menu.FilterList
                key={index}
                id={index}
                type="checkbox"
                isChecked={
                  medium.checked === true && medium.id == index
                    ? true
                    : false
                }
                value={entry}
                label={entry}
                onChange={onChangeMediumHandler}
              ></Menu.FilterList>
              <Menu.FilterText>{entry}</Menu.FilterText>
            </Menu.FilterListText>
          ))}
        </Menu.FilterListContainer>
      ) : null}
      </div>
    </Menu>
  );
}
