import Header from "../common/Header";
import Button from "../components/Button";
import { useAuth0 } from "@auth0/auth0-react";
import Container from "../common/Container";
import { Image, Row, Col } from 'antd'
import Title from "../common/Title";

const LandingPage = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <>
        <Header>
            <Button
                type="ghost" 
                shape="round"
                size="large"
                onClick={() => loginWithRedirect({
                    screen_hint: "signup",
                    appState: {
                        returnTo: 'dashboard'
                    }
                })}
                label="Log in / Sign up"
            />
        </Header>
        <Container>
            <Row justify="center">
                <Col>
                    <Row justify="center">
                        <Image
                            preview={false}
                            src="landingpage.png"
                        />
                    </Row>
                    <Row justify="center">
                        <Title>Collaborative Code Made Easy </Title>
                    </Row>
                    <Row style={{textAlign: 'center'}} justify="center">
                        <h3 style={{
                            maxWidth: '80%',
                            marginBottom: '30px'
                        }}>
                            A real time code editor that allows mutliple users to share, edit and execute the same piece of code live
                        </h3>
                    </Row>
                    <Row justify="center">
                        <Button
                            type="ghost" 
                            shape="round"
                            size="large"
                            onClick={() => loginWithRedirect({
                                screen_hint: "signup",
                                appState: {
                                    returnTo: 'dashboard'
                                }
                            })}
                            label="Get Started"
                        />
                    </Row>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default LandingPage;