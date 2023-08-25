import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import useAuth from "../AuthContext";
import { toast } from "react-hot-toast";
import AboutUser from "../components/AboutUser";
import AccountNav from "../components/AccountNav";
import Places from "./Places";
import Bookings from "./Bookings";

const Profile = () => {
	const profile = useParams();
	const id = profile.id;
	const subpage = profile.subpage;
	const { user } = useAuth();
	const navigate = useNavigate();
	const [userProfile, setUserProfile] = useState(null);
	const randomProfileImage = localStorage.getItem("randomImage");
	const baseUrl = "http://localhost:5000";

	useEffect(() => {
		user &&
			axios
				.get(`/user/profile/${id}`)
				.then((response) => {
					const userData = response.data;
					setUserProfile(userData);
				})
				.catch((error) => {
					toast.error(error.response.data);
				});
	}, [id]);

	// console.log(id, subpage);

	return (
		<div className="flex flex-col gap-4 justify-center items-center">
			<AccountNav subpage={subpage} id={id} />
			<div className="flex flex-col items-center justify-center gap-4 pb-4 w-full mb-[10rem] md:mb-auto">
				{subpage === "profile" ||
					(subpage === undefined && (
						<div className="flex flex-col items-center justify-center gap-4 pb-6 mt-16 lg:mt-8">
							<AboutUser userProfile={userProfile} baseUrl={baseUrl} />
						</div>
					))}

				{subpage === "bookings" && <Bookings />}

				{subpage === "places" && <Places id={id} />}
			</div>
		</div>
	);
};

export default Profile;
