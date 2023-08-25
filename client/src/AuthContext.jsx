import axios from "axios";
import Cookies from "js-cookie";
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [ready, setReady] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		// Load data from local storage on component mount
		const storedData = localStorage.getItem("userData");
		if (storedData) {
			setUser(storedData);
		}
	}, []);

	useEffect(() => {
		if (!user) {
			axios
				.get("/user/profile")
				.then((response) => {
					setUser(response.data);
					setReady(true);
				})
				.catch((error) => {
					toast.error("Unauthorized User / Session Expired");
					toast.error("Returning to Authentication Page");
					localStorage.clear();
					Cookies.remove("token");
					setUser(null);
					navigate("/authenticate");
				});
		}
	}, []);

	useEffect(() => {
		// Save data to local storage whenever it changes
		if (user !== null) {
			localStorage.setItem("userData", JSON.stringify(user));
		} else {
			setUser(null);
		}
	}, [user]);

	return (
		<AuthContext.Provider value={{ ready, user, setUser, setReady }}>
			{children}
		</AuthContext.Provider>
	);
};

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context comopnent.
export default function useAuth() {
	return useContext(AuthContext);
}
