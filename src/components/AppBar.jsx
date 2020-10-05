import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FilterFields from "./FilterFields";
import { Box, Button, FormControlLabel, Switch } from "@material-ui/core";
import { DataContext } from "../store/DataContext";
import { Brightness2, Brightness7 } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
	title: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
	},
	switchLabel: {
		margin: "0.5vh 2vh 0 0",
	},
}));

export default function PrimarySearchAppBar() {
	const { storeData, dispatch } = useContext(DataContext);
	const classes = useStyles();
	const [switchChecked, setSwitchChecked] = useState(false);

	const handleChange = (event) => {
		setSwitchChecked(!event.target.checked);
		dispatch({
			type: "theme",
			payload: {
				theme: event.target.checked ? "dark" : "light",
			},
		});
	};

	const handleWipeSearch = () =>
		dispatch({ type: "dataset", payload: { dataset: [] } });

	return (
		<div className={classes.grow}>
			<AppBar position="static">
				<Toolbar>
					<Typography className={classes.title} variant="h6">
						Dziennik
					</Typography>
					<div className={classes.grow} />
					<FilterFields />
					{!storeData.dataset.length ? (
						<Box display="flex">
							<label htmlFor="checkedB" className={classes.switchLabel}>
								<Brightness7 />
							</label>
							<FormControlLabel
								control={
									<Switch
										checked={switchChecked.checked}
										onChange={handleChange}
										name="checkedB"
										color="secondary"
									/>
								}
								label={<Brightness2 />}
							/>
						</Box>
					) : (
						<Button onClick={handleWipeSearch} variant="contained">
							Wyczyść
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}
