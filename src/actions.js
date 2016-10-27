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

export const funcEditDatum = strId => {
	return {
		type: 'EDIT_DATUM',
		strId,
	};
};

export const funcDeleteDatum = strId => {
	return {
		type: 'DELETE_DATUM',
		strId,
	};
};
