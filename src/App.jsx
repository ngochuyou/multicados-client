import './App.css';

import { Outlet } from 'react-router-dom';

import GlobalContext from './contexts/global-context';

import Navbar from './components/controls/navs/Navbar';

function App() {
	return (
		<GlobalContext>
			<Navbar/>
			<main className="uk-padding-small">
				<Outlet/>
			</main>
		</GlobalContext>
	);
}

export default App;
