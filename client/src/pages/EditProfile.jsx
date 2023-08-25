import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuth from "../AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const EditProfile = () => {
	const { id, action } = useParams();
	const { user } = useAuth();
	const baseUrl = "http://localhost:5000";
	const navigate = useNavigate();

	// this is the object we'll send to out backend to add the new place

	const initialState = {
		fullname: user.fullname,
		username: user.username,
		email: user.email,
		password: "",
		profilePicture: user.profilePicture ? user.profilePicture : "",
		coverPicture: user.coverPicture ? user.coverPicture : "",
		about: user.about,
		livesIn: user.livesIn,
		worksAt: user.worksAt,
		country: user.country,
	};

	// extra states

	const [profileData, setProfileData] = useState(initialState);
	const [addedPhoto, setAddedPhoto] = useState(
		user.profilePicture ? user.profilePicture : ""
	);
	const [addedCoverPhoto, setAddedCoverPhoto] = useState(
		user.coverPicture ? user.coverPicture : ""
	);
	const [errors, setErrors] = useState({});

	// function that takes values from each input field and map those values to the corresponding field

	const handleChange = (e) => {
		setProfileData({ ...profileData, [e.target.name]: e.target.value });
		// console.log(e.target.name, e.target.value);
		const { name, value } = e.target;
		let newErrors = { ...errors };

		// Validate username and fullname
		// Validate username

		// fullname validation will be considered only when the user is registerin""
		if (name === "username") {
			if (!value) {
				newErrors.username = "Username is required";
			} else if (value.length < 3) {
				newErrors.username = "Username must have at least 3 characters";
			} else {
				delete newErrors.username; // Remove the error if it's valid
			}
		}

		if (name === "fullname") {
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
		// console.log(errors);
	};

	// functions to add the Heading and Sub Headings for each of the input field

	function inputHeader(text) {
		return <h2 className="text-2xl font-medium">{text}</h2>;
	}

	function inputDescription(text) {
		return <span className="text-sm text-gray-400">{text} </span>;
	}

	function preInput(header, description) {
		return (
			<>
				{header && inputHeader(header)}
				{description && inputDescription(description)}
			</>
		);
	}

	// function that will get triggered once the form is submitted

	const editProfile = async (e) => {
		e.preventDefault();
		await axios
			.post(`/user/editProfile/${id}`, { ...profileData, _id: user._id })
			.then((response) => {
				toast.success("Data Added Successfully");
				navigate(`/user/profile/${id}`);
			})
			.catch((error) => {
				toast.error(error.response.data);
			});

		// console.log({ ...profileData, id: user._id });
		resetForm();
	};

	// function to reset the form

	const resetForm = () => {
		setProfileData(initialState);
		setAddedPhoto("");
		setAddedCoverPhoto("");
	};

	function uploadPhoto(e) {
		if (e.target.files && e.target.files[0]) {
			const files = e.target.files[0];
			const data = new FormData();
			data.append("profileUploads", files);
			axios
				.post("/upload/profileImages", data, {
					headers: { "Content-Type": "multipart/form-data" },
				})
				.then((response) => {
					if (e.target.name === "profilePicture") {
						setAddedPhoto(response.data);
						profileData.profilePicture = response.data;
					} else if (e.target.name === "coverPicture") {
						setAddedCoverPhoto(response.data);
						profileData.coverPicture = response.data;
					}
				})
				.catch((error) => toast.error("Unable to Upload"));
		}
	}

	function deleteSelectedImage(imageType) {
		if (imageType === "cover") {
			profileData.profileCoverPicture = "";
			setAddedCoverPhoto("");
		} else if (imageType === "profile") {
			profileData.profilePicture = "";
			setAddedPhoto("");
		}
	}

	// console.log(profileData);

	return (
		<>
			<div className="flex flex-col justify-center items-center gap-4 mt-8 pb-20">
				<div className="flex flex-col gap-8 items-center justify-center ">
					<Link
						to={`/user/profile/${id}`}
						className="flex justify-center items-center gap-4 py-2 px-4 bg-primary text-white rounded-xl hover:animate-pulse"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-5 h-5 font-bold"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
							/>
						</svg>
						Return to Profile
					</Link>
					<div>
						<form onSubmit={editProfile}>
							{/* Full Name */}
							{preInput("Full Name", "Add new Name")}
							<input
								onChange={handleChange}
								name="fullname"
								value={profileData.fullname}
								type="text"
								placeholder="xyz abc Full Name"
								className={`input my-4 ${
									errors.fullname ? "input-error shake-animation" : ""
								}`}
							/>
							{errors.fullname && (
								<p className="error-message mb-6">{errors.fullname}</p>
							)}

							{/* Username */}
							{preInput("Username", "Add new Username")}
							<input
								onChange={handleChange}
								name="username"
								value={profileData.username}
								type="text"
								placeholder="xyz Username"
								className={`input my-4 ${
									errors.username ? "input-error shake-animation" : ""
								}`}
							/>
							{errors.username && (
								<p className="error-message mb-6">{errors.username}</p>
							)}

							{/* Email */}
							{preInput("Email", "Add new Email")}
							<input
								onChange={handleChange}
								name="email"
								value={profileData.email}
								type="email"
								placeholder="xyz email"
								className={`input my-4 ${
									errors.email ? "input-error shake-animation" : ""
								}`}
							/>
							{errors.email && (
								<p className="error-message mb-6">{errors.email}</p>
							)}

							{/* Password */}
							{preInput("Password", "Add a new Password")}

							<input
								onChange={handleChange}
								name="password"
								value={profileData.password}
								type="password"
								placeholder="*** Password"
								className={`input my-4 ${
									errors.password ? "input-error shake-animation" : ""
								}`}
							/>
							{errors.password && (
								<p className="error-message mb-6 max-w-lg">{errors.password}</p>
							)}
							{/* Profile Picture */}
							{preInput("Profile Picture", "Add Image to edit Profile Picture")}

							{/* Photo Gallery */}
							<div className="my-4 mt-4 gap-2 flex justify-start items-center">
								{/* if there are previously added images then show them first */}
								{addedPhoto.length > 0 ? (
									<div className="h-[275px] w-[300px] flex gap-4">
										<img
											className="rounded-xl w-full object-cover "
											src={`${baseUrl}/uploads/${addedPhoto}`}
											alt=""
										/>

										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6 hover:text-primary cursor-pointer"
											onClick={() => deleteSelectedImage("cover")}
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
											/>
										</svg>
									</div>
								) : (
									<label className="border border-gray-300 flex justify-center items-center gap-2 p-10 font-medium rounded-xl h-40 w-full hover:bg-gray-100 cursor-pointer">
										<input
											type="file"
											className="hidden"
											name="profilePicture"
											onChange={uploadPhoto}
										/>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="w-5 h-5 font-bold"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
											/>
										</svg>
										Upload
									</label>
								)}
							</div>

							{/* Cover Image */}
							{preInput("Cover Image", "Add Images to edit Cover Image")}

							{/* Photo Gallery */}
							<div className="my-4 mt-4 gap-2 flex justify-start items-center">
								{/* if there are previously added images then show them first */}
								{addedCoverPhoto.length > 0 ? (
									<div className="h-[275px] w-full flex gap-4">
										<img
											className="rounded-xl w-full object-cover "
											src={`${baseUrl}/uploads/${addedCoverPhoto}`}
											alt=""
										/>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6 hover:text-primary cursor-pointer"
											onClick={() => deleteSelectedImage("cover")}
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
											/>
										</svg>
									</div>
								) : (
									<label className="border border-gray-300 flex justify-center items-center gap-2 p-10 font-medium rounded-xl h-40 w-full hover:bg-gray-100 cursor-pointer">
										<input
											type="file"
											className="hidden"
											name="coverPicture"
											onChange={uploadPhoto}
										/>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="w-5 h-5 font-bold"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
											/>
										</svg>
										Upload
									</label>
								)}
							</div>

							{/* About */}
							{preInput("About", "Tell others something about you")}

							<textarea
								onChange={handleChange}
								name="about"
								value={profileData.about}
								className="input my-4 min-h-[4rem]"
								placeholder="Describe Briefly"
							/>

							{/* Lives In */}
							{preInput(
								"Short Address",
								"Please enter address as short as possible"
							)}

							<input
								onChange={handleChange}
								name="livesIn"
								value={profileData.livesIn}
								className="input my-4 min-h-[4rem]"
								placeholder="Add Address"
							/>

							{/* Works At */}
							{preInput("Works At", "Please enter info about your Wrok Place")}

							<input
								onChange={handleChange}
								name="worksAt"
								value={profileData.worksAt}
								className="input my-4 min-h-[4rem]"
								placeholder="Add Work Place"
							/>

							{/* Country */}
							{preInput("Country", "Please enter your Country")}

							<input
								onChange={handleChange}
								name="country"
								value={profileData.country}
								className="input my-4 min-h-[4rem]"
								placeholder="Add Country"
							/>

							{/* Submit Button */}
							{Object.keys(errors).length === 0 &&
								profileData.email !== "" &&
								profileData.fullname !== "" &&
								profileData.username !== "" && (
									<button className="flex m-auto mt-8 justify-center items-center gap-2 p-4 bg-primary text-white text-lg rounded-xl hover:animate-pulse min-w-[10rem]">
										Save Details
									</button>
								)}
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditProfile;
