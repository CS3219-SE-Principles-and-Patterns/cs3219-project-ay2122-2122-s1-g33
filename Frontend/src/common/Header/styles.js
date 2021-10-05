import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "antd";

export const HeaderSection = styled("header")`
    padding: 1rem 0.5rem;
    background: #f8f9fa;
    .ant-row-space-between {
        align-items: center;
        text-align: center;
    }

    .ant-btn {
        border-radius: 20px;
    }
`;

export const LogoContainer = styled(Link)`
	display: flex;
`;

export const Logo = styled("div")`
	color: black;
	font-size: 40px;
	// line-height: 1.18;
	font-weight: 600;
	letter-spacing: -2px;
`

export const ButtonWrapper = styled(Button)`
    color: #343a40;
    border-color: #343a40;
    &:hover,
    &:active,
    &:focus {
        color: white;
        border-color: white;
        background-color: #343a40;
    }
`