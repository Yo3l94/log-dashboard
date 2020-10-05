import React, { useMemo, useReducer } from "react";
import "./App.css";
import TableComponent from "./components/TableComponent";
import AppBar from "./components/AppBar";
import LoadingBackdrop from "./components/LoadingBackdrop";
import Error from "./components/Error";
import {
	Box,
	createMuiTheme,
	CssBaseline,
	ThemeProvider,
} from "@material-ui/core";
import { DataContext } from "./store/DataContext";
import { useStore } from "./store/useStore";

function App() {
	const [storeData, dispatch] = useStore();
	// const providerValue = useMemo(() => ({ storeData, dispatch }), [
	// 	storeData,
	// 	dispatch,
	// ]);

	const theme = useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: storeData.theme,
				},
			}),
		[storeData.theme]
	);

	return (
		<ThemeProvider theme={theme}>
			<DataContext.Provider value={{ storeData, dispatch }}>
				<AppBar />
				<CssBaseline />
				<Box
					display="flex"
					height="90vh"
					justifyContent="center"
					alignItems="center"
				>
					{!storeData.error ? (
						<TableComponent />
					) : (
						<Error error={storeData.error} />
					)}
					<LoadingBackdrop open={storeData.isLoading} />
				</Box>
			</DataContext.Provider>
		</ThemeProvider>
	);
}

export default App;
