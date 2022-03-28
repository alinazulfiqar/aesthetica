import React from "react";
import {
  Container,
  Box,
  TextCard,
  HeaderImage,
  Icon,
  Text,
  Subtitle,
  Title,
  Panel,
  Header,
  WhereToFind,
  IconPanel,
} from "./styles/item";

export default function Item({ children }) {
  return <Container>{children}</Container>;
}

Item.Box = function ItemBox({ children }) {
  return <Box>{children}</Box>;
};

Item.TextCard = function ItemTextCard({ children }) {
  return <TextCard>{children}</TextCard>;
};

Item.HeaderImage = function ItemHeaderImage({ src, children }) {
  return <HeaderImage src={src}>{children}</HeaderImage>;
};

Item.Text = function ItemText({ children }) {
  return <Text>{children}</Text>;
};

Item.IconPanel = function ItemIconPanel({ children }) {
  return <IconPanel>{children}</IconPanel>;
};

Item.Title = function ItemTitle({ children }) {
  return <Title>{children}</Title>;
};

Item.Subtitle = function ItemSubtitle({ children }) {
  return <Subtitle>{children}</Subtitle>;
};

Item.Header = function ItemHeader({ children }) {
  return <Header>{children}</Header>;
};

Item.Icon = function ItemIcon({ src, children, ...restProps }) {
  return (
    <Icon src={src} {...restProps}>
      {children}
    </Icon>
  );
};

Item.WhereToFind = function ItemWhereToFind({ src, children }) {
  return <WhereToFind src={src}>{children}</WhereToFind>;
};
Item.Panel = function ItemPanel({ src, children }) {
  return <Panel>{children}</Panel>;
};
