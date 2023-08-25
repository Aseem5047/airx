import React from "react";
import { Link } from "react-router-dom";

const AccountNav = ({ subpage, id }) => {
	return (
		<>
			<div className="flex w-full items-center gap-8 justify-center flex-wrap">
				<Link
					to={`/user/profile/${id}`}
					className={`${
						subpage === "profile" || subpage === undefined
							? "bg-primary text-white hover:animate-pulse"
							: "bg-gray-100 hover:bg-primary hover:text-white"
					} py-2 px-6  rounded-2xl  font-medium flex gap-2 items-cecnter justi-center`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
						/>
					</svg>
					My Profile
				</Link>
				<Link
					to={`/user/profile/${id}/bookings`}
					className={`${
						subpage === "bookings"
							? "bg-primary text-white hover:animate-pulse"
							: "bg-gray-100 hover:bg-primary hover:text-white"
					} py-2 px-6 rounded-2xl 
                font-medium flex gap-2 items-cecnter justify-center`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
						/>
					</svg>
					My Bookings
				</Link>
				<Link
					to={`/user/profile/${id}/places`}
					className={`${
						subpage === "places"
							? "bg-primary text-white hover:animate-pulse"
							: "bg-gray-100 hover:bg-primary hover:text-white"
					} py-2 px-6 rounded-2xl  
                font-medium flex gap-2 items-cecnter justify-center`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
						/>
					</svg>
					Accommodations
				</Link>
			</div>
		</>
	);
};

export default AccountNav;
