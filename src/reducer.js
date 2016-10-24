const initState = {
	arrDatums: [
		[
			'yey?',
			'bravo!',
		],
		[
			'pinkie',
			'pie',
		],
	],
	arrCurrentDatum: [
		'eh',
		'ah!',
	],
};

const reducer = (
	state = initState,
	action
) => {
	switch (action.type) {
		case 'ADD_CURRENT_DATUM':
			return {
				...state,
				arrDatums: state.arrDatums.concat(
					[state.arrCurrentDatum] // concat one array not two tags
				),
			};
		case 'UPDATE_CURRENT_DATUM':
			return {
				...state,
				arrCurrentDatum: state.arrCurrentDatum.map(
					(strTag, i) => {
						return i == action.intTagIndex ?
						action.strTag :
						strTag ;
					}
				),
			};
		case 'CLEAR_CURRENT_DATUM':
			return {
				...state,
				arrCurrentDatum: [
					'',
					''
				],
			};
		default:
			return state;
	}
};

export default reducer;
