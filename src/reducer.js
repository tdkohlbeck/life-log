//import uuid from 'node-uuid';

let i = 0
const strRandId = () => {
	i++;
	return i.toString();
};

const objInitState = {
	arrDatumList: [
		{
			strId: strRandId(),
			numTime: Date.now(),
			arrTags: [
				{
					strName: 'meditate',
				},
				{
					strName: 'minutes',
					strValue: '30',
				},
			],
		},
		{
			strId: strRandId(),
			numTime: Date.now(),
			arrTags: [
				{
					strName: 'exercise',
				},
				{
					strName: 'squats',
					strValue: '100',
				},
				{
					strName: 'heartrate',
					strValue: '158',
				},
			],
		},
	],
	objDatumBar: {
		strMode: 'add',
		numTagIndexFocused: 1,
		strTagTypeFocused: 'name',
	},
	objDatumCache: {},
	objCurrentDatum: { // datumCurrent ?
		strId: strRandId(),
		numTime: Date.now(),
		arrTags: [
			{
				strName: '',
				strValue: '',
			},
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
					arrTags: state.objCurrentDatum.arrTags
						.filter(objTag => {
							return objTag.strName
						}), // filter out last empty tag (couldn't figure out .pop())
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
					strId: strRandId(),
				},
			};
		case 'CONVERT_TO_INPUT':
			return {
				...state,
				objDatumBar: {
					...state.objDatumBar,
					numTagIndexFocused: action.intTagIndex,
					strTagTypeFocused: action.strTagType
				},
			};
		//case 'CONVERT_TO_BUTTON':
		case 'DELETE_DATUM':
			return {
				...state,
				arrDatumList: state.arrDatumList.filter(datum => {
					return datum.strId !== action.strId;
				}),
				objCurrentDatum: state.objDatumBar.strMode === 'edit' &&
					state.objCurrentDatum.strId === action.strId ?
					objInitState.objCurrentDatum :
					state.objCurrentDatum,
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
				arrDatumList: state.arrDatumList
					.map(datum => {
						return datum.strId === state.objCurrentDatum.strId ?
						{
							...state.objCurrentDatum,
							arrTags: state.objCurrentDatum.arrTags
								.filter(objTag => {
									return objTag.strName
								}), // filter out last empty tag (couldn't figure out .pop())
						} :
						datum ;
					}),
			};
		case 'UNCACHE_DATUM':
			return {
				...state,
				objCurrentDatum: state.objDatumCache,
				objDatumCache: {},
			};
		case 'UPDATE_FOCUSED_TAG_NAME':
			//let strLastChar = action.strTagName
			//	.charAt(action.strTagName.length - 1);
			return {
				...state,
				objCurrentDatum: {
					...state.objCurrentDatum,
					numTime: state.objDatumBar.strMode === 'edit' ?
						state.objCurrentDatum.numTime :
						Date.now() ,
					arrTags: state.objCurrentDatum.arrTags
						// replace the tag that changed
						.map((objTag, i) => {
							return i+1 === action.numIndex ?
							{
								strName: action.strTagName,
								strValue: objTag.strValue
							} :
							objTag ;
						})
						// remove any empty tags
						.filter(objTag => {
							return objTag.strName != ''; // '' == false
						})
						// make sure there's an empty tag available!
						.concat({
							strName: '',
						}),
				}
			};
		case 'UPDATE_FOCUSED_TAG_VALUE':
			return {
				...state,
				objCurrentDatum: {
					...state.objCurrentDatum,
					numTime: state.objDatumBar.strMode === 'edit' ?
						state.objCurrentDatum.numTime :
						Date.now() ,
					arrTags: state.objCurrentDatum.arrTags
						// replace the tag that changed
						.map((objTag, i) => {
							return i+1 === action.numIndex ?
							{
								strName: objTag.strName,
								strValue: action.strTagValue
							} :
							objTag ;
						}),
						// remove any empty tags
						/*.filter(objTag => {
							return objTag.strValue != ''; // '' == false
						}),*/
				}
			}
		default:
			return state;
	}
};

export default reducer;
