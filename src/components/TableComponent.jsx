import React, { useContext, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box, Table, TablePagination, Typography } from "@material-ui/core";
import RowComponent from "./RowComponent";
import { getData } from "../requests/getData";
import { DataContext } from "../store/DataContext";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
	container: {
		maxHeight: "80vh",
	},
	detailsContainer: {
		margin: "auto",
	},
	embeddedXml: {
		color: "#fff",
		background: "#101010",
		borderRadius: "1vw",
		padding: "1vw",
		minWidth: "300px",
		height: "250px",
		overflowY: "scroll",
	},
	image: { width: "30vw", margin: "5vw" },
});

const columnNames = [
	"Użytkownik",
	"Domena",
	"Magazyn",
	"Operation Name",
	"Operation Status",
	"Operation Category",
	"Exception Type",
	"Exception Name",
	"Start Time",
	"End Time",
	"Duration",
];

export default function TableComponent() {
	const { storeData, dispatch } = useContext(DataContext);
	const { dataset, args, page, rowsCount } = storeData;
	const tableRef = useRef(null);
	const rows =
		!!dataset &&
		dataset.map((row) => {
			return row;
		});

	const handleChangePage = async (event, newPage) => {
		const newSkip = newPage * args.limit;
		await dispatch({ type: "loading" });
		tableRef.current.scrollIntoView({
			block: "start",
			inline: "start",
		});
		const { data, error } = await getData({ ...args, skip: newSkip });
		dispatch({
			type: "page",
			payload: {
				limit: args.limit,
				skip: newSkip,
				page: newPage,
				dataset: data,
				error,
			},
		});
	};

	const handleChangeRowsPerPage = async (event) => {
		await dispatch({ type: "loading" });
		tableRef.current.scrollIntoView({
			block: "start",
			inline: "start",
		});
		const { data } = await getData({
			...args,
			limit: parseInt(event.target.value, 10),
			skip: 0,
		});
		dispatch({
			type: "page",
			payload: {
				dataset: data,
				page: 0,
				limit: parseInt(event.target.value, 10),
			},
		});
	};

	const classes = useStyles();
	const tableRow = columnNames.map((header, idx) => (
		<TableCell key={idx}>{header}</TableCell>
	));
	const tableBody =
		!!rows && rows.map((row) => <RowComponent row={row} key={row.Id} />);

	return !!dataset.length ? (
		<Paper>
			<TableContainer className={classes.container}>
				<Table
					className={classes.table}
					stickyHeader
					aria-label="collapsible table"
					ref={tableRef}
					id="table"
				>
					<TableHead>
						<TableRow>{tableRow}</TableRow>
					</TableHead>
					<TableBody>{tableBody}</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				component="div"
				count={rowsCount}
				page={page}
				onChangePage={handleChangePage}
				rowsPerPage={args.limit}
				rowsPerPageOptions={[50, 100, 200, 500]}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	) : (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			width="100vw"
			height="60vh"
			flexDirection="column"
		>
			<img
				src={require("../assets/images/undraw_file_searching_duff.svg")}
				alt=""
				className={classes.image}
			/>
			<Typography variant="h3" gutterBottom component="div">
				Kliknij przycisk "Znajdź" aby zacząć.
			</Typography>
		</Box>
	);
}
