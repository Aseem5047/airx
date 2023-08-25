import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const HomePage = () => {
	const [places, setPlaces] = useState([]);
	const baseUrl = "http://localhost:5000/uploads";

	useEffect(() => {
		axios
			.get("/places")
			.then(({ data }) => setPlaces(data))
			.catch((error) => toast.error(error.response.data));
	}, []);

	return (
		<div className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
			{places.length > 0 &&
				places.map((place) => (
					<Link
						to={`/place/${place._id}`}
						key={place._id}
						className="flex flex-col justify-between items-start"
					>
						<div className="bg-gray-500 rounded-2xl flex mb-2 w-full h-[150px] md:h-[200px]">
							{place.photos && (
								<img
									className="rounded-2xl object-cover w-full h-full aspect-square"
									src={baseUrl + "/" + place.photos[0]}
									alt=""
								/>
							)}
						</div>
						<div className="flex flex-col justify-between items-start w-full h-full">
							<div>
								<h2 className="text-base font-bold">{place.title}</h2>
								<h3 className="text-sm mt-1 text-gray-500">{place.address}</h3>
							</div>
							<div className="mt-2">
								<span className="text-sm font-semibold">Rs. {place.price}</span>{" "}
								/ Night
							</div>
						</div>
					</Link>
				))}
		</div>
	);
};

export default HomePage;
