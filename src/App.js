/* eslint-disable */

import React from 'react';
import { connect } from 'react-redux';

import {
  funcAddCurrentDatum,
  funcUpdateCurrentDatum,
  funcCacheCurrentDatum,
  funcClearCurrentDatum,
  funcConvertToButton,
  funcConvertToInput,
  funcEditDatum,
  funcDeleteDatum,
  funcSaveCurrentDatum,
  funcUncacheDatum,
} from './actions';

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
          let strTime = new Date(objDatum.numTime);
          return (
            <li
              key      ={i}
              className='li-datum'
            >
              <span>
                {strTime.toLocaleTimeString() + ' '}
              </span>
              {objDatum.arrTags.map((objTag, i) => {
                return (
                  <span key={i} >
                    {`${objTag.strName}: ${objTag.numValue}, `}
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
  funcUpdateCurrentDatum,
  numInputFocused,
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
        <button
          name='time'
          placeholder={time}
          onClick={e => e.preventDefault()}
          onFocus={funcConvertToInput}
          onBlur={funcConvertToButton}
        >{time}</button>
        {objCurrentDatum.arrTags.map((objTag, i) => {
          return (
            <input
              name={i}
              key={i}
              value={objTag.strName}
              type={i === numInputFocused? 'text' : 'button'}
              onChange={funcUpdateCurrentDatum}
              onBlur={funcConvertToButton}
              onFocus={funcConvertToInput}
            />
          );
        })}
        <span>{' '}</span>
        <button
          onClick={funcOnSubmit}
        ></button>
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
  funcUpdateCurrentDatum,
  funcConvertToButton,
  funcConvertToInput,
  numInputFocused,
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
        funcUpdateCurrentDatum={funcUpdateCurrentDatum}
        funcAddCurrentDatum   ={funcAddCurrentDatum}
        funcSaveCurrentDatum  ={funcSaveCurrentDatum}
        funcConvertToButton   ={funcConvertToButton}
        funcConvertToInput    ={funcConvertToInput}
        objCurrentDatum       ={objCurrentDatum}
        numInputFocused       ={numInputFocused}
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
    numInputFocused: state.objDatumBar.numInputFocused,
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
    funcUpdateCurrentDatum: (e) => {
      dispatch(funcUpdateCurrentDatum(
        e.target.value,
        e.target.name
      ));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);;
