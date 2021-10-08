import { Row } from "antd";
import Container from "../Container";
import {
    HeaderSection,
    LogoContainer,
    Logo
} from "./styles";

const Header = ({
    children
}) => {
    return (
        <HeaderSection>
            <Container>
                <Row justify="space-between">
                    <LogoContainer to="/" aria-label="homepage">
						<Logo>PeerProgram</Logo>
					</LogoContainer>

                    {children}
                </Row>
            </Container>
        </HeaderSection>
    )
}

export default Header;