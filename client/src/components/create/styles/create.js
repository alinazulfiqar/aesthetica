import styled from "styled-components/macro";

export const Container = styled.div`
  margin-left: 20rem;
  color: #c4aead;
  @media(max-width:840px){
    margin: auto;
  }
`;
export const Title = styled.h1`
  text-align: center;
`;
export const Text = styled.p`
  font-size: 1.4rem;
  text-align: center;
`;
export const Input = styled.input`
  background: white;
  height: 2rem;
  color: black;
  width: 90vw;

`;
export const Button = styled.input`
  cursor: pointer;
  -webkit-appearance:none;
  background-color: transparent;
  background-image: url(${({ bg }) => bg});
  background-repeat: no-repeat;
  background-position: center;
  width: 10vw;
  height: 10vh;

  :checked {
    transform: translateY(4px);
    border: 5px solid red;
  }
`;
export const Checkbox = styled.input``;

export const RowMain = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5rem;
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Submit = styled.input`
  padding: 1rem 3.5rem;
  cursor: ${({buttonEnabled})=> buttonEnabled === true ? "pointer" : "none"};
  font-size: 1.5rem;
  color: #c4aead;
  background: ${({buttonEnabled}) => buttonEnabled ===true? 'rgb(51,3,77)' : 'red'} ;
  border: 2px solid #c4aead;
  margin-bottom: 1rem;

  ${({buttonEnabled}) => buttonEnabled === true ? ":hover{background:transparent;border: 2px solid #FFF01F;}" : null}
  
`;

export const Base = styled.form``