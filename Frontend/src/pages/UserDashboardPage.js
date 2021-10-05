import { useAuth0 } from "@auth0/auth0-react";
import Header from "../common/Header";
import Container from "../common/Container";

const UserDashboardPage = () => {
    const { user } = useAuth0();
    const { sub, email } = user;

    return (
        <>
            <Header/>
            <Container>
                Logged in user email: {email}
                <br/>
                put user dashboard here
            </Container>
        </>
    )
}

export default UserDashboardPage;