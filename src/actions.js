export const funcAddCurrentDatum = () => {
	return {
		type: 'ADD_CURRENT_DATUM',
	};
};

export const funcChangeCurrentDatumInput = (strDatum) => {
	return {
		type: 'CHANGE_CURRENT_DATUM',
		strDatum,
	};
};

export const funcClearCurrentDatum = () => {
	return {
		type: 'CLEAR_CURRENT_DATUM',
	};
};
