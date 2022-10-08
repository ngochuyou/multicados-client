import AuthenticationContextProvider from './auth-context';
import AlertContextProvider from './alert-context';
import LanguageContextProvider from './lang-context';
import ProductContextProvider from './product-context';

export default function GlobalContext({ children }) {
	return (
		<LanguageContextProvider>
			<AlertContextProvider>
				<AuthenticationContextProvider>
					<ProductContextProvider>
					{ children }
					</ProductContextProvider>
				</AuthenticationContextProvider>
			</AlertContextProvider>
		</LanguageContextProvider>
	);
}