import "date-fns";
import React, { useContext, useState } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { getData } from "../requests/getData";
import { DataContext } from "../store/DataContext";
import {
	KeyboardDateTimePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles(() => ({
	form: { width: "90vw" },
	datePicker: { width: "14vw" },
}));

export default function FilterFields() {
	const { storeData, dispatch } = useContext(DataContext);
	const { args, dataset } = storeData;
	const [{ dateFrom, dateTo }, setDate] = useState({
		dateFrom: new Date("2019-01-04T11:03:00"),
		dateTo: new Date(),
	});
	const classes = useStyles();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const user = e.target.user.value;
		const status = e.target.status.value;

		dispatch({ type: "loading" });

		const res = await getData({
			...args,
			skip: 0,
			dataset,
			dateFrom: dateFrom.toISOString(),
			dateTo: dateTo.toISOString(),
			user,
			status,
		});
		console.log(res);
		const { error } = res;

		dispatch({
			type: "filters",
			payload: {
				dataset: res.data,
				rowsCount: res.rowsCount,
				dateFrom: dateFrom.toISOString(),
				dateTo: dateTo.toISOString(),
				user,
				status,
				error,
			},
		});
	};

	const handleDateChange = (name) => (date) => {
		setDate((prev) => ({ ...prev, [name]: date }));
	};

	return (
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<form autoComplete="off" onSubmit={handleSubmit} className={classes.form}>
				<Grid container justify="space-evenly" alignItems="center" spacing={4}>
					<KeyboardDateTimePicker
						disableToolbar
						variant="inline"
						format="dd/MM/yyyy hh:mm:ss"
						margin="normal"
						className={classes.datePicker}
						name="dateFrom"
						label="Data od (dzień/miesiąc/rok):"
						value={dateFrom}
						onChange={handleDateChange("dateFrom")}
						KeyboardButtonProps={{
							"aria-label": "change date",
						}}
					/>
					<KeyboardDateTimePicker
						disableToolbar
						variant="inline"
						format="dd/MM/yyyy hh:mm:ss"
						margin="normal"
						className={classes.datePicker}
						name="dateTo"
						label="Data do (dzień/miesiąc/rok):"
						value={dateTo}
						onChange={handleDateChange("dateTo")}
						KeyboardButtonProps={{
							"aria-label": "change date",
						}}
					/>
					<TextField
						margin="normal"
						name="user"
						id="user"
						label="Użytkownik:"
					/>
					<TextField
						margin="normal"
						name="status"
						id="status"
						label="Status:"
					/>
					<Button
						variant="contained"
						margin="normal"
						color="secondary"
						type="submit"
						startIcon={<SearchIcon />}
						size="large"
					>
						Znajdź
					</Button>
				</Grid>
			</form>
		</MuiPickersUtilsProvider>
	);
}
