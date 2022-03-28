import React, {useContext} from "react";
import {
  Container,
  List,
  ListItem,
  Icon,
  Text,
  FilterIcon,
  FilterText,
  FilterTitle,
  FilterContainer,
  FilterList,
  FilterListText,
  FilterListContainer,
} from "./styles/menu";
import { Link as ReactRouterLink } from "react-router-dom";
import { FilterContext } from "./FilterContext";

export default function Menu({ children, ...restProps }) {
  const {hideMenu, setHideMenu} = useContext(FilterContext)
  return <Container hideMenu={hideMenu} {...restProps}>{children}</Container>;
}

Menu.List = function MenuList({ children }) {
  return <List>{children}</List>;
};

Menu.ListItem = function MenuListItem({ to, children }) {
  return (
    <ReactRouterLink to={to}>
      <ListItem>{children}</ListItem>
    </ReactRouterLink>
  );
};

Menu.Icon = function MenuIcon({ ...restProps }) {
  return <Icon {...restProps}></Icon>;
};

Menu.Text = function MenuText({ children }) {
  return <Text>{children}</Text>;
};

Menu.FilterTitle = function MenuFilterTitle({ children }) {
  return <FilterTitle>{children}</FilterTitle>;
};

Menu.FilterIcon = function MenuFilterIcon({ children, ...restProps }) {
  return <FilterIcon {...restProps}>{children}</FilterIcon>;
};

Menu.FilterText = function MenuFilterText({ children }) {
  return <FilterText>{children}</FilterText>;
};

Menu.FilterListText = function MenuFilterListText({ children }) {
  return <FilterListText>{children}</FilterListText>;
};

Menu.FilterList = function MenuFilterList({
  isChecked,
  children,
  ...restProps
}) {
  return (
    <FilterList isChecked={isChecked} {...restProps}>
      {children}
    </FilterList>
  );
};
Menu.FilterContainer = function MenuFilterContainer({
  children,
  ...restProps
}) {
  return <FilterContainer {...restProps}>{children}</FilterContainer>;
};

Menu.FilterListContainer = function MenuFilterListContainer({ children }) {
  return <FilterListContainer>{children}</FilterListContainer>;
};
