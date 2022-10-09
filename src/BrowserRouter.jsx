import App from './App';
import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
} from "react-router-dom";

import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path="/"
			element={<App />}
			errorElement={<ErrorPage />}
		>
			<Route path=":categoryId" element={<HomePage />} />
			<Route path="" element={<HomePage />} />
		</Route>
	)
);

export default function BrowserRouter() {
	return <RouterProvider router={router}></RouterProvider>
}