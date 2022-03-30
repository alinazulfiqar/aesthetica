import React from "react";
import {
  Container,
  Title,
  Text,
  Input,
  Button,
  Checkbox,
  Row,
  Column,
  RowMain,
  Submit,
  Base
} from "./styles/create";

export default function Create({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Create.Title = function CreateTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Create.Text = function CreateText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

Create.Input = function CreateInput({ children, ...restProps }) {
  return <Input {...restProps}>{children}</Input>;
};

Create.Button = function CreateButton({ children, ...restProps }) {
  return <Button {...restProps}>{children}</Button>;
};

Create.Checkbox = function CreateCheckbox({ children, ...restProps }) {
  return <Checkbox {...restProps}>{children}</Checkbox>;
};

Create.Row = function CreateRow({ children, ...restProps }) {
  return <Row {...restProps}>{children}</Row>;
};

Create.Column = function CreateColumn({ children, ...restProps }) {
  return <Column {...restProps}>{children}</Column>;
};

Create.RowMain = function CreateRowMain({ children, ...restProps }) {
  return <RowMain {...restProps}>{children}</RowMain>;
};

Create.Submit = function CreateSubmit({ children, ...restProps }) {
  return <Submit {...restProps}>{children}</Submit>;
};

Create.Base = function CreateBase({ children, ...restProps }) {
  return <Base {...restProps}>{children}</Base>;
};
