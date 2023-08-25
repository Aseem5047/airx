import React, { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuth from "../AuthContext";

const BookingBox = ({ place }) => {
	const [checkIn, setCheckIn] = useState("");
	const [checkOut, setCheckOut] = useState("");
	const [fullName, setFullName] = useState("");
	const [phone, setPhone] = useState("");
	const [numberOfGuests, setNumberOfGuests] = useState(1);

	const navigate = useNavigate();

	const { user } = useAuth();

	let numberOfNights = 0;
	if (checkIn && checkOut) {
		numberOfNights = differenceInCalendarDays(
			new Date(checkOut),
			new Date(checkIn)
		);
	}

	useEffect(() => {
		if (user) {
			setFullName(user.fullname);
		}
	}, [user]);

	const book = async (e) => {
		e.preventDefault();
		const data = {
			place: place._id,
			checkIn,
			checkOut,
			numberOfGuests,
			fullName,
			phone,
			price: numberOfNights * place.price,
		};

		await axios
			.post("/bookings/create", data)
			.then((response) => {
				toast.success("Data Added Successfully");
				navigate(`/user/profile/${place.owner}/bookings/${response.data._id}`);
			})
			.catch((error) => {
				toast.error(error.response.data);
			});
	};

	// console.log(place);
	console.log(user.fullname);

	return (
		<>
			<div className="bg-white px-6 py-4 shadows rounded-xl">
				<h2 className="text-center flex justify-center items-center gap-4 my-4">
					<span className="text-xl font-semibold">Price ...</span>
					{
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
								d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
							/>
						</svg>
					}
					<span className="text-xl font-semibold">{place.price} / Night</span>
				</h2>
				<div className="grid border-2 rounded-xl">
					<div className="grid grid-cols-2 border-b-2">
						<div className="px-6 py-4 border-r-2  flex flex-col gap-2">
							<label>Check In </label>
							<input
								type="date"
								placeholder="Enter a valid date"
								className="outline-none"
								value={checkIn}
								onChange={(e) => setCheckIn(e.target.value)}
							/>
						</div>

						<div className="px-6 py-4  flex flex-col gap-2">
							<label>Check Out </label>
							<input
								type="date"
								placeholder="Enter a valid date"
								className="outline-none"
								value={checkOut}
								onChange={(e) => setCheckOut(e.target.value)}
							/>
						</div>
					</div>
					<div className="px-6 py-4  flex flex-col gap-2">
						<label>Number of Guests </label>
						<div className="flex gap-4 relative">
							<span className="self-center">
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
										d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
									/>
								</svg>
							</span>

							<input
								type="number"
								placeholder="Enter the number of guests"
								className="flex-grow rounded-xl outline-none py-2 "
								value={numberOfGuests}
								onChange={(e) => setNumberOfGuests(e.target.value)}
							/>
						</div>
					</div>
					{numberOfNights > 0 && (
						<div className="grid border-t-2">
							<div className="grid grid-cols-2 border-t-2">
								<div className="px-6 py-4 flex flex-col gap-2 border-r-2">
									<label>Your Full Name</label>
									<input
										type="text"
										placeholder="Chingu G"
										className="outline-none"
										value={fullName}
										onChange={(e) => setFullName(e.target.value)}
									/>
								</div>

								<div className="px-6 py-4 flex flex-col gap-2">
									<label>Phone Number</label>
									<input
										type="text"
										placeholder="+ 123 456 789"
										className="outline-none"
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
									/>
								</div>
							</div>
						</div>
					)}
				</div>

				<button
					onClick={book}
					className="button bg-primary text-white w-full flex gap-2 "
				>
					Book the Place for{" "}
					{
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
								d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
							/>
						</svg>
					}{" "}
					{numberOfNights > 0 && <span> ${numberOfNights * place.price}</span>}
				</button>
			</div>
		</>
	);
};

export default BookingBox;
