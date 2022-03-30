import React, {useContext} from "react";
import { Link as ReactRouterLink } from "react-router-dom";

import {
  Container,
  Header,
  Panel,
  PanelTitle,
  PanelRow,
  PanelBox,
  ItemText,
  Text,
  ItemLogo,
  IconPanel,
  TitleBig,
  AddToList,
  ListPanelRow,
  ItemUpvote,
  ItemDownvote,
  Count,
} from "./styles/discover";
import { FilterContext } from "../menu/FilterContext";

export default function Discover({ children, ...restProps }) {
  const {hideMenu, setHideMenu} = useContext(FilterContext)
  return <Container hideMenu={hideMenu} {...restProps}>{children}</Container>;
}

Discover.Header = function DiscoverHeader({ children }) {
  return <Header>{children}</Header>;
};
Discover.Panel = function DiscoverPanel({ children }) {
  return <Panel>{children}</Panel>;
};

Discover.PanelTitle = function DiscoverPanelTitle({ children }) {
  return <PanelTitle>{children}</PanelTitle>;
};
Discover.Text = function DiscoverText({ children }) {
  return <Text>{children}</Text>;
};
Discover.PanelRow = function DiscoverPanelRow({ key, children }) {
  return <PanelRow key={key}>{children}</PanelRow>;
};
Discover.ListPanelRow = function DiscoverListPanelRow({ children }) {
  return <ListPanelRow>{children}</ListPanelRow>;
};
Discover.PanelBox = function DiscoverPanelBox({
  to,
  bg,
  children,
  ...restProps
}) {
  return (
    <ReactRouterLink to={to}>
      <PanelBox bg={bg} {...restProps}>
        {children}
      </PanelBox>
    </ReactRouterLink>
  );
};

Discover.ItemText = function DiscoverItemText({ children }) {
  return <ItemText>{children}</ItemText>;
};

Discover.TitleBig = function DiscoverTitleBig({ children }) {
  return <TitleBig>{children}</TitleBig>;
};
Discover.ItemLogo = function DiscoverItemLogo({ src, ...restProps }) {
  return <ItemLogo src={src} {...restProps}  />;
};

Discover.ItemUpvote = function DiscoverItemUpvote({
  voted,
  src,
  ...restProps
}) {
  return <ItemUpvote voted={voted} src={src} {...restProps} alt="upvote" />;
};

Discover.ItemDownvote = function DiscoverItemDownvote({
  downvoted,
  src,
  ...restProps
}) {
  return (
    <ItemDownvote
      downvoted={downvoted}
      src={src}
      {...restProps}
      alt="Downvote"
    />
  );
};

Discover.IconPanel = function DiscoverIconPanel({ children, ...restProps }) {
  return <IconPanel {...restProps}>{children}</IconPanel>;
};

Discover.AddToList = function DiscoverAddToList({ src, ...restProps }) {
  return <AddToList src={src} {...restProps}></AddToList>;
};

Discover.Count = function DiscoverCount({ ...restProps }) {
  return <Count {...restProps}></Count>;
};
