/* eslint-disable */

import React from 'react';
import { connect } from 'react-redux';

import {
  funcAddCurrentDatum,
  funcUpdateFocusedTagName,
  funcUpdateFocusedTagValue,
  funcCacheCurrentDatum,
  funcClearCurrentDatum,
  funcConvertToButton,
  funcConvertToInput,
  funcEditDatum,
  funcDeleteDatum,
  funcSaveCurrentDatum,
  funcUncacheDatum,
} from './actions';

import { getTimeString } from './utils';

import './App.css';

const View = ({
  arrDatumList,
  funcEditDatum,
  funcDeleteDatum,
}) => {
  return (
    <div id='view'>
      <ul>
        {arrDatumList.map((objDatum, i) => {
          let strTime = getTimeString(
            objDatum.numTime
            //['Hours', 'Minutes', 'Seconds']
          );
          return (
            <li
              key      ={i}
              className='li-datum'
            >
              <span>
                {strTime + ' '}
              </span>
              {objDatum.arrTags.map((objTag, i) => {
                return (
                  <span key={i} >
                    {
                      objTag.strValue ?
                      `${objTag.strName}: ${objTag.strValue}, ` :
                      `${objTag.strName}, `
                    }
                  </span>
                );
              })}
              <button
                name='edit'
                value={objDatum.strId}
                onClick={funcEditDatum}
              >e</button>
              <span>{' '}</span>
              <button
                name='delete'
                value={objDatum.strId}
                onClick={funcDeleteDatum}
              >x</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const DatumBar = ({
  funcAddCurrentDatum,
  funcConvertToButton,
  funcConvertToInput,
  funcSaveCurrentDatum,
  funcUpdateFocusedTagName,
  funcUpdateFocusedTagValue,
  objState,
  objCurrentDatum,
  strDatumBarMode,
}) => {
  let funcOnSubmit;
  switch(strDatumBarMode) {
    case 'add':
      funcOnSubmit = funcAddCurrentDatum;
      break;
    case 'edit':
      funcOnSubmit = funcSaveCurrentDatum;
      break;
  }
  let time = new Date(objCurrentDatum.numTime).toLocaleTimeString();
  return (
    <div id='datum-bar'>
      <form onSubmit={funcOnSubmit} >
        <input
          name={0}
          type={objState.numTagIndexFocused === 0 ? 'text' : 'button'}
          autoFocus={objState.numTagIndexFocused === 0}
          value={getTimeString(objCurrentDatum.numTime)}
          size={getTimeString(objCurrentDatum.numTime).length}
          onChange={funcUpdateFocusedTagName}
          onFocus={funcConvertToInput}
        />
        {objCurrentDatum.arrTags.map((objTag, i) => {
          if (i+1 === objState.numTagIndexFocused) {
            if (objTag.strName) {
              return (
                <span
                  key={i+99}
                  className='tag'
                  >
                  <input
                    name={i+1}
                    key={i+1}
                    id={'name'}
                    className='tag-name'
                    size={objTag.strName.length}
                    onFocus={funcConvertToInput}
                    type={
                      objState.numTagIndexFocused === i+1 &&
                      objState.strTagTypeFocused === 'name' ?
                      'text' : 'button'
                    }
                    value={
                      objState.strTagTypeFocused === 'value' ?
                      `${objTag.strName}:` :
                      objTag.strName
                    }
                    onChange={funcUpdateFocusedTagName}
                    autoFocus={
                      objState.numTagIndexFocused === i+1 &&
                      objState.strTagTypeFocused === 'name'
                    }
                    onBlur={funcConvertToButton}
                  />
                  <input
                    name={i+1}
                    key={i-99}
                    size={
                      objTag.strValue ?
                      objTag.strValue.length :
                      1
                    }
                    id={'value'}
                    onFocus={funcConvertToInput}
                    type={
                      objState.numTagIndexFocused === i+1 &&
                      objState.strTagTypeFocused === 'value' ?
                      'text' : 'button'
                     }
                    value={
                      objState.strTagTypeFocused === 'value' ?
                        objTag.strValue ?
                          objTag.strValue :
                          '' :
                        objTag.strValue ?
                          `: ${objTag.strValue}` :
                          ':'
                    }
                    autoFocus={
                      objState.numTagIndexFocused === i+1 &&
                      objTag.strValue
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
                  size={objTag.strName ? objTag.strName.length : 1}
                  value={objTag.strName}
                  onFocus={funcConvertToInput}
                  type={i+1 === objState.numTagIndexFocused ? 'text' : 'button'}
                  onChange={funcUpdateFocusedTagName}
                  autoFocus={
                    objState.numTagIndexFocused === i+1 &&
                    !objTag.strName
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
                size={objTag.strName.length}
                onFocus={funcConvertToInput}
                value={
                  objTag.strValue ?
                  `${objTag.strName}: ${objTag.strValue}` :
                    objTag.strName ?
                    objTag.strName :
                    `+t`
                }
                type={'button'}
                onChange={funcUpdateFocusedTagName}
                onBlur={funcConvertToButton}
              />
            );
          }
        })}
        <span>{' '}</span>
        <input
          type='button'
          value={
            strDatumBarMode == 'add' ?
              'Add' : 'Edit'
          }
          name={objCurrentDatum.arrTags.length + 1}
          onClick={funcOnSubmit}
          onFocus={funcConvertToInput}
        />
      </form>
    </div>
  );
};

const App = ({
  arrDatumList,
  funcAddCurrentDatum,
  funcDeleteDatum,
  funcEditDatum,
  funcSaveCurrentDatum,
  funcUpdateFocusedTagName,
  funcUpdateFocusedTagValue,
  funcConvertToButton,
  funcConvertToInput,
  objBarState,
  objCurrentDatum,
  strDatumBarMode,
}) => {
  return (
    <div className="app">
      <View
        arrDatumList   ={arrDatumList}
        funcEditDatum  ={funcEditDatum}
        funcDeleteDatum={funcDeleteDatum}
      />
      <DatumBar
        funcUpdateFocusedTagName={funcUpdateFocusedTagName}
        funcUpdateFocusedTagValue={funcUpdateFocusedTagValue}
        funcAddCurrentDatum   ={funcAddCurrentDatum}
        funcSaveCurrentDatum  ={funcSaveCurrentDatum}
        funcConvertToButton   ={funcConvertToButton}
        funcConvertToInput    ={funcConvertToInput}
        objCurrentDatum       ={objCurrentDatum}
        objState              ={objBarState}
        strDatumBarMode       ={strDatumBarMode}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    arrDatumList: state.arrDatumList,
    objCurrentDatum: state.objCurrentDatum,
    strDatumBarMode: state.objDatumBar.strMode,
    objBarState: state.objDatumBar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    funcAddCurrentDatum: (e) => {
      e.preventDefault();
      dispatch(funcAddCurrentDatum());
      dispatch(funcClearCurrentDatum());
    },
    funcConvertToButton: (e) => {
      e.preventDefault();
      let intTagIndex = parseInt(e.target.name);
      dispatch(funcConvertToButton(intTagIndex));
    },
    funcConvertToInput: (e) => {
      e.preventDefault();
      //if (e.target.value == ':') e.target.select();
      let intTagIndex = parseInt(e.target.name);
      dispatch(funcConvertToInput(
        intTagIndex,
        e.target.id
      ));
    },
    funcDeleteDatum: (e) => {
      dispatch(funcDeleteDatum(e.target.value));
    },
    funcEditDatum: (e) => {
      dispatch(funcCacheCurrentDatum())
      dispatch(funcEditDatum(e.target.value));
    },
    funcSaveCurrentDatum: (e) => {
      e.preventDefault();
      dispatch(funcSaveCurrentDatum());
      dispatch(funcUncacheDatum());
    },
    funcUpdateFocusedTagName: (e) => {
      dispatch(funcUpdateFocusedTagName(
        e.target.value,
        parseInt(e.target.name)
      ));
    },
    funcUpdateFocusedTagValue: (e) => {
      dispatch(funcUpdateFocusedTagValue(
        e.target.value,
        parseInt(e.target.name)
      ));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);;
