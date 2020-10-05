import axios from "axios";

export const getData = async ({
	limit,
	skip,
	user,
	dateFrom,
	dateTo,
	status,
}) => {
	const dataRes = await axios
		.get(
			`http://localhost:3001/?limit=${limit}&skip=${skip}&user=${user}&status=${status}&dateFrom=${dateFrom}&dateTo=${dateTo}`
		)
		.catch((error) => ({
			data: { recordset: [] },
			error: error?.response?.status || 500,
		}));

	const rowsCountRes = await axios
		.get(
			`http://localhost:3001/getRowsCount?limit=${limit}&skip=${skip}&user=${user}&status=${status}&dateFrom=${dateFrom}&dateTo=${dateTo}`
		)
		.catch((error) => ({
			data: { recordset: 0 },
			error: error?.response?.status || 500,
		}));

	const combinedRes = {
		...dataRes.data,
		rowsCount: rowsCountRes.data.recordset[0][""],
	};
	return {
		data: combinedRes.recordset,
		rowsCount: combinedRes.rowsCount,
		error: dataRes.error || null,
	};
};
