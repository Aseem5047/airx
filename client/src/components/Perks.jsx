import React from "react";

const Perks = ({ selected, onChange, finalData }) => {
	const handleCheckedItem = (e) => {
		const { checked, name } = e.target;
		if (checked) {
			onChange([...selected, name]);
			finalData.features = [...selected, name];
		} else {
			onChange([...selected.filter((selectedName) => selectedName !== name)]);
			finalData.features = [
				...selected.filter((selectedName) => selectedName !== name),
			];
		}
	};
	return (
		<>
			<div className="grid gap-3 mt-4 mb-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
				<label className="relative  flex items-center justify-start lg:justify-center gap-4 border border-gray-300 p-4 rounded-xl cursor-pointer hover:bg-[#80808014]">
					<input
						type="checkbox"
						checked={selected.includes("wifi")}
						name="wifi"
						onChange={handleCheckedItem}
					/>

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
							d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
						/>
					</svg>

					<span>Free Wifi</span>
					<label className="w-full h-full absolute -z-10 hidden " />
				</label>

				<label className="relative flex items-center justify-start lg:justify-center gap-4 border border-gray-300 p-4 rounded-xl cursor-pointer hover:bg-[#80808014]">
					<input
						type="checkbox"
						checked={selected.includes("parking")}
						name="parking"
						onChange={handleCheckedItem}
					/>

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
							d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
						/>
					</svg>

					<span>Free Parking</span>
					<label className="w-full h-full absolute -z-10 hidden " />
				</label>

				<label className="relative flex items-center justify-start lg:justify-center gap-4 border border-gray-300 p-4 rounded-xl cursor-pointer hover:bg-[#80808014]">
					<input
						type="checkbox"
						checked={selected.includes("tv")}
						name="tv"
						onChange={handleCheckedItem}
					/>

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
							d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
						/>
					</svg>

					<span>TV</span>
					<label className="w-full h-full absolute -z-10 hidden " />
				</label>

				<label className="relative flex items-center justify-start lg:justify-center gap-4 border border-gray-300 p-4 rounded-xl cursor-pointer hover:bg-[#80808014]">
					<input
						type="checkbox"
						checked={selected.includes("pets")}
						name="pets"
						onChange={handleCheckedItem}
					/>

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
							d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
						/>
					</svg>

					<span>Pets</span>
					<label className="w-full h-full absolute -z-10 hidden " />
				</label>

				<label className="relative flex items-center justify-start lg:justify-center gap-4 border border-gray-300 p-4 rounded-xl cursor-pointer hover:bg-[#80808014]">
					<input
						type="checkbox"
						checked={selected.includes("entrance")}
						name="entrance"
						onChange={handleCheckedItem}
					/>

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
							d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
						/>
					</svg>

					<span>Private Entrance</span>
					<label className="w-full h-full absolute -z-10 hidden " />
				</label>

				<label className="relative flex items-center justify-start lg:justify-center gap-4 border border-gray-300 p-4 rounded-xl cursor-pointer hover:bg-[#80808014]">
					<input
						type="checkbox"
						checked={selected.includes("theater")}
						name="theater"
						onChange={handleCheckedItem}
					/>

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
							d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
						/>
					</svg>

					<span>Personal Theater</span>
					<label className="w-full h-full absolute -z-10 hidden " />
				</label>
			</div>
		</>
	);
};

export default Perks;
