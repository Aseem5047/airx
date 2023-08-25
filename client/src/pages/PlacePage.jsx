import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Gallery from "../components/Gallery";

const PlacePage = () => {
	const { id } = useParams();
	const [place, setPlace] = useState({});
	const [showAllPhotos, setShowAllPhotos] = useState(false);

	const baseUrl = "http://localhost:5000/uploads";

	useEffect(() => {
		if (!id) {
			return;
		}
		axios.get(`/places/${id}`).then(({ data }) => {
			// Convert checkIn and checkOut properties to Date objects
			const modifiedData = {
				...data,
				checkIn: new Date(data.checkIn),
				checkOut: new Date(data.checkOut),
			};
			setPlace(modifiedData);
		});
	}, [id]);

	return (
		<div className="pb-8">
			<div className="bg-gray-50 p-8 w-full rounded-2xl">
				<Gallery
					place={place}
					showAllPhotos={showAllPhotos}
					setShowAllPhotos={setShowAllPhotos}
					baseUrl={baseUrl}
				/>
			</div>

			<div className="p-8 max-w-[75%]">
				<h2 className="font-semibold text-2xl mb-1">Extra Info</h2>
				<span>{place?.extraInfo}</span>
			</div>

			<div className="px-8">
				<h2 className="font-semibold text-2xl mb-1">Perks</h2>
				<div className="grid grid-cols-6 gap-4">
					{place?.features?.map((feature) => (
						<span
							key={feature}
							className="button w-full !animate-none text-white capitalize bg-primary flex gap-2"
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
									d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
								/>
							</svg>
							{feature}
						</span>
					))}
				</div>
			</div>
		</div>
	);
};

export default PlacePage;
