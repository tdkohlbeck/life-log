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
	objAddDatumBar: {
		mode: 'add',
	},
	objCurrentDatum: { // datumCurrent ?
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
		case 'CLEAR_CURRENT_DATUM':
			return {
				...state,
				objCurrentDatum: {
					...objInitState.objCurrentDatum,
					strId: uuid.v4(),
				},
			};
		case 'DELETE_DATUM':
			return {
				...state,
				arrDatumList: state.arrDatumList.filter(datum => {
					return datum.strId != action.strId;
				}),
			};
		case 'EDIT_DATUM':
			return state;
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
		default:
			return state;
	}
};

export default reducer;
