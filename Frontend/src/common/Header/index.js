import { Row, Button } from "antd";
import Container from "../Container";
import {
    HeaderSection,
    LogoContainer,
    Logo,
    LoginSignupButtonWrapper
} from "./styles";

const LoginSignupButton = () => {
    return (
        <LoginSignupButtonWrapper 
            type="ghost" 
            shape="round"
            size="large"
        >
            Log in / Sign up
        </LoginSignupButtonWrapper>
    )
}

const Header = () => {
    return (
        <HeaderSection>
            <Container>
                <Row justify="space-between">
                    <LogoContainer to="/" aria-label="homepage">
						<Logo>PeerProgram</Logo>
					</LogoContainer>

                    <LoginSignupButton/>
                </Row>
            </Container>
        </HeaderSection>
    )
}

export default Header;