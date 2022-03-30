import React from 'react'
import {
    Container, 
    Text,
    Button,
    ButtonText
} from "./styles/modal"


export default function Modal({ children, ...restProps }) {
    return <Container {...restProps}>{children}</Container>;
  }

Modal.Text = function ModalText({children,...restProps}) {
    return <Text{...restProps}>{children}</Text>
}

Modal.Button = function ModalButton({children,...restProps}) {
    return <Button{...restProps}>{children}</Button>
}

Modal.ButtonText = function ModalButtonText({children,...restProps}) {
    return <ButtonText{...restProps}>{children}</ButtonText>
}