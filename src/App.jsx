import './App.css';

import AuthenticationContextProvider from './contexts/auth-context';
import AlertContextProvider from './contexts/alert-context';

function App() {
	return (
		<AlertContextProvider>
			<AuthenticationContextProvider>

			</AuthenticationContextProvider>
		</AlertContextProvider>
	);
}

export default App;
