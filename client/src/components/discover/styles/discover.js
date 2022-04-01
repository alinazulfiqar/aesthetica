import styled from "styled-components/macro";

export const Container = styled.div`
  margin-left: 20vw;
  background: #000000;
`;
const backgrounds = [
  "https://64.media.tumblr.com/2bc084c044357fe1e782dd67441c9d4b/3c6fb81d2bd9fefd-f8/s1280x1920/edfef4fed1bed78493c9160d73553b84cb2eb073.gif",
  "https://i.imgur.com/guZva45.gif",
  "https://media.blenderartists.org/uploads/default/original/4X/3/a/6/3a61d3c690ef0c1b308d318d5c2655188756721e.jpeg",
  "https://i.pinimg.com/originals/18/b5/ea/18b5ea2167c8ce34ca09540552a05124.gif",
  "https://64.media.tumblr.com/8406e33e8f6702b142f60fdd4fae4ea3/tumblr_ovpgnaK7kY1r9co7bo1_1280.gifv",
  "https://i.pinimg.com/originals/50/65/14/5065148ee8ff9de0ec53885b73d3de79.gif",
  "https://cdna.artstation.com/p/assets/images/images/002/081/686/large/aleksandar-ivanov-cityscape.jpg?1456974552",
];
export const Header = styled.h1`
  color: #c4aead;
  text-align: center;
  display: flex;
  align-items: end;
  justify-content: center;
  font-size: 5rem;
  background: url(${backgrounds[
    Math.floor(Math.random() * backgrounds.length)
  ]});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100%;
  padding: 0;
  margin: 0;
`;
export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 2rem;
  :last-of-type {
    padding-bottom: 4rem;
  }
`;

export const PanelTitle = styled.h2`
  text-align: left;
  color: #c4aead;
  text-transform: capitalize;
`;

export const TitleBig = styled.h1`
  font-size: 2.5rem;
  color: #c4aead;
  text-align: center;
  margin-top: 5rem;
`;

export const PanelRow = styled.div`
  display: flex;
  flex-direction: row;
 min-height: 15rem;
 min-width: 15rem;
  overflow-x: scroll;

  ::-webkit-scrollbar{
    background: transparent;
    width:0;
  }
 

`;

export const ListPanelRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 4rem;

  @media(max-width:400px){
  grid-template-columns: repeat(2, 1fr);
    
  }
`;

export const ItemLogo = styled.img`
  height: 3vh;
  width: 3vw;
  // display: none;
  // filter: grayscale(100);
  }
`;

export const ItemUpvote = styled.img`
  height: 3vh;
  width: 3vw;
  transition: filter 0.05s;
  filter: ${({ voted }) =>
    voted === true
      ? "invert(21%) sepia(100%) saturate(2096%) hue-rotate(289deg) brightness(116%) contrast(131%)"
      : "invert(100%) sepia(100%) saturate(0%) hue-rotate(125deg) brightness(103%) contrast(103%)"};
`;

export const ItemDownvote = styled.img`
  height: 3vh;
  width: 3vw;
  transition: filter 0.05s;

  filter: ${({ downvoted }) =>
    downvoted === true
      ? "invert(87%) sepia(86%) saturate(5499%) hue-rotate(334deg) brightness(109%) contrast(96%);"
      : "invert(100%) sepia(100%) saturate(0%) hue-rotate(125deg) brightness(103%) contrast(103%)"};
`;
export const AddToList = styled(ItemLogo)``;
export const IconPanel = styled.div`
  display: none;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`;

export const PanelBox = styled.div`
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.01),
      rgba(0, 0, 0, 0.7)
    ),
    url(${({ bg }) => bg});
  width: 20vw;
  height: 25vh;
  min-width: 10rem;
  margin-right: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: end;
  background-position: center;
  cursor: pointer;
  border-radius: 2px;
  transition: all 0.2s;

  :hover {
    transform: scale(1.5);
    ${IconPanel} {
      display: flex;
    }
  }
`;

export const ItemText = styled.h3`
  color: #acacac;
  // background-color: rgb(0, 0, 0, 0.3);
  width: 100%;
  text-align: center;
`;

export const Text = styled.p`
  background: rgb(0, 0, 0, 0.3);
  width: 100%;
`;

export const Count = styled.p`
  margin: auto;
  color: white;
  // border: 1px solid red;
`;
