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
				arrCurrentDatum: state.arrCurrentDatum
					// replace the tag that changed
					.map((strTag, i) => {
						return i == action.intTagIndex ?
						action.strTag :
						strTag ;
					})
					// remove any empty tags
					.filter(strTag => {
						return strTag != false; // '' == false
					})
					// make sure there's an empty tag available!
					.concat(''),
			};
		case 'CLEAR_CURRENT_DATUM':
			return {
				...state,
				arrCurrentDatum: [
					'',
				],
			};
		default:
			return state;
	}
};

export default reducer;
