import React from 'react';

let stateInputInit = {
	class: 'tag-name',
	id: 'tagName0', // name + key ?
	key: 0, // 1, 2, 3...
	name: 'tagName', // or 'tagValue'
	size: 6, // value.length
	type: 'button', // or 'text'
	value: 'TEST',
};

const Input = ({
	stateInput = stateInputInit,
	onFocus,
	onBlur,
	onChange,
}) => {
	return (
		<input
			autoComplete='on'
			className={stateInput.class}
			id={stateInput.id}
			key={stateInput.key}
			name={stateInput.name}
			onFocus={onFocus}
			onBlur={onBlur}
			onChange={onChange}
			size={stateInput.size}
			type={stateInput.type}
			value={stateInput.value}
		/>
	)
}

export default Input;
