const initState = {
	arrDatums: [
		'yey?',
		'bravo!',
	],
	strCurrentDatum: 'eh',
};

const reducer = (
	state = initState,
	action
) => {
	switch (action.type) {
		case 'ADD_CURRENT_DATUM':
			return {
				...state,
				arrDatums: state
					.arrDatums.concat(state.strCurrentDatum),
			};
		case 'CHANGE_CURRENT_DATUM':
			return {
				...state,
				strCurrentDatum: action.strDatum,
			};
		case 'CLEAR_CURRENT_DATUM':
			return {
				...state,
				strCurrentDatum: '',
			};
		default:
			return state;
	}
};

export default reducer;
