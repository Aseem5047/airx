import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<Toaster
			toastOptions={{
				style: {
					padding: "16px",
					color: "black",
				},
				position: "bottom center", // Set the position to "bottom"
			}}
		/>

		<App />
	</BrowserRouter>
);
