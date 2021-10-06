import { useAuth0 } from "@auth0/auth0-react";
import Header from "../common/Header";
import Container from "../common/Container";
import Button from "../components/Button";

const UserDashboardPage = () => {
    const { user, logout } = useAuth0();
    const { sub, email } = user;

    return (
        <>
            <Header>
                <Button
                    type="ghost" 
                    shape="round"
                    size="large"
                    onClick={() => logout({
                        returnTo: window.location.origin
                    })}
                    label="Log out"
                />
            </Header>
            <Container>
                Logged in user email: {email}
                <br/>
                put user dashboard here
            </Container>
        </>
    )
}

export default UserDashboardPage;