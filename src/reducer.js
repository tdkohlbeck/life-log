import uuid from 'node-uuid';
let strId = () => uuid.v4();

export const enumLabelType = {
  NAME: 0,
  VALUE: 1,
  TAG: 2,
  properties: {
    0: {description: 'tag name'},
    1: {description: 'tag value'},
    2: {description: 'tag name-value pair'}
  },
};

export const enumBarMode = {
	ADD: 0,
	EDIT: 1,
	properties: {
		0: {description: 'C-rud'},
		1: {description: 'cr-U-d'},
	},
}

const stateDatumBarInit = {
	datumActive: {
		strId: strId(),
		numTime: Date.now(),
		tags: [
			{
				strName: 'health',
			},
			{
				strName: 'happiness',
				strValue: '4',
			},
			{
				strName: 'energy',
				strValue: '3',
			},
		],
	},
	datumsCacheStack: [],
	enumMode: enumBarMode.ADD,
	iBlurred: 0,
	iFocused: 1,
	strTagTypeFocused_DEP: 'name',
	statesInputs: [
		{
			enumType: enumLabelType.NAME,
			isEmpty: false,
			numTag: 0,
			strLabel: 'health',
		},
		{
			enumType: enumLabelType.NAME,
			isEmpty: false,
			numTag: 1,
			strLabel: 'happiness',
		},
		{
			enumType: enumLabelType.VALUE,
			isEmpty: false,
			numTag: 1,
			strLabel: '4',
		},
		{
			enumType: enumLabelType.NAME,
			isEmpty: false,
			numTag: 2,
			strLabel: 'energy',
		},
		{
			enumType: enumLabelType.VALUE,
			isEmpty: false,
			numTag: 2,
			strLabel: '3',
		},
	],
};

