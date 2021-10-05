import { Row } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import Container from "../Container";
import {
    HeaderSection,
    LogoContainer,
    Logo,
    ButtonWrapper
} from "./styles";

const LoginSignupButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <ButtonWrapper 
            type="ghost" 
            shape="round"
            size="large"
            onClick={() => loginWithRedirect({
                screen_hint: "signup",
                appState: {
                    returnTo: 'dashboard'
                }
            })}
        >
            Log in / Sign up
        </ButtonWrapper>
    )
}

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <ButtonWrapper 
            type="ghost" 
            shape="round"
            size="large"
            onClick={() => logout({
                returnTo: window.location.origin
            })}
        >
            Log out
        </ButtonWrapper>
    )
}

const Header = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <HeaderSection>
            <Container>
                <Row justify="space-between">
                    <LogoContainer to="/" aria-label="homepage">
						<Logo>PeerProgram</Logo>
					</LogoContainer>

                    {isAuthenticated ? <LogoutButton/> : <LoginSignupButton/>}
                </Row>
            </Container>
        </HeaderSection>
    )
}

export default Header;