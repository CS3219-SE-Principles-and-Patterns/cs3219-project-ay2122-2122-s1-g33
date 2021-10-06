import LandingPage from "./pages/LandingPage";
import { Route, Switch, Redirect } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import ProtectedRoute from "./auth/protected-route";
import UserDashboardPage from "./pages/UserDashboardPage";
import LoadingPage from "./pages/LoadingPage";
import DocPage from "./pages/DocPage";

const App = () => {
	const { isAuthenticated, isLoading } = useAuth0();
	
	return (
		<>
			<Switch>
				<Route exact path="/">
                    {isAuthenticated 
                        ? <Redirect to='/dashboard'/>
                        : (
                            isLoading ? <LoadingPage/> : <LandingPage/>
                        )
                    }
                </Route>
                <ProtectedRoute exact path="/dashboard" component={UserDashboardPage}/>
                <Route path="/doc/:id" component={DocPage}/>
			</Switch>
		</>
	);
};

export default App;
