import React from "react";
import { DiscoverContainer } from "../containers/discover";
import HeaderContainer from "../containers/header";
import { MenuContainer } from "../containers/menu";

export default function Discover() {
  return (
    <>
      <HeaderContainer />
      <MenuContainer />
      <DiscoverContainer />
    </>
  );
}
