export const funcAddCurrentDatum = () => {
	return {
		type: 'ADD_CURRENT_DATUM',
	};
};

export const funcUpdateCurrentDatumInput = (strTag, intTagIndex) => {
	return {
		type: 'UPDATE_CURRENT_DATUM',
		intTagIndex,
		strTag,
	};
};

export const funcClearCurrentDatum = () => {
	return {
		type: 'CLEAR_CURRENT_DATUM',
	};
};
