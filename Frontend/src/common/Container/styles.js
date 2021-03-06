import styled from "styled-components";

export const StyledContainer = styled("div")`
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin-right: auto;
    margin-left: auto;
    padding: 0 60px;
    border-top: ${(props) => (props.border ? "1px solid #CDD1D4" : "")};
    // @media only screen and (max-width: 1024px) {
    //   max-width: ${props => props.isAuthenticated ? '100%' : 'calc(100% - 68px)'};
    //   padding: 0 30px;
    // }
    // @media only screen and (max-width: 768px) {
    //   max-width: calc(100% - 38px);
    //   padding: 0 18px;
    // }
    // @media only screen and (max-width: 414px) {
    //   max-width: 100%;
    //   padding: 0 18px;
    // }
`;