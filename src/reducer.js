import uuid from 'node-uuid';

const objInitState = {
	arrDatumList: [
		{
			strId: uuid.v4(),
			numTime: Date.now(),
			arrTags: [
				{
					strName: 'meditate',
				},
				{
					strName: 'minutes',
					numValue: 30,
				},
			],
		},
		{
			strId: uuid.v4(),
			numTime: Date.now(),
			arrTags: [
				{
					strName: 'exercise',
				},
				{
					strName: 'squats',
					numValue: 100,
				},
				{
					strName: 'heartrate',
					numValue: 158,
				},
			],
		},
	],
	objDatumBar: {
		strMode: 'add',
		numInputFocused: 0
	},
	objDatumCache: {},
	objCurrentDatum: { // datumCurrent ?
		strId: uuid.v4(),
		numTime: Date.now(),
		arrTags: [
			'a',
			'b',
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
					numTime: Date.now(),
					strId: uuid.v4(),
				},
			};
		case 'CONVERT_TO_INPUT':
			return {
				...state,
				objDatumBar: {
					...state.objDatumBar,
					numInputFocused: action.intTagIndex,
				},
			};
		//case 'CONVERT_TO_BUTTON':
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
			let strLastChar = action.strTag
				.charAt(action.strTag.length - 1);
			return {
				...state,
				objCurrentDatum: {
					...state.objCurrentDatum,
					numTime: state.objDatumBar.strMode == 'edit' ?
						state.objCurrentDatum.numTime :
						Date.now() ,
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
