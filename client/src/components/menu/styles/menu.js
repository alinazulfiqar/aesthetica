import styled from "styled-components/macro";

export const Container = styled.div`
@media(max-width:840px){
  // add a min-width for this
  
  transform: ${({hideMenu}) => hideMenu ? 'translateX(-295px)' : 'translateX(0);'};
  transition: transform 0.2s;
  min-width: 20vw;
}
@media(max-width:400px){
  min-width: 60%;
}

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgb(0, 0, 0);
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 1) 0%,
    rgba(58, 3, 88, 1) 100%
  );
  height: 100%;
  min-width: 20vw;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 10px;
    }
    
    
    ::-webkit-scrollbar-thumb {
    background:black; 
    border-radius: 10px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
    background:rgb(54, 56, 58); 

 z-index:5;
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding-right: 0;
  padding-left: 0;
  margin-bottom: 2rem;
  width: 100%;
`;

export const ListItem = styled.li`
  list-style-type: none;
`;

export const Icon = styled.img`
min-width: 10vw;
margin-top: 0.5rem;
margin-bottom: 1.5rem;
`;

export const Text = styled.p`
  color: #c4aead;
  font-weight: bolder;
  border-bottom: none;
  transition: border-bottom 0.2s;
  font-size: 1.2rem;
  letter-spacing: 1.5px;
  transition: all 0.2s ease-out;

  :hover {
    border-bottom: 4px solid hsl(317 100% 54%);
  }
`;

export const FilterIcon = styled.img`
  width: 2vw;
  height: 2vh;
`;
export const FilterText = styled.p`
  color: #c4aead;
  text-transform: capitalize;
`;

export const FilterTitle = styled.h3`
  color: #c4aead;
  cursor: pointer;
  padding-left: 0.5rem;
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

export const FilterListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FilterListText = styled.div`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  width: 100%;
  margin-left: 50%;
`;
export const FilterList = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  background-color: ${({ isChecked }) =>
    isChecked ? "hsl(317 100% 54%)" : "white"};
  border: 1px solid hsl(317 100% 54%);
`;
