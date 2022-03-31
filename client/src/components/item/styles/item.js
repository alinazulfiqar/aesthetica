import styled from "styled-components/macro";

export const Container = styled.div`
@media(max-width:840px){
  margin: auto;
}
  margin-left: 15rem;
`;

export const Header = styled.div`
  background: url("https://64.media.tumblr.com/0870408ef69639327475f93f665ac490/5c7bd8bcc33b5478-02/s1280x1920/92566a2d5fc5c4d08e40d38fc23280518e40a36c.gif");
  background-repeat: no-repeat;
  background-position: center;
  height: 80vh;
  width: 100%;
`;
export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.p`
  color: #c4aead;
  text-align: justify;
`;

export const IconPanel = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  gap: .50rem;
  margin-bottom: 2rem;

  ${Text} {
    background: purple;
    border-radius: 9999px;
    padding: 0 0.5rem;
  }
`;

export const TextCard = styled.div`
  width: 40vw;
  font-size: 1.25rem;
  @media(max-width: 640px){
    width:80vw;
  }
`;

export const HeaderImage = styled.img`
  height: 40vh;
  min-width: 25vw;
  border-radius: 15%;
  transform: perspective(45rem) rotateY(25deg);

  @media(max-width: 640px){
    transform: perspective(0) rotateX(0);
    width:80vw;
  }
  // NOTE: add box shadow
`;

export const Title = styled.h1`
  color: #c4aead;
  font-size: 2.5rem;
  text-align: center;
`;
export const Subtitle = styled.h3`
  color: #c4aead;
`;
export const Icon = styled.img`
  height: 3rem;
  width: 3rem;
  padding-right: .25rem;

  :first-of-type {
    cursor: pointer;
    filter: invert(100%);
  }
  :nth-of-type(2){
    cursor: pointer;
  }
`;

export const Panel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 80%;
  
  gap: 2rem;
  @media(max-width: 640px){
    flex-direction: column;
  }
`;

export const WhereToFind = styled.button`
  --clr-neon: hsl(317 100% 54%);
  --clr-bg: hsl(323 21% 16%);
  font-size: 2rem;

  display: inline-block;
  cursor: pointer;
  text-decoration: none;
  color: var(--clr-neon);
  border: var(--clr-neon) 0.125em solid;
  padding: 0.25em 1em;
  border-radius: 0.25em;
  background: black;
  text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em currentColor;

  box-shadow: inset 0 0 0.5em 0 var(--clr-neon), 0 0 0.5em 0 var(--clr-neon);

  position: relative;
  margin: 2em 4em;
  @media(max-width:430px){
    margin: 1em 2em;

  }
  ::before {
    pointer-events: none;
    content: "";
    position: absolute;
    background: var(--clr-neon);
    top: 120%;
    left: 0;
    width: 100%;
    height: 100%;

    transform: perspective(1em) rotateX(40deg) scale(1, 0.35);
    filter: blur(1em);
    opacity: 0.7;
  }

  ::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: 0 0 2em 0.5em var(--clr-neon);
    opacity: 0;
    background-color: var(--clr-neon);
    z-index: -1;
    transition: opacity 100ms linear;
  }

  :hover,
  :focus {
    color: #c4aead;
    text-shadow: none;
  }

  :hover::before,
  :focus::before {
    opacity: 1;
  }
  :hover::after,
  :focus::after {
    opacity: 1;
  }
`;
