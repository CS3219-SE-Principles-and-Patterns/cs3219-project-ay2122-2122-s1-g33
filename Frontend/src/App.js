import LandingPage from "./pages/LandingPage";
import { Route, Switch, Redirect } from 'react-router';

const App = () => {
  return (
    <>
		<Switch>
			<Route exact path="/">
				<LandingPage/>
			</Route>
		</Switch>
	</>
  );
};

export default App;
