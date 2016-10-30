import uuid from 'node-uuid';

const objInitState = {
	arrDatumList: [
		{
			strId: uuid.v4(),
			numTime: Date.now(),
			arrTags: [
				'yay',
				'bravo',
				'',
			],
		},
		{
			strId: uuid.v4(),
			numTime: Date.now(),
			arrTags: [
				'eh?',
				'',
			],
		},
	],
	objDatumBar: {
		strMode: 'add',
	},
	objDatumCache: {},
	objCurrentDatum: { // datumCurrent ?
		strId: uuid.v4(),
		numTime: Date.now(),
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
				arrDatumList: state.arrDatumList.concat({
					...state.objCurrentDatum,
					numTime: Date.now(),
				}),
			};
		case 'CACHE_CURRENT_DATUM':
			return {
				...state,
				objDatumCache: state.objCurrentDatum,
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
					return datum.strId !== action.strId;
				}),
			};
		case 'EDIT_DATUM':
			return {
				...state,
				objDatumBar: {
					...state.objDatumBar,
					strMode: 'edit',
				},
				objCurrentDatum: state.arrDatumList.filter(datum => {
					return datum.strId === action.strId;
				})[0], // escape array returned by filter
			};
		case 'SAVE_CURRENT_DATUM':
			return {
				...state,
				objDatumBar: {
					...state.objDatumBar,
					strMode: 'add',
				},
				arrDatumList: state.arrDatumList.map(datum => {
					return datum.strId === state.objCurrentDatum.strId ?
					state.objCurrentDatum : datum;
				}),
			};
		case 'UNCACHE_DATUM':
			return {
				...state,
				objCurrentDatum: state.objDatumCache,
				objDatumCache: {},
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
		default:
			return state;
	}
};

export default reducer;
