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
			const arrNewDatums = state.arrDatums.concat([state.arrCurrentDatum]); // concat one array, not two tags
			return {
				...state,
				arrDatums: arrNewDatums,
			};
		case 'UPDATE_CURRENT_DATUM':
			const strNewTag = action.strTag;
			const arrNewCurrentDatum = state.arrCurrentDatum
				.map((strOldTag, i) => {
					return i == action.intTagIndex ?
					strNewTag :
					strOldTag ;
				});
			console.log(arrNewCurrentDatum);
			return {
				...state,
				arrCurrentDatum: arrNewCurrentDatum,
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
