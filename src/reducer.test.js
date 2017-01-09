import {
	funcCreateInputStates,
	funcUpdateInputState,
	enumBarMode,
	enumLabelType,
} from './reducer';

describe('funcCreateInputStates', () => {
	it('maps tags to input states', () => {
		const datum = {
			strId: 0,
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
		};
		const states = [
			{
				enumType: enumLabelType.NAME,
				numTag: 0,
				strLabel: 'health',
			},
			{
				enumType: enumLabelType.NAME,
				numTag: 1,
				strLabel: 'happiness',
			},
			{
				enumType: enumLabelType.VALUE,
				numTag: 1,
				strLabel: '4',
			},
			{
				enumType: enumLabelType.NAME,
				numTag: 2,
				strLabel: 'energy',
			},
			{
				enumType: enumLabelType.VALUE,
				numTag: 2,
				strLabel: '3',
			},
		];
		expect(funcCreateInputStates(datum))
			.toEqual(states);
	});
});

describe('funcUpdateInputState', () => {
	let iBlurred = undefined;
	let iFocused = undefined;
	let stateInput = {
		enumType: enumLabelType.NAME,
		numTag: 0,
		strLabel: 'health',
	}
	it('splits tags when focused', () => {
		expect(funcUpdateInputState())
	});

	it('joins tags when blurred', () => {

	});

	it('removes empty values', () => {

	});

	it('creates')
});
