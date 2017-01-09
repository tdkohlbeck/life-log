import React from 'react';
import Input from '../Input';
import { getTimeString } from '../../utils';

import {
  enumBarMode,
} from '../../reducer';

export const DatumBar = ({
  funcAddActiveDatum,
  funcConvertToButton,
  funcConvertToInput,
  funcSaveActiveDatum,
  funcUpdateFocusedTagName,
  funcUpdateFocusedTagValue,
  funcUpdateFocusedInput,
  state,
}) => {
  let funcOnSubmit;
  if (state.enumMode === enumBarMode.ADD) {
    funcOnSubmit = funcAddActiveDatum;
  } else if (state.enumMode === enumBarMode.EDIT) {
    funcOnSubmit = funcSaveActiveDatum;
  }
  let funcGenerateColor = () => {
    let numColors = 15; // eslint-disable-next-line
    let numRandColor = Math.floor(Math.random() * numColors) * 360 / numColors;
    return "grey";//`hsl(${numRandColor}, 60%, 75%)`;
  }
  let funcGenerateStyle = () => {
    return {
      backgroundColor: funcGenerateColor(),
    }
  };
  return (
    <div id='div-datum-bar' >
      <form onSubmit={funcOnSubmit} >
        <input
          autoFocus={state.iFocused === 0}
          name={0}
          size={getTimeString(state.datumActive.numTime).length}
          style={funcGenerateStyle()}
          type={state.iFocused === 0 ? 'text' : 'button'}
          value={getTimeString(state.datumActive.numTime)}
          onChange={funcUpdateFocusedTagName}
          onFocus={funcConvertToInput}
        />
      {state.statesInputs.map((stateInput, i) => {
        return (
          <Input
            key={i}
            stateInput={stateInput}
            onFocus={funcConvertToInput}
            onBlur={funcConvertToButton}
            onChange={funcUpdateFocusedInput}
          />
        )
      })}
        {/*state.datumActive.tags.map((tag, i) => {
          if (i+1 === state.iFocused) {
            if (tag.strName) {
              return (
                <span
                  key={i+99}
                  className='tag'
                  style={funcGenerateStyle()}
                  >
                  <input
                    name={i+1}
                    key={i+1}
                    id={'name'}
                    className='tag-name'
                    size={tag.strName.length}
                    onFocus={funcConvertToInput}
                    type={
                      state.iFocused === i+1 &&
                      state.strTagTypeFocused_DEP === 'name' ?
                      'text' : 'button'
                    }
                    value={
                      state.strTagTypeFocused_DEP === 'value' ?
                      `${tag.strName}:` :
                      tag.strName
                    }
                    onChange={funcUpdateFocusedTagName}
                    autoFocus={
                      state.iFocused === i+1 &&
                      state.strTagTypeFocused_DEP === 'name'
                    }
                    onBlur={funcConvertToButton}
                  />
                  <input
                    name={i+1}
                    key={i-99}
                    size={
                      tag.strValue ?
                      tag.strValue.length :
                      1
                    }
                    id={'value'}
                    onFocus={funcConvertToInput}
                    type={
                      state.iFocused === i+1 &&
                      state.strTagTypeFocused_DEP === 'value' ?
                      'text' : 'button'
                     }
                    value={
                      state.strTagTypeFocused_DEP === 'value' ?
                        tag.strValue ?
                          tag.strValue :
                          '' :
                        tag.strValue ?
                          `: ${tag.strValue}` :
                          ':'
                    }
                    autoFocus={
                      state.iFocused === i+1 &&
                      tag.strValue
                    }
                    onChange={funcUpdateFocusedTagValue}
                    onBlur={funcConvertToButton}
                  />
                </span>
              );
            } else {
              return (
                <input
                  name={i+1}
                  key={i+1}
                  id={'name'}
                  size={tag.strName ? tag.strName.length : 1}
                  style={funcGenerateStyle()}
                  value={tag.strName}
                  onFocus={funcConvertToInput}
                  type={i+1 === state.iFocused ? 'text' : 'button'}
                  onChange={funcUpdateFocusedTagName}
                  autoFocus={
                    state.iFocused === i+1 &&
                    !tag.strName
                  }
                  onBlur={funcConvertToButton}

                />
              );
            }
          } else {
            return (
              <input
                name={i+1}
                key={i+1}
                id={'name'}
                size={tag.strName.length}
                style={funcGenerateStyle()}
                onFocus={funcConvertToInput}
                value={
                  tag.strValue ?
                  `${tag.strName}: ${tag.strValue}` :
                    tag.strName ?
                    tag.strName :
                    `+t`
                }
                type={'button'}
                onChange={funcUpdateFocusedTagName}
                onBlur={funcConvertToButton}
              />
            );
          }
        })*/}
        <span>{' '}</span>
        <input
          type='button'
          value={
            state.enumMode === enumBarMode.ADD ?
              'Add' : 'Edit'
          }
          name={state.datumActive.tags.length + 1}
          style={funcGenerateStyle()}
          onClick={funcOnSubmit}
          onFocus={funcConvertToInput}
        />
      </form>
    </div>
  );
};
