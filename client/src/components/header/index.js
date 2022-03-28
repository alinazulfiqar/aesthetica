import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  Container,
  Icon,
  Bar,
  BarLink,
  Text,
  LinkIcon,
  TextReg,
} from "./styles/header";

export default function Header({ children }) {
  return <Container>{children}</Container>;
}

Header.Icon = function HeaderIcon({ src, ...restProps }) {
  return (
    // <ReactRouterLink to={to}>
    <Icon src={src} {...restProps}/>
    // </ReactRouterLink>
  );
};


Header.Bar = function HeaderBar({ showBar, children }) {
  return <Bar showBar={showBar}>{children}</Bar>;
};

Header.BarLink = function HeaderBarLink({ children }) {
  return <BarLink>{children}</BarLink>;
};

Header.Text = function HeaderText({ to, children, ...restProps }) {
  return (
    <ReactRouterLink to={to}>
      <Text {...restProps}>{children}</Text>
    </ReactRouterLink>
  );
};
Header.LinkIcon = function HeaderLinkIcon({ src, children }) {
  return <LinkIcon src={src}>{children}</LinkIcon>;
};

Header.TextReg = function HeaderTextReg({ src, children }) {
  return <TextReg src={src}>{children}</TextReg>;
};
