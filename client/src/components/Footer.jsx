import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	const [toggleMenu, setToggleMenu] = useState(false);

	return (
		<div className="bg-white z-20 py-4 px-4 md:px-[80px] h-auto flex flex-wrap gap-4 items-center justify-between fixed bottom-0 w-full border border-gray-300 shadow-md shadow-gray-300 rounded-lg overflow-auto ">
			{/* ---------------------------------------- */}

			{/* {Left + Right} Section*/}

			{/* Responsive Menu */}

			{toggleMenu && (
				<div className="fixed max-w-[13rem] w-full bottom-16  left-2 md:hidden flex flex-col gap-4 text-[15px] text-black font-normal items-center justify-center py-2 border border-gray-300 rounded-lg z-20 shadow-md shadow-gray-300 bg-white">
					<div className="flex flex-col w-full justify-start text-start gap-2">
						<Link to={"/"} className="py-2 px-4 hover:bg-gray-100">
							Hello Guest
						</Link>
						<Link to={"/authenticate"} className="py-2 px-4 hover:bg-gray-100">
							Authenticate
						</Link>
					</div>
					<div className="w-full border-b border-gray-300"></div>
					<div className="flex flex-col w-full justify-start text-start gap-2">
						<Link to={"/"} className="py-2 px-4 hover:bg-gray-100">
							Airbnb Home
						</Link>
						<Link to={"/"} className="py-2 px-4 hover:bg-gray-100">
							Help
						</Link>
					</div>
					<div className="w-full border-b border-gray-300"></div>

					<div className="flex  w-full justify-around  gap-2 py-2 px-4">
						<button>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-5 h-5 text-sm"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
								/>
							</svg>
						</button>

						<button>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-5 h-5 text-sm"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
								/>
							</svg>
						</button>
					</div>
				</div>
			)}

			{/* Left Section */}

			<div className="flex items-center gap-4">
				<span className="w-auto">© 2023 Airbnb Inc.</span>

				<button
					className="md:hidden block hover:animate-pulse"
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

				<div className=" hidden md:flex items-center justify-center gap-4">
					<Link to={"/"} className="hover:animate-pulse text-sm">
						Privacy
					</Link>
					<Link to={"/"} className="hover:animate-pulse text-sm">
						Terms
					</Link>
					<Link to={"/"} className="hover:animate-pulse text-sm">
						Sitemap
					</Link>
					<Link to={"/"} className="hover:animate-pulse text-sm">
						Company Details
					</Link>
					<Link to={"/"} className="hover:animate-pulse text-sm">
						Destinations
					</Link>
				</div>
			</div>

			{/* Right Section */}

			<div className="flex items-center gap-4">
				<div className="hidden md:flex items-center justify-center gap-2 hover:animate-pulse">
					<span className="cursor-pointer text-sm">Language</span>
					<button>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-5 h-5 text-sm"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
							/>
						</svg>
					</button>
				</div>
				<div className="hidden md:flex items-center justify-center gap-2 hover:animate-pulse">
					<span className="cursor-pointer text-sm">Support & Help</span>
					<button>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-5 h-5 text-sm"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Footer;
