import axios from "axios";
import React, { useState } from "react";

const Uploader = ({
	photoLink,
	setPhotoLink,
	addedPhotos,
	setAddedPhotos,
	baseUrl,
	finalData,
}) => {
	function uploadPhoto(e) {
		e.preventDefault();
		const files = e.target.files;
		const data = new FormData();
		for (let i = 0; i < files.length; i++) {
			data.append("photos", files[i]);
		}
		axios
			.post("/upload", data, {
				header: { "Content-Type": "multipart/form-data" },
			})
			.then((response) => {
				const { data: fileNames } = response;
				console.log(fileNames);
				setAddedPhotos((prev) => {
					return [...prev, ...fileNames];
				});
				finalData.photos = [...finalData.photos, ...fileNames]; // Use spread operator to update the state
				console.log(finalData.photos);
			})
			.catch((error) => console.log(error));
	}

	async function addPhotoByLink(e) {
		e.preventDefault();
		const fileName = await axios.post("/upload/viaLink", {
			link: photoLink,
		});
		// console.log(fileName.data);
		setAddedPhotos((prev) => {
			return [...prev, fileName.data];
		});
		finalData.photos = [...finalData.photos, fileName.data];
		setPhotoLink("");
	}

	const removePhoto = (event, filename) => {
		event.preventDefault();
		setAddedPhotos((prev) => prev.filter((photo) => photo !== filename)); // Use functional form of setState
		finalData.photos = addedPhotos.filter((photo) => photo !== filename); // Update the state outside of setState

		console.log(finalData.photos);
	};

	const selectAsMainPhoto = (event, filename) => {
		event.preventDefault();
		setAddedPhotos([
			filename,
			...addedPhotos.filter((photo) => photo !== filename),
		]); // Use functional form of setState
		finalData.photos = [
			filename,
			...addedPhotos.filter((photo) => photo !== filename),
		]; // Update the state outside of setState

		console.log(finalData.photos);
	};

	return (
		<>
			<div className="flex gap-4 items-center">
				<input
					onChange={(e) => setPhotoLink(e.target.value)}
					name="photoLink"
					value={photoLink}
					className="input my-4"
					type="link"
					placeholder="Add Images using Link ..."
				/>
				<button
					onClick={addPhotoByLink}
					className="inline-flex justify-center items-center gap-2 py-4 px-4 bg-gray-100 font-medium rounded-xl hover:animate-pulse"
				>
					Add&nbsp;Photo
				</button>
			</div>
			{/* Photo Gallery */}
			<div className="my-4 mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
				{/* if there are previously added images then show them first */}
				{addedPhotos.length > 0 &&
					addedPhotos.map((link) => (
						<div key={link} className="h-40 flex relative">
							<img
								className="rounded-xl w-full object-cover "
								src={`${baseUrl}/uploads/${link}`}
								alt=""
							/>
							<button
								onClick={(event) => removePhoto(event, link)}
								className="absolute bottom-1 right-1 bg-black bg-opacity-50 px-3 py-2 rounded-2xl text-white cursor-pointer hover:text-primary"
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
										d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
									/>
								</svg>
							</button>
							<button
								onClick={(event) => selectAsMainPhoto(event, link)}
								className="absolute bottom-1 left-1 bg-black bg-opacity-50 px-3 py-2 rounded-2xl text-white cursor-pointer hover:text-primary"
							>
								{link !== addedPhotos[0] ? (
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
											d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
										/>
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="w-6 h-6"
									>
										<path
											fillRule="evenodd"
											d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
											clipRule="evenodd"
										/>
									</svg>
								)}
							</button>
						</div>
					))}
				<label className="border border-gray-300 flex justify-center items-center gap-2 p-10 font-medium rounded-xl h-40 hover:bg-gray-300 cursor-pointer">
					<input
						type="file"
						multiple
						className="hidden"
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
			</div>
		</>
	);
};

export default Uploader;
