import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceGallery from "../components/PlaceGallery";
import { differenceInCalendarDays } from "date-fns";

const BookingPage = () => {
	const { bookingId } = useParams();
	const [showAllPhotos, setShowAllPhotos] = useState(false);
	const [booking, setBooking] = useState({});
	const baseUrl = "http://localhost:5000/uploads";

	useEffect(() => {
		axios.get(`/bookings/${bookingId}`).then(({ data }) => setBooking(data));
	}, []);

	console.log(booking?.place);

	const formatDate = (date) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return new Date(date).toLocaleDateString(undefined, options);
	};

	let numberOfNights = 0;
	if (booking?.checkIn && booking?.checkOut) {
		numberOfNights = differenceInCalendarDays(
			new Date(booking?.checkOut),
			new Date(booking?.checkIn)
		);
	}

	return (
		<div className="bg-gray-50 p-8">
			<div className=" w-full rounded-2xl">
				{booking?.place && (
					<PlaceGallery
						place={booking?.place}
						showAllPhotos={showAllPhotos}
						setShowAllPhotos={setShowAllPhotos}
						baseUrl={baseUrl}
					/>
				)}
			</div>

			<div className="grid  gap-8 mt-6 ">
				<div>
					<h1 className="text-3xl ">{booking?.place?.title}</h1>
					<div className="flex flex-col justify-center items-start mb-4">
						<a
							href={`https://maps.google.com/?q=${booking?.place?.address}`}
							target="_blank"
							className=" font-semibold text-base my-2 flex flex-row justify-start items-start md:items-center gap-2 hover:text-primary"
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
									d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
								/>
							</svg>
							{booking?.place?.address}
						</a>
					</div>
					<div className="my-4 ">
						<h2 className="font-semibold text-2xl mb-1">Description</h2>
						<span>{booking?.place?.description}</span>
					</div>
					<div className="my-6">
						<h2 className="font-semibold text-xl">Booking Details</h2>
						<div className="flex flex-col justify-center items-start">
							<div className="flex items-center justify-start gap-2 mt-4">
								<span className="flex gap-2">
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
											d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
										/>
									</svg>
									{formatDate(booking.checkIn)}
								</span>
								<span> to </span>
								<span className="flex gap-2">
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
											d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
										/>
									</svg>
									{formatDate(booking.checkOut)}
								</span>
								<span className="flex gap-2">
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
											d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
										/>
									</svg>
									{numberOfNights > 0 && <span> {numberOfNights}</span>} Nights
								</span>
							</div>

							<div className="button bg-primary text-white mt-6">
								<span className="text-sm flex gap-2 items-center">
									Total Price
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
									{booking.price}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookingPage;
