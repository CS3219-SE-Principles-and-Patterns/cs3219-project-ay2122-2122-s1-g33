import styled from "styled-components";
import { Button } from "antd";

export const ButtonWrapper = styled(Button)`
    color: ${props => props.theme.dark};;
    border-color: ${props => props.theme.dark};;
    &:hover,
    &:active,
    &:focus {
        color: white;
        border-color: white;
        background-color: ${props => props.theme.dark};;
    }
`