const stateAppInit = {
	datumsList: [
		{
			strId: strId(),
			numTime: Date.now(),
			tags: [
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
			strId: strId(),
			numTime: Date.now(),
			tags: [
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
	stateDatumBar: {
		datumActive: {
			strId: strId(),
			numTime: Date.now(),
			tags: [
				{
					strName: 'health',
				},
				{
					strName: 'happiness',
					strValue: '4',
				},
				{
					strName: 'energy',
					strValue: '3',
				},
			],
		},
		datumsCacheStack: [],
		enumMode: enumBarMode.ADD,
		iBlurred: 0,
		iFocused: 1,
		strTagTypeFocused_DEP: 'name',
		statesInputs: [
			{
				enumType: enumLabelType.NAME,
				isEmpty: false,
				numTag: 0,
				strLabel: 'yey?',
			},
			{
				enumType: enumLabelType.NAME,
				isEmpty: false,
				numTag: 1,
				strLabel: 'bravo!',
			},
			{
				enumType: enumLabelType.VALUE,
				isEmpty: false,
				numTag: 1,
				strLabel: '4',
			},
			{
				enumType: enumLabelType.NAME,
				isEmpty: false,
				numTag: 2,
				strLabel: 'energy',
			},
			{
				enumType: enumLabelType.VALUE,
				isEmpty: false,
				numTag: 2,
				strLabel: '3',
			},
		],
	},
};

const reducerDatumBar = (
	state = stateDatumBarInit,
	action
) => {
	switch (action.type) {
		case 'CACHE_ACTIVE_DATUM':
			return {
				...state,
				datumsCacheStack: [
					...state.datumsCacheStack,
					state.datumActive,
				],
			};
		case 'UNCACHE_DATUM':
			state.datumsCacheStack.pop();
			return state;
		case 'CLEAR_ACTIVE_DATUM':
			return {
				...state,
				datumActive: {
					...stateDatumBarInit.datumActive,
					numTime: Date.now(),
					strId: strId(),
				},
			};
		case 'FOCUS_INPUT': // TODO: replace CONVERT_TO_INPUT
			return {
				...state,
				statesInputs: [
					...state.statesInputs,
				],
			};
		case 'UPDATE_ACTIVE_INPUT':
		default:
	}
};

const reducerApp = (
	state = stateAppInit,
	action
) => {
	switch (action.type) {
		case 'ADD_ACTIVE_DATUM':
			return {
				...state,
				datumsList: state.datumsList.concat({
					...state.datumActive,
					numTime: Date.now(),
					tags: state.stateDatumBar.datumActive.tags
						.filter(tag => {
							return tag.strName
						}), // filter out last empty tag (couldn't figure out .pop())
				}),
			};
		case 'CACHE_CURRENT_DATUM':
			return {
				...state,
				datumCached: state.datumActive,
			};
		case 'CLEAR_CURRENT_DATUM':
			return {
				...state,
				datumActive: {
					...stateAppInit.datumActive,
					numTime: Date.now(),
					strId: strId(),
				},
			};
		case 'CONVERT_TO_INPUT':
			return {
				...state,
				stateDatumBar: {
					...state.stateDatumBar,
					iFocused: action.intTagIndex,
					strTagTypeFocused_DEP: action.strTagType
				},
			};
		//case 'CONVERT_TO_BUTTON':
		case 'DELETE_DATUM':
			return {
				...state,
				datumsList: state.datumsList.filter(datum => {
					return datum.strId !== action.strId;
				}),
				datumActive: state.stateDatumBar.strMode === 'edit' &&
					state.datumActive.strId === action.strId ?
					stateAppInit.datumActive :
					state.datumActive,
			};
		case 'EDIT_DATUM':
			return {
				...state,
				stateDatumBar: {
					...state.stateDatumBar,
					strMode: 'edit',
				},
				datumActive: state.datumsList.filter(datum => {
					return datum.strId === action.strId;
				})[0], // escape array returned by filter
			};
		case 'SAVE_CURRENT_DATUM':
			return {
				...state,
				stateDatumBar: {
					...state.stateDatumBar,
					strMode: 'add',
				},
				datumsList: state.datumsList
					.map(datum => {
						return datum.strId === state.datumActive.strId ?
						{
							...state.datumActive,
							tags: state.datumActive.tags
								.filter(tag => {
									return tag.strName
								}), // filter out last empty tag (couldn't figure out .pop())
						} :
						datum ;
					}),
			};
		case 'UNCACHE_DATUM':
			return {
				...state,
				datumActive: state.datumCached,
				datumCached: {},
			};
		case 'UPDATE_FOCUSED_TAG_NAME':
			// TODO: detect ':' and switch to tag value
			return {
				...state,
				stateDatumBar: {
					...state.stateDatumBar,
					datumActive: {
						...state.stateDatumBar.datumActive,
						numTime: state.stateDatumBar.enumMode === enumBarMode.EDIT ?
							state.datumActive.numTime :
							Date.now() ,
						tags: state.stateDatumBar.datumActive.tags
						// replace the tag that changed
							.map((tag, i) => {
								return i+1 === action.numIndex ?
								{
									strName: action.strTagName,
									strValue: tag.strValue
								} :
								tag
							})
							// remove any empty tags
							.filter(tag => {
								return tag.strName !== ''; // '' == false
							})
							// make sure there's an empty tag available!
							.concat({
								strName: '',
							}),
					},
				},
			};
		case 'UPDATE_FOCUSED_TAG_VALUE':
			return {
				...state,
				stateDatumBar: {
					datumActive: {
						...state.stateDatumBar.datumActive,
						numTime: state.stateDatumBar.enumMode === enumBarMode.EDIT ?
							state.stateDatumBar.datumActive.numTime :
							Date.now() ,
						tags: state.stateDatumBar.datumActive.tags
						// replace the tag that changed
						.map((tag, i) => {
							return i+1 === action.numIndex ?
							{
								strName: tag.strName,
								strValue: action.strTagValue
							} :
							tag ;
						}),
						// remove any empty tags
						/*.filter(tag => {
							return tag.strValue != ''; // '' == false
						}),*/
					}
				}
			}
		default:
			return state;
	}
};

export default reducerApp;
