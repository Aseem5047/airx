import React from "react";
import BookingBox from "./BookingBox";

const Gallery = ({ place, showAllPhotos, setShowAllPhotos, baseUrl }) => {
	return (
		<>
			{showAllPhotos ? (
				<div className="bg-white absolute inset-0 min-h-screen z-40 ">
					<div className="px-8 py-4 mt-8 sticky top-0 z-20 bg-white">
						<h2 className="text-3xl my-2 px-2 max-w-[75%]">
							Photos of {place.title}
						</h2>
						<button
							onClick={() => setShowAllPhotos(false)}
							className="absolute right-12 top-6 bg-gray-100 flex gap-2 hover:bg-primary hover:text-white font-medium px-4 py-2 rounded-xl text-black"
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
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
							<span> Close Gallery</span>{" "}
						</button>
					</div>

					<div className="p-8 grid md:grid-cols-2 gap-8 relative bg-white">
						{place?.photos?.length > 0 &&
							place.photos.map((photo) => (
								<div>
									<img
										src={`${baseUrl}/${photo}`}
										alt=""
										className="rounded-xl w-full h-full m-auto"
									/>
								</div>
							))}
					</div>
				</div>
			) : (
				<>
					<div className="relative">
						<div className="grid gap-2 grid-cols-[2fr_1fr] ">
							<div className="">
								{place?.photos && place.photos[0] && (
									<img
										onClick={() => setShowAllPhotos(true)}
										src={`${baseUrl}/${place.photos[0]}`}
										alt=""
										className="aspect-video object-cover rounded-xl cursor-pointer"
									/>
								)}
							</div>
							<div className="grid">
								{place?.photos && place.photos[1] && (
									<img
										onClick={() => setShowAllPhotos(true)}
										src={`${baseUrl}/${place.photos[1]}`}
										alt=""
										className="aspect-video object-cover rounded-xl cursor-pointer"
									/>
								)}
								<div className="overflow-hidden rounded-xl">
									{place?.photos && place.photos[2] && (
										<img
											onClick={() => setShowAllPhotos(true)}
											src={`${baseUrl}/${place.photos[2]}`}
											alt=""
											className="aspect-video object-cover  relative top-2 rounded-xl cursor-pointer"
										/>
									)}
								</div>
							</div>
						</div>

						<button
							onClick={() => setShowAllPhotos(true)}
							className="absolute bottom-6 right-4 py-2 px-4 bg-white shadown shadow-md shadow-gray-500 rounded-2xl hover:bg-primary hover:text-white font-medium flex gap-2 justify-center items-center"
						>
							Show more Photos
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
									d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
								/>
							</svg>
						</button>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 mt-6 ">
						<div>
							<h1 className="text-3xl ">{place.title}</h1>
							<div className="flex flex-col justify-center items-start mb-4">
								<a
									href={`https://maps.google.com/?q=${place.address}`}
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
									{place.address}
								</a>
							</div>
							<div className="my-4 ">
								<h2 className="font-semibold text-2xl mb-1">Description</h2>
								<span>{place.description}</span>
							</div>
							<div className="my-4">
								<h2 className="font-semibold text-xl">
									Arrival / Departure Details
								</h2>
								<div className="flex flex-col items-start justify-center gap-2 my-2">
									<span className="flex gap-4">
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
										(Check-in) {place.checkIn?.toLocaleTimeString()}
									</span>
									<span className="flex gap-4">
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
										{place.checkOut?.toLocaleTimeString()} (Check-out)
									</span>
								</div>
								<span className="flex gap-4">
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
									{place.maxGuests} (Max Guests)
								</span>
							</div>
						</div>
						<BookingBox place={place} />
					</div>
				</>
			)}
		</>
	);
};

export default Gallery;
