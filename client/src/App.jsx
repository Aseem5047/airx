import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Auth from "./pages/Auth";
import NavbarItems from "./components/NavbarItems";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth, { AuthProvider } from "./AuthContext";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import PlacesForm from "./components/PlacesForm";
import PlacePage from "./pages/PlacePage";
import BookingPage from "./pages/BookingPage";

function App() {
	const location = useLocation();
	const { pathname } = location;

	const [loading, setLoading] = useState(true);

	const user = localStorage.getItem("userData");
	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);

	// console.log(user);

	axios.defaults.baseURL = "http://127.0.0.1:5000";
	axios.defaults.withCredentials = true;

	return (
		<>
			<AuthProvider>
				{loading ? (
					<div className="h-screen flex items-center justify-center">
						<img
							src="https://cdn.dribbble.com/users/1813781/screenshots/5597337/dribbble-girl-with-clock.gif"
							alt=""
							className="m-auto rounded-xl w-80 h-60"
						/>
					</div>
				) : (
					<div
						className={`flex flex-col items-center relative w-full h-screen py-4 px-4 lg:px-[80px]`}
					>
						{<Navbar />}
						{/* <NavbarItems /> */}
						<div className={`mt-[6rem] w-full h-full md:mb-16`}>
							<Routes>
								<Route index element={<HomePage />} />
								<Route path="/authenticate" element={<Auth />} />

								<Route
									path="/user/profile/:id?/:subpage?"
									element={user ? <Profile /> : <Navigate to="/authenticate" />}
								/>

								<Route
									path="/user/profile/:id?/:subpage?/:bookingId?"
									element={
										user ? <BookingPage /> : <Navigate to="/authenticate" />
									}
								/>

								<Route
									path="/user/profile/:id?/places/new"
									element={
										user ? <PlacesForm /> : <Navigate to="/authenticate" />
									}
								/>
								<Route
									path="/user/profile/:id?/places/:placeId"
									element={
										user ? <PlacesForm /> : <Navigate to="/authenticate" />
									}
								/>
								<Route
									path="/user/profile/:id?/edit"
									element={
										user ? <EditProfile /> : <Navigate to="/authenticate" />
									}
								/>
								<Route
									path="/place/:id"
									element={
										user ? <PlacePage /> : <Navigate to="/authenticate" />
									}
								/>
							</Routes>
						</div>

						{pathname === "/" && <Footer />}
					</div>
				)}
			</AuthProvider>
		</>
	);
}

export default App;
