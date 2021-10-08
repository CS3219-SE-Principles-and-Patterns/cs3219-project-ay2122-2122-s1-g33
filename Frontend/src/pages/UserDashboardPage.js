import { useAuth0 } from "@auth0/auth0-react";
import Header from "../common/Header";
import FullContainer from "../common/FullContainer";
import Button from "../components/Button";
import DocsList from "../components/DocsList";

const UserDashboardPage = () => {
    const { user, logout } = useAuth0();
    const { sub, email } = user;

    return (
        <FullContainer>
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
            <DocsList/>
        </FullContainer>
    )
}

export default UserDashboardPage;