import styled from "styled-components/macro";

export const Container = styled.div`
  margin-left: 18rem;
  color: #c4aead;
  padding: 2rem 8rem;
 
  @media(max-width:840px){
    margin: auto;
  padding: 2rem 2rem;

  }
`;

export const TextSmall = styled.p`
  font-size: 0.75rem;
  font-weight: bolder;

  :last-of-type {
    cursor: pointer;
  }
`;

export const CommentContainer = styled.form``;

export const CommentBox = styled.textarea`
  border: 1px solid hsl(317 100% 54%);
  background: black;
  max-width: 95%;
  color: #c4aead;
`;

export const ReplyContainer = styled(CommentContainer)``;
export const ReplyBox = styled(CommentBox)``;

export const Submit = styled.input`
  border-radius: 9999px;
  border: 2px solid #c4aead;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-top: 1rem;
  color: hsl(317 100% 54%);
  background: black;

  :hover {
    border: 2px solid white;
  }
`;
export const CommentRow = styled.div`
  margin-top: 3rem;
  border-left: 1px #c4aead solid;
  padding: 16px;
`;

export const CommentText = styled.p``;

export const CommentBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  filter: invert(100%);
  :first-of-type {
    filter: ${({ voted }) =>
      voted === true
        ? "invert(21%) sepia(100%) saturate(2096%) hue-rotate(289deg) brightness(116%) contrast(131%)"
        : "invert(100%) sepia(100%) saturate(0%) hue-rotate(125deg) brightness(103%) contrast(103%)"};
  }

  :nth-of-type(2) {
    filter: ${({ downvoted }) =>
      downvoted === true
        ? "invert(87%) sepia(86%) saturate(5499%) hue-rotate(334deg) brightness(109%) contrast(96%);"
        : "invert(100%) sepia(100%) saturate(0%) hue-rotate(125deg) brightness(103%) contrast(103%)"};
  }

  cursor: pointer;
`;

