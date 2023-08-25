import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuth from "../AuthContext";
import Perks from "../components/Perks";
import axios from "axios";
import Uploader from "../components/Uploader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { format } from "date-fns";

const PlacesForm = () => {
	const { id, action, placeId } = useParams();

	const baseUrl = "http://localhost:5000";
	const navigate = useNavigate();

	// this is the object we'll send to out backend to add the new place

	const initialState = {
		title: "",
		address: "",
		photos: [],
		description: "",
		features: [],
		extraInfo: "",
		checkIn: new Date(),
		checkOut: new Date(),
		maxGuests: 0,
		price: 1000,
	};

	// extra states

	const [data, setData] = useState(initialState);
	const [photoLink, setPhotoLink] = useState("");
	const [addedPhotos, setAddedPhotos] = useState([]);
	const [perks, setPerks] = useState([]);

	useEffect(() => {
		if (!placeId) {
			return;
		}

		axios.get(`/places/${placeId}`).then((response) => {
			const responseData = response.data;

			// Convert ISO 8601 date strings to Date objects
			const checkInDate = new Date(responseData.checkIn);
			const checkOutDate = new Date(responseData.checkOut);

			// Update the data state with the Date objects
			setData({
				...responseData,
				checkIn: checkInDate,
				checkOut: checkOutDate,
			});

			setPerks(responseData.features);
			setAddedPhotos(responseData.photos);

			// Your logic using the data object from the response goes here
		});
	}, [placeId]);

	// function that takes values from each input field and map those values to the corresponding field

	const handleChange = (e) => {
		if (e.target.name === "checkIn" || e.target.name === "checkOut") {
			const [hours, minutes] = e.target.value.split(":");
			const date = new Date();
			date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
			setData({ ...data, [e.target.name]: date });
		} else {
			setData({ ...data, [e.target.name]: e.target.value });
		}

		// setData({ ...data, [e.target.name]: e.target.value });
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

	const addNewPlace = async (e) => {
		e.preventDefault();
		if (placeId) {
			await axios
				.put("/places/edit", { placeId, ...data })
				.then((response) => {
					toast.success("Data Edited Successfully");
					navigate(`/user/profile/${id}/places`);
				})
				.catch((error) => {
					toast.error(error.response.data);
				});
		} else {
			// new place
			await axios
				.post("/places/addNew", data)
				.then((response) => {
					toast.success("Data Added Successfully");
					navigate(`/user/profile/${id}/places`);
				})
				.catch((error) => {
					toast.error(error.response.data);
				});
		}

		resetForm();
	};

	// function to reset the form

	const resetForm = () => {
		setData(initialState);
	};

	// console.log(data.photos, addedPhotos);

	return (
		<>
			<div className="flex flex-col justify-center items-center gap-4 mt-8 pb-20">
				<div className="flex flex-col gap-4 items-center justify-center ">
					<Link
						to={`/user/profile/${id}/places`}
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
						<form onSubmit={addNewPlace}>
							{/* Heading */}
							{preInput("Title", "Add a short Heading for you place")}

							<input
								onChange={handleChange}
								name="title"
								value={data.title}
								className="input my-4"
								type="text"
								placeholder="Lovely Place"
							/>
							{/* Address */}
							{preInput("Address", "Please Provide a valid Address")}

							<input
								onChange={handleChange}
								name="address"
								value={data.address}
								className="input my-4"
								type="text"
								placeholder="Address"
							/>
							{/* Photos */}
							{preInput("Photos", "Add Images using Link ...")}

							<Uploader
								photoLink={photoLink}
								setPhotoLink={setPhotoLink}
								addedPhotos={addedPhotos}
								setAddedPhotos={setAddedPhotos}
								baseUrl={baseUrl}
								finalData={data}
							/>

							{/* Description */}
							{preInput(
								"Description",
								"Tell others something about your place"
							)}

							<textarea
								onChange={handleChange}
								name="description"
								value={data.description}
								className="input my-4 min-h-[4rem]"
								placeholder="Describe the Place Briefly"
							/>
							{/* Perks or Functions */}
							{preInput("Perks", "Select the unique things about the place")}

							<Perks selected={perks} onChange={setPerks} finalData={data} />

							{/* Extra Info */}
							{preInput("Extra Info", "Extra Info like rules, services, etc")}

							<textarea
								onChange={handleChange}
								name="extraInfo"
								value={data.extraInfo}
								className="input my-4 min-h-[4rem]"
								placeholder="Describe the Place Briefly"
							/>
							{/* CheckIn & CheckOut & Max Guests */}
							{preInput("Check In & Out Times", "Add Check In and Out time")}

							<div className="grid gap-2 grid-cols-2 md:grid-cols-4">
								<div className="mt-4 flex gap-2 flex-col justify-center items-start">
									<input
										onChange={handleChange}
										name="checkIn"
										value={
											data?.checkIn
												? data?.checkIn.toTimeString().slice(0, 5)
												: ""
										}
										className="input"
										type="time"
										placeholder="14:00"
									/>
									<h2 className="text-sm text-gray-400 pl-2">Check In Time</h2>
								</div>
								<div className="mt-4 flex gap-2 flex-col justify-center items-start">
									<input
										onChange={handleChange}
										name="checkOut"
										value={
											data?.checkOut
												? data?.checkOut.toTimeString().slice(0, 5)
												: ""
										}
										className="input"
										type="time"
										placeholder="10:00"
									/>
									<h2 className="text-sm text-gray-400 pl-2">Check Out Time</h2>
								</div>
								<div className="mt-4 flex gap-2 flex-col justify-center items-start">
									<input
										onChange={handleChange}
										name="maxGuests"
										value={data.maxGuests}
										className="input"
										type="number"
										placeholder="4 (Mention Exact Count)"
									/>
									<h2 className="text-sm text-gray-400 pl-2">Maximum Guests</h2>
								</div>
								<div className="mt-4 flex gap-2 flex-col justify-center items-start">
									<input
										onChange={handleChange}
										name="price"
										value={data.price}
										className="input"
										type="number"
										placeholder="Price Per Night"
									/>
									<h2 className="text-sm text-gray-400 pl-2">
										Price Per Night
									</h2>
								</div>
							</div>

							{/* Submit Button */}
							<button className="flex m-auto mt-8 justify-center items-center gap-2 p-4 bg-primary text-white text-lg rounded-xl hover:animate-pulse min-w-[10rem]">
								Save Details
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default PlacesForm;
