import styled from "styled-components/macro";


export const Container = styled.div`
margin: auto;
border: 5px solid #c4aead;
padding: 0rem 2rem;
z-index: 500;
position: absolute;
top: 40%;
left: 40%;
min-width: 25vw;
height: 25vh;
color: #c4aead;
background: radial-gradient(
    circle,
    rgba(0, 0, 0, 1) 0%,
    rgba(58, 3, 88, 1) 100%
  );
@media(max-width:840px){
left: 25%;
}
@media(max-width:640px){
  position: absolute;
  right:0;
  left:0;
  width:80vw;
}
`
export const Text = styled.p`
text-align: center;
font-size: 1.25rem;
`
export const Button = styled.button`
padding: .5rem 1rem;
font-size: 1rem;
width: 5rem;
color: #c4aead;
background: black;
border: 1px solid white;
cursor: pointer;

`
export const ButtonText = styled.p``