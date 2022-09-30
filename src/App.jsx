import './App.css';

import AuthenticationContextProvider from './contexts/auth-context';
import AlertContextProvider from './contexts/alert-context';
import LanguageContextProvider from './contexts/lang-context';

function App() {
	return (
		<LanguageContextProvider>
			<AlertContextProvider>
				<AuthenticationContextProvider>

				</AuthenticationContextProvider>
			</AlertContextProvider>
		</LanguageContextProvider>
	);
}

export default App;
