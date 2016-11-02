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
  numTagIndexFocused,
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
          type={numTagIndexFocused === 0 ? 'text' : 'button'}
          autoFocus={numTagIndexFocused === 0 ? true : false}
          value={time}
          onChange={funcUpdateFocusedTagName}
          onFocus={funcConvertToInput}
          onBlur={funcConvertToButton}
        />
        {objCurrentDatum.arrTags.map((objTag, i) => {
          if (objTag.strName) {
            return (
              <span key={i+99}>
                <input
                  autoFocus={true}
                  name={i+1}
                  key={i+1}
                  value={objTag.strName}
                  onChange={funcUpdateFocusedTagName}
                  onBlur={funcConvertToButton}
                  onFocus={funcConvertToInput}
                />
                <input
                  name={i+1}
                  key={i-99}
                  value={objTag.strValue}
                  onChange={funcUpdateFocusedTagValue}
                  onBlur={funcConvertToButton}
                  onFocus={funcConvertToInput}
                />
              </span>
            );
          } else {
            return (
              <input
                autoFocus={numTagIndexFocused === i+1 ? true : false}
                name={i+1}
                key={i+1}
                value={objTag.strName}
                type={i+1 === numTagIndexFocused ? 'text' : 'button'}
                onChange={funcUpdateFocusedTagName}
                onBlur={funcConvertToButton}
                onFocus={funcConvertToInput}
              />
            );
          }
        })}
        <span>{' '}</span>
        <button
          name={objCurrentDatum.arrTags.length + 1}
          onClick={funcOnSubmit}
          onBlur={funcConvertToButton}
          onFocus={funcConvertToInput}
        >
          {strDatumBarMode == 'add' ? '+' : 'e'}
        </button>
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
  numTagIndexFocused,
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
        numTagIndexFocused       ={numTagIndexFocused}
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
    numTagIndexFocused: state.objDatumBar.numTagIndexFocused,
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
      let intTagIndex = parseInt(e.target.name);
      dispatch(funcConvertToInput(intTagIndex));
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
