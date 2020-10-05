import { useMediaQuery } from "@material-ui/core";
import { useReducer } from "react";
import storeReducer from "./storeReducer";

export const useStore = () => {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const [storeData, dispatch] = useReducer(storeReducer, {
		dataset: [],
		rowsCount: 0,
		args: {
			skip: 0,
			limit: 100,
			user: "",
			dateFrom: "",
			dateTo: "",
			status: "",
		},
		page: 0,
		isLoading: false,
		error: null,
		theme: prefersDarkMode ? "dark" : "light",
	});
	return [storeData, dispatch];
};
