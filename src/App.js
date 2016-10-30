/* eslint-disable */

import React from 'react';
import { connect } from 'react-redux';

import {
  funcAddCurrentDatum,
  funcUpdateCurrentDatum,
  funcCacheCurrentDatum,
  funcClearCurrentDatum,
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
              {objDatum.arrTags.map((strTag, i) => {
                return (
                  <span key={i} >
                    {strTag + ' '}
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
  objCurrentDatum,
  funcUpdateCurrentDatum,
  funcAddCurrentDatum,
  funcSaveCurrentDatum,
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
  return (
    <div id='datum-bar'>
      <form onSubmit={funcOnSubmit} >
        {objCurrentDatum.arrTags.map((strTag, i) => {
          return (
            <input
              name    ={i}
              key     ={i}
              value   ={strTag}
              onChange={funcUpdateCurrentDatum}
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
  objCurrentDatum,
  strDatumBarMode,
  funcUpdateCurrentDatum,
  funcEditDatum,
  funcDeleteDatum,
  funcAddCurrentDatum,
  funcSaveCurrentDatum,
}) => {
  return (
    <div className="app">
      <View
        arrDatumList   ={arrDatumList}
        funcEditDatum  ={funcEditDatum}
        funcDeleteDatum={funcDeleteDatum}
      />
      <DatumBar
        objCurrentDatum       ={objCurrentDatum}
        funcUpdateCurrentDatum={funcUpdateCurrentDatum}
        strDatumBarMode       ={strDatumBarMode}
        funcAddCurrentDatum   ={funcAddCurrentDatum}
        funcSaveCurrentDatum  ={funcSaveCurrentDatum}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    arrDatumList: state.arrDatumList,
    objCurrentDatum: state.objCurrentDatum,
    strDatumBarMode: state.objDatumBar.strMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    funcAddCurrentDatum: (e) => {
      e.preventDefault();
      dispatch(funcAddCurrentDatum());
      dispatch(funcClearCurrentDatum());
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
