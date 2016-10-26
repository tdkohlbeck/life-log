import uuid from 'node-uuid';

const objInitState = {
	arrDatumList: [
		{
			strId: '0',
			arrTags: [
				'eh?',
			],
		},
		{
			strId: '1',
			arrTags: [
				'eh?',
			],
		},
	],
	objCurrentDatum: {
		strId: uuid.v4(),
		arrTags: [
			'',
		],
	},
};

const reducer = (
	state = objInitState,
	action
) => {
	switch (action.type) {
		case 'ADD_CURRENT_DATUM':
			return {
				...state,
				arrDatumList: state.arrDatumList.concat(
					state.objCurrentDatum
				),
			};
		case 'UPDATE_CURRENT_DATUM':
			return {
				...state,
				objCurrentDatum: {
					...state.objCurrentDatum,
					arrTags: state.objCurrentDatum.arrTags
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
				}
			};
		case 'CLEAR_CURRENT_DATUM':
			return {
				...state,
				objCurrentDatum: objInitState.objCurrentDatum,
			};
		default:
			return state;
	}
};

export default reducer;
