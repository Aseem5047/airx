import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-hot-toast";
import useAuth from "../AuthContext";

const Auth = () => {
	const navigate = useNavigate();
	const [register, setRegister] = useState(false);
	const initialState = {
		fullname: "",
		username: "",
		password: "",
		email: "",
	};

	const [data, setData] = useState(initialState);
	const [errors, setErrors] = useState({});
	const [choosenField, setChoosenField] = useState("Username");

	const { setUser } = useAuth();

	const changeField = (e) => {
		e.preventDefault();
		if (choosenField === "Username") {
			setChoosenField("Email");
			data.username = "";
			setErrors({});
		} else {
			setChoosenField("Username");
			data.email = "";
			setErrors({});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (register) {
			try {
				await axios
					.post("/auth/register", {
						fullname: data.fullname,
						username: data.username,
						email: data.email,
						password: data.password,
					})
					.then((data) => setUser(data.data.user));
				toast.success("User Registered Successfully");
				navigate("/");
			} catch (error) {
				toast.error(error.response.data);
				setRegister(false);
			}
		} else {
			try {
				await axios
					.post("/auth/login", {
						username: data.username,
						email: data.email,
						password: data.password,
					})
					.then((data) => setUser(data.data.user));
				toast.success("User Logged In Successfully");
				navigate("/");
			} catch (error) {
				toast.error(error.response.data);
			}
		}

		resetForm();
		// console.log(data);
	};

	const handleKeyDown = async (e) => {
		if (e.keyCode === "13" || e.key === "Enter") {
			e.preventDefault();
			if (register) {
				try {
					await axios
						.post("/auth/register", {
							fullname: data.fullname,
							username: data.username,
							email: data.email,
							password: data.password,
						})
						.then((data) => setUser(data.data.user));

					toast.success("User Registered Successfully");
					navigate("/");
				} catch (error) {
					toast.error(error.response.data);
					setRegister(false);
				}
			} else {
				try {
					await axios
						.post("/auth/login", {
							username: data.username,
							email: data.email,
							password: data.password,
						})
						.then((data) => setUser(data.data.user));

					toast.success("User Logged In Successfully");
					navigate("/");
				} catch (error) {
					toast.error(error.response.data);
				}
			}

			resetForm();
		}
	};

	// console.log(JSON.stringify(data) === JSON.stringify(initialState));

	// handle Change in input

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
		// console.log(e.target.name, e.target.value);
		const { name, value } = e.target;
		let newErrors = { ...errors };

		// Validate username and fullname
		// Validate username

		// fullname validation will be considered only when the user is registering

		if (name === "username") {
			if (!value) {
				newErrors.username = "Username is required";
			} else if (value.length < 3) {
				newErrors.username = "Username must have at least 3 characters";
			} else {
				delete newErrors.username; // Remove the error if it's valid
			}
		}

		if (register && name === "fullname") {
			if (!value) {
				newErrors.fullname = "Fullname is required";
			} else if (value.length < 3) {
				newErrors.fullname = "Fullname must have at least 3 characters";
			} else {
				delete newErrors.fullname; // Remove the error if it's valid
			}
		}

		// Validate email
		if (name === "email") {
			if (!value) {
				newErrors.email = "Email is required";
			} else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) {
				newErrors.email = "Invalid email format";
			} else {
				delete newErrors.email; // Remove the error if it's valid
			}
		}

		// Validate password
		if (name === "password") {
			if (!value) {
				newErrors.password = "Password is required";
			} else if (
				!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g.test(
					value
				)
			) {
				newErrors.password =
					"Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.";
			} else {
				delete newErrors.password; // Remove the error if it's valid
			}
		}

		setErrors(newErrors); // Update the errors state
		// console.log(data);
	};

	const resetForm = () => {
		setData(initialState);
	};

	const isFormValid = register
		? Object.keys(errors).length === 0 &&
		  JSON.stringify(data) !== JSON.stringify(initialState) &&
		  data.email !== "" &&
		  data.fullname !== "" &&
		  data.username !== "" &&
		  data.password !== ""
		: choosenField === "Username"
		? Object.keys(errors).length === 0 &&
		  JSON.stringify(data) !== JSON.stringify(initialState) &&
		  data.username !== "" &&
		  data.email === "" &&
		  data.password !== ""
		: Object.keys(errors).length === 0 &&
		  JSON.stringify(data) !== JSON.stringify(initialState) &&
		  data.email !== "" &&
		  data.username === "" &&
		  data.password !== "";

	const handleStateChange = () => {
		setRegister(!register);
	};

	// console.log(errors);

	return (
		<div className="flex flex-col gap-8 items-center justify-center w-full pb-8">
			<div className="h-[25rem] md:h-[40rem] lg:h-auto flex flex-col items-center">
				<span className="text-2xl md:text-3xl lg:text-5xl text-center font-medium py-4 mb-8 w-fit">
					Airbnb it easily with Airbnb Setup
				</span>
				<img
					src="https://a0.muscache.com/im/pictures/65214d06-ffb4-4b70-93c0-01d368e76649.jpg?im_w=2560&im_q=highq"
					alt=""
					className="w-full max-w-[75rem] h-full object-cover m-auto"
				/>
				{/* <img
					src="https://a0.muscache.com/im/pictures/cecbf134-6674-410f-9345-603716048771.jpg?im_w=480&im_q=highq"
					alt=""
					className="w-62 h-24 mt-5"
				/> */}
			</div>
			{register ? (
				<div className="flex flex-col lg:flex-row min-w-[18rem] max-w-[70rem] h-[35rem]  shadow-lg rounded-xl w-full items-center justify-center  m-auto mt-[10rem] lg:mt-8 border border-gray-300 animate-slide-in-left">
					<div className="flex flex-col justify-center items-center w-full lg:w-1/2 h-full flex-grow bg-gradient-to-r from-yellow-500 to-primary  text-white rounded-lg">
						<span className="text-5xl font-extrabold mb-4 text-center">
							Welcome Back
						</span>
						<span className="text-xl mb-4 text-center w-3/4">
							To Keep you connected with us please Register using your personal
							info
						</span>
						<p className="text-center text-base md:text-lg  font-normal my-4">
							Already have an account ?{" "}
						</p>
						<button
							className="button bg-gradient-to-r from-primary to-yellow-500 m-0 hidden mt-6 lg:flex"
							onClick={handleStateChange}
						>
							Authenticate
						</button>
					</div>

					<form className="flex flex-col justify-center items-center w-full p-8 m-auto lg:w-1/2 h-full flex-grow gap-4">
						<span className="text-5xl font-extrabold mb-4 text-center">
							Register
						</span>

						<input
							onChange={handleChange}
							name="fullname"
							value={data.fullname}
							autoComplete="on"
							type="text"
							placeholder="Full Name"
							className={`input ${
								errors.fullname ? "input-error shake-animation" : ""
							}`}
						/>
						{errors.fullname && (
							<p className="error-message">{errors.fullname}</p>
						)}

						<input
							onChange={handleChange}
							name="username"
							value={data.username}
							autoComplete="on"
							type="text"
							placeholder="Username"
							className={`input  ${
								errors.username ? "input-error shake-animation" : ""
							}`}
						/>
						{errors.username && (
							<p className="error-message">{errors.username}</p>
						)}

						<input
							onChange={handleChange}
							name="email"
							value={data.email}
							autoComplete="on"
							type="email"
							placeholder="Email"
							className={`input  ${
								errors.email ? "input-error shake-animation" : ""
							}`}
						/>
						{errors.email && <p className="error-message">{errors.email}</p>}
						<input
							onChange={handleChange}
							name="password"
							value={data.password}
							autoComplete="on"
							type="password"
							placeholder="Password"
							className={`input  ${
								errors.password ? "input-error shake-animation" : ""
							}`}
							onKeyDown={handleKeyDown}
						/>
						{errors.password && (
							<p className="error-message">{errors.password}</p>
						)}
						<button
							className={` ${
								isFormValid
									? "button bg-gradient-to-r from-primary to-yellow-500 mt-4 text-white"
									: "hidden"
							}`}
							onClick={handleSubmit}
							onKeyDown={handleKeyDown}
						>
							Register
						</button>
					</form>
				</div>
			) : (
				<div className="flex gap-8 flex-col lg:flex-row min-w-[18rem] max-w-[70rem] h-[35rem]  shadow-lg rounded-xl w-full items-center justify-center  m-auto mt-[10rem] lg:mt-8 border border-gray-300 animate-slide-in-right">
					<form className="flex justify-center items-center w-full p-8 m-auto lg:w-1/2 h-full flex-col gap-4">
						<span className="text-5xl font-extrabold mb-4 text-center">
							Authenticate
						</span>

						<button
							className=" capitalize button bg-gradient-to-r from-yellow-500 to-pink-500  m-auto text-white mt-0 mx-auto mb-8"
							onClick={changeField}
						>
							Login using {choosenField === "Username" ? "Email" : "Username"}
						</button>

						{choosenField === "Username" && (
							<input
								onChange={handleChange}
								name="username"
								value={data.username}
								autoComplete="on"
								type="text"
								placeholder="Username"
								className={`input  ${
									errors.username ? "input-error shake-animation" : ""
								}`}
							/>
						)}
						{errors.username && choosenField === "Username" && (
							<p className="error-message">{errors.username}</p>
						)}
						{choosenField === "Email" && (
							<input
								onChange={handleChange}
								name="email"
								value={data.email}
								autoComplete="on"
								type="email"
								placeholder="Email"
								className={`input  ${
									errors.email ? "input-error shake-animation" : ""
								}`}
							/>
						)}
						{errors.email && choosenField === "Email" && (
							<p className="error-message">{errors.email}</p>
						)}

						<input
							onChange={handleChange}
							name="password"
							value={data.password}
							autoComplete="on"
							type="password"
							placeholder="Password"
							className={`input  ${
								errors.password ? "input-error shake-animation" : ""
							}`}
							onKeyDown={handleKeyDown}
						/>
						{errors.password && (
							<p className="error-message">{errors.password}</p>
						)}
						<button
							className={` ${
								isFormValid
									? "button bg-gradient-to-r from-yellow-500 to-pink-500  m-auto text-white"
									: "hidden"
							}`}
							onClick={handleSubmit}
							onKeyDown={handleKeyDown}
						>
							Authenticate
						</button>
					</form>

					<div className="flex flex-col justify-center items-center w-full lg:w-1/2 h-full flex-grow bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-lg">
						<span className="text-5xl font-extrabold mb-4 text-center">
							Hello Friend
						</span>
						<span className="text-xl mb-4 text-center w-3/4">
							We are glad to have you please enter your details and start your
							journey with us
						</span>
						<p className="text-center text-base md:text-lg  font-normal my-4">
							Start by creating a new account
						</p>
						<button
							className="button bg-gradient-to-r from-yellow-500 to-pink-500 m-0 hidden mt-6 lg:flex"
							onClick={handleStateChange}
						>
							Register
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Auth;
