import LandingPage from "./pages/LandingPage";
import { Route, Switch, Redirect } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import UserDashboardPage from "./pages/UserDashboardPage";

const App = () => {
	const { isAuthenticated } = useAuth0();

	return (
		<>
			<Switch>
				<Route exact path="/">
					{isAuthenticated ? <UserDashboardPage/> : <LandingPage/>}
				</Route>
			</Switch>
		</>
	);
};

export default App;
