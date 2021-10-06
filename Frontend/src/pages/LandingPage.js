import Header from "../common/Header";
import Button from "../components/Button";
import { useAuth0 } from "@auth0/auth0-react";


const LandingPage = () => {
    const { loginWithRedirect } = useAuth0();
    return (
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
    )
}

export default LandingPage;