import React from "react";
import { Box, Typography } from "@material-ui/core";

const errorContentArr = {
	404: {
		text: "Nic nie znaleziono.",
		img: require("../assets/images/undraw_not_found_60pq.svg"),
	},
	500: {
		text: "Błąd połączenia.",
		img: require("../assets/images/undraw_server_down_s4lk.svg"),
	},
};

const Error = ({ error }) => {
	const style = { width: "30vw", margin: "5vw" };
	console.log(error);
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			width="100vw"
			height="60vh"
			flexDirection="column"
		>
			<img src={errorContentArr[error].img} style={style} alt="" />
			<Typography variant="h3" gutterBottom component="div">
				{errorContentArr[error].text}
			</Typography>
		</Box>
	);
};

export default Error;
