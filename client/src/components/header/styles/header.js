import styled from "styled-components/macro";

export const Container = styled.div`
  // margin-left: 20rem;
  
`;

export const Icon = styled.img`
  cursor: pointer;
  height: 4vh;
  width: 4vw;
  top: 0;
  right: 0;
  position: fixed;
 
  :nth-of-type(1){
    filter: brightness(0) saturate(100%) invert(82%) sepia(9%) saturate(409%)
    hue-rotate(314deg) brightness(87%) contrast(90%);
  }
  :nth-of-type(2){
    @media(max-width:840px){
      opacity:1;
    }
    opacity:0;
    top: 0;
    left: 0;
    position: fixed;
    z-index: 5;
    filter: brightness(0) saturate(100%) invert(82%) sepia(9%) saturate(409%)
    hue-rotate(314deg) brightness(87%) contrast(90%);
  }
 
  `;

export const Bar = styled.div`
  // margin-top: 1.8rem;
  position:fixed;
  top:1.75rem;
  right:0;
  display: flex;
  flex-direction: column;
  color: #c4aead;
  min-width: 15vw;
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 1) 0%,
    rgba(58, 3, 88, 1) 100%
  );
justify-content: start;
align-items: center;
align-self: end;
  display: ${({ showBar }) => (showBar ? "flex" : "none")};

  a {
    color: #c4aead;
  }
`;

export const BarLink = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.p`
  :hover {
    border-bottom: 4px solid hsl(317 100% 54%);
  }
`;

export const TextReg = styled(Text)``;
export const LinkIcon = styled.img`
  height: 3vh;
  width: 3vw;
  filter: invert(100%);
`;
