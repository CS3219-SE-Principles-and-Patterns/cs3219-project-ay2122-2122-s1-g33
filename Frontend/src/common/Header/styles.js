import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderSection = styled("header")`
    padding: 1rem 0.5rem;
    background: ${props => props.theme.gray};
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
	color: ${props => props.theme.dark};
	font-size: 40px;
	font-weight: 600;
	letter-spacing: -2px;
`