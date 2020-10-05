export default (state, { type, payload }) => {
	console.log("state: ", state);
	switch (type) {
		case "dataset":
			return { ...state, dataset: payload.dataset, isLoading: false };
		case "page":
			return {
				...state,
				dataset: payload.dataset,
				args: { ...state.args, skip: payload.skip, limit: payload.limit },
				page: payload.page,
				isLoading: false,
				error: payload.error,
			};
		case "filters":
			return {
				...state,
				dataset: payload.dataset,
				rowsCount: payload.rowsCount,
				args: {
					...state.args,
					user: payload.user,
					dateFrom: payload.dateFrom,
					dateTo: payload.dateTo,
					status: payload.status,
				},
				page: 0,
				isLoading: false,
				error: payload.error,
			};
		case "loading":
			return {
				...state,
				isLoading: true,
			};
		case "error":
			return {
				...state,
				error: payload.error,
				isLoading: false,
			};
		case "theme":
			return {
				...state,
				theme: payload.theme,
			};
		default:
			return state;
	}
};
