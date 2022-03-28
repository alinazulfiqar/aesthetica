import React from "react";
import { MenuContainer } from "../containers/menu";
import { ItemContainer } from "../containers/item";
import { CommentsContainer } from "../containers/comments";
import HeaderContainer from "../containers/header";

export default function Item() {
  return (
    <>
      <HeaderContainer />
      <MenuContainer />
      <ItemContainer />
      <CommentsContainer />
    </>
  );
}
