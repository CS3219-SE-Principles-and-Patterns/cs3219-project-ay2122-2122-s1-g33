import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';
import { ThemeProvider } from 'styled-components';
import theme from './Theme';

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<React.StrictMode>
			<Router>
				<Auth0ProviderWithHistory>
					<App/>
				</Auth0ProviderWithHistory>
			</Router>
		</React.StrictMode>
	</ThemeProvider>,
document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
