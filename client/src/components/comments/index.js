import React from "react";
import {
  Container,
  TextSmall,
  CommentBox,
  ReplyBox,
  ReplyContainer,
  CommentRow,
  CommentText,
  CommentBar,
  CommentContainer,
  Icon,
  Submit,
} from "./styles/comments";

export default function Comments({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Comments.TextSmall = function CommentsTextSmall({ children, ...restProps }) {
  return <TextSmall {...restProps}>{children}</TextSmall>;
};

Comments.Submit = function CommentsSubmit({ children, ...restProps }) {
  return (
    <Submit type="Submit" defaultValue="Comment" {...restProps}>
      {children}
    </Submit>
  );
};

Comments.CommentContainer = function CommentsCommentContainer({
  children,
  ...restProps
}) {
  return <CommentContainer {...restProps}>{children}</CommentContainer>;
};

Comments.ReplyContainer = function CommentsReplyContainer({
  children,
  ...restProps
}) {
  return (
    <ReplyContainer {...restProps}>
      {children}
      <Submit type="Submit" defaultValue="Reply" />
    </ReplyContainer>
  );
};

Comments.CommentBox = function CommentsCommentBox({ children, ...restProps }) {
  return <CommentBox {...restProps}>{children}</CommentBox>;
};

Comments.ReplyBox = function CommentsReplyBox({ children, ...restProps }) {
  return <ReplyBox {...restProps}>{children}</ReplyBox>;
};

Comments.CommentRow = function CommentsCommentRow({ children, ...restProps }) {
  return <CommentRow {...restProps}>{children}</CommentRow>;
};

Comments.CommentText = function CommentsCommentText({
  children,
  ...restProps
}) {
  return <CommentText {...restProps}>{children}</CommentText>;
};

Comments.CommentBar = function CommentsCommentBar({ children, ...restProps }) {
  return <CommentBar {...restProps}>{children}</CommentBar>;
};

Comments.Icon = function CommentsIcon({ src, children, ...restProps }) {
  return (
    <Icon src={src} {...restProps}>
      {children}
    </Icon>
  );
};
