import React, { useState } from "react";
import {
	Box,
	Collapse,
	Container,
	IconButton,
	makeStyles,
	TableCell,
	TableRow,
	Typography,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const hiddenColumns = ["Id", "Inputs", "Output", "AuditDate"];

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
	tableCell: { paddingTop: 0, paddingBottom: 0, height: "4vh" },
	foldedCell: { paddingTop: 0, paddingBottom: 0 },
	container: {
		maxHeight: "70vh",
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
});

export default function RowComponent({ row }) {
	const [open, setOpen] = useState(false);

	const classes = useStyles();
	let viewedRow = { ...row };
	hiddenColumns.forEach((item) => delete viewedRow[item]);

	const handleClick = () => setOpen(!open);

	return (
		<>
			<TableRow>
				{Object.values(viewedRow).map((rowItem, idx) => (
					<TableCell key={idx} className={classes.tableCell}>
						<Box display="flex">
							{idx === 0 && (
								<IconButton
									aria-label="expand row"
									size="small"
									onClick={handleClick}
								>
									{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
								</IconButton>
							)}
							{rowItem}
						</Box>
					</TableCell>
				))}
			</TableRow>
			<TableRow>
				<TableCell className={classes.foldedCell} colSpan={10}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<TableCell>
							<Box
								display="flex"
								flexDirection="row"
								width="80vw"
								justifyContent="space-evenly"
							>
								<Box
									width="35vw"
									display="flex"
									justifyItems="center"
									alignContent="center"
									flexDirection="column"
									className={classes.detailsContainer}
								>
									<Typography variant="h6" gutterBottom component="div">
										Inputs
									</Typography>
									<Container className={classes.embeddedXml}>
										{row.Inputs}
									</Container>
								</Box>
								<Box
									width="35vw"
									display="flex"
									justifyItems="center"
									alignContent="center"
									flexDirection="column"
									className={classes.detailsContainer}
								>
									<Typography variant="h6" gutterBottom component="div">
										Output
									</Typography>
									<Container className={classes.embeddedXml}>
										{row.Output}
									</Container>
								</Box>
							</Box>
						</TableCell>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}
