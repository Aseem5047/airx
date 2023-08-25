import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../AuthContext";
import axios from "axios";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";

const Navbar = () => {
	const navigate = useNavigate();

	const [toggleMenu, setToggleMenu] = useState(false);
	const location = useLocation();
	const { pathname } = location;
	const { user, setUser } = useAuth();
	const baseUrl = "http://localhost:5000";
	// console.log(user);

	const handleLogout = (e) => {
		e.preventDefault();
		setToggleMenu(false);
		localStorage.clear();
		Cookies.remove("token");
		setUser(null);
		toast.success("User Logged Out");
		toast.success("Returning to Authentication Page");
		navigate("/authenticate");
	};

	// List of image filenames
	var imageList = ["1.png", "2.png", "3.png", "4.png", "5.png"];

	// Check if a random image is already stored
	var storedImage = localStorage.getItem("randomImage");

	// If no image is stored, generate a random index and select an image
	if (!storedImage) {
		var randomIndex = Math.floor(Math.random() * imageList.length);
		var randomImage = imageList[randomIndex];
		localStorage.setItem("randomImage", randomImage);
	} else {
		// Use the stored image if available
		randomImage = storedImage;
	}
	return (
		<>
			<div className=" py-6 px-4 lg:px-[80px] h-[5.2rem] bg-white z-40 flex items-center justify-between fixed top-0  w-full transition-all duration-300 ease-linear shadow shadow-gray-200">
				{/* Main Logo */}
				<Link to="/" className="">
					<img
						src="/assets/air.svg"
						alt=""
						className="text-primary cursor-pointer hover:animate-pulse h-8 w-28"
					/>
				</Link>
				{/* Search Bar  */}
				<div
					className={`${
						pathname === "/authenticate"
							? "hidden"
							: "hidden mx-auto md:flex gap-2 text-[14px] text-[#222222] font-medium items-center justify-center py-2 px-8 border border-gray-300 shadow-md shadow-gray-300 rounded-full "
					}`}
				>
					<span className="cursor-pointer">Anywhere</span>
					<div className="h-6 mx-2 border-l border-gray-300"></div>
					<span className="cursor-pointer">Any Week</span>
					<div className="h-6 mx-2 border-l border-gray-300"></div>
					<div className="flex items-center justify-center gap-4">
						<p className="cursor-pointer">Add Guest</p>
						<button className="bg-primary  rounded-full p-2 text-white hover:animate-pulse">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="3"
								stroke="currentColor"
								className="w-4 h-4"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
								/>
							</svg>
						</button>
					</div>
				</div>
				{/* third section navbar */}
				<div
					className=" relative flex items-center justify-center gap-4 "
					// onMouseEnter={() => setToggleMenu(true)}
				>
					{toggleMenu && (
						<div
							className="absolute min-w-[13rem] w-full top-14 right-0 flex flex-col gap-4 text-[15px] text-black font-normal items-center justify-center py-2 border border-gray-300 rounded-lg z-40 shadow-md shadow-gray-300 bg-white"
							onMouseLeave={() => setToggleMenu(false)}
						>
							<div className="flex flex-col w-full justify-start text-start gap-2">
								<Link
									to={"/"}
									onClick={() => setToggleMenu(false)}
									className="py-2 px-4 hover:bg-gray-100"
								>
									Hello Guest
								</Link>
								<Link
									to={"/authenticate"}
									onClick={() => setToggleMenu(false)}
									className="py-2 px-4 hover:bg-gray-100"
								>
									Authenticate
								</Link>
							</div>
							<div className="w-full border-b border-gray-300"></div>
							<div className="flex flex-col w-full justify-start text-start gap-2">
								<Link
									to={"/"}
									onClick={() => setToggleMenu(false)}
									className="py-2 px-4 hover:bg-gray-100"
								>
									Airbnb Home
								</Link>
								<Link
									to={"/"}
									onClick={() => setToggleMenu(false)}
									className="py-2 px-4 hover:bg-gray-100"
								>
									Help
								</Link>
								<button
									onClick={handleLogout}
									className={`${
										!user ? "hidden" : "py-2 px-4 hover:bg-gray-100 text-start"
									} `}
								>
									Log Out
								</button>
							</div>
						</div>
					)}
					{/* language */}
					<div className="hidden md:flex items-center justify-center gap-2">
						<button>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
								/>
							</svg>
						</button>
					</div>
					{/* User Icon */}
					<div className="flex gap-3 text-[14px] text-[#222222] font-medium items-center justify-center py-2 px-4 border border-gray-300 rounded-full ">
						<button
							className="hover:animate-pulse"
							onClick={() => setToggleMenu(!toggleMenu)}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
								/>
							</svg>
						</button>

						<span>{user?.username ? user.username : "Hello Guest"}</span>

						<Link
							to={user ? `/user/profile/${user?._id}` : `/authenticate`}
							className={`${
								user ? "bg-transparent" : "bg-gray-700"
							}  rounded-full  text-white`}
						>
							{user ? (
								<img
									src={
										user.profilePicture
											? `${baseUrl}/uploads/${user.profilePicture}`
											: `/users/${randomProfileImage}`
									}
									alt=""
									className={`${
										user ? "rounded-full" : "rounded-2xl"
									} h-8 w-8 rounded-full object-cover hover:animate-pulse`}
								/>
							) : (
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="w-6 h-6 relative -bottom-1 hover:animate-pulse"
								>
									<path
										fillRule="evenodd"
										d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
										clipRule="evenodd"
									/>
								</svg>
							)}
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Navbar;
