/* eslint-disable */

import React from 'react';
import { connect } from 'react-redux';

import {
  funcAddCurrentDatum,
  funcUpdateCurrentDatumInput,
  funcClearCurrentDatum,
  funcEditDatum,
  funcDeleteDatum,
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
          return (
            <li
              key      ={i}
              className='li-datum'
            >
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

const AddDatumBar = ({
  objCurrentDatum,
  funcUpdateCurrentDatumInput,
  funcAddCurrentDatum,
}) => {
  console.log(objCurrentDatum.arrTags[0]);
  return (
    <div id='add-datum-bar'>
      <form onSubmit={funcAddCurrentDatum}>
        {objCurrentDatum.arrTags.map((strTag, i) => {
          return (
            <input
              name    ={i}
              key     ={i}
              value   ={strTag}
              onChange={funcUpdateCurrentDatumInput}
            />
          );
        })}
        <span>{' '}</span>
        <button
          onClick={funcAddCurrentDatum}
        ></button>
      </form>
    </div>
  );
};

const App = ({
  arrDatumList,
  objCurrentDatum,
  funcAddCurrentDatum,
  funcUpdateCurrentDatumInput,
  funcEditDatum,
  funcDeleteDatum,
}) => {
  return (
    <div className="app">
      <View
        arrDatumList   ={arrDatumList}
        funcEditDatum  ={funcEditDatum}
        funcDeleteDatum={funcDeleteDatum}
      />
      <AddDatumBar
        objCurrentDatum            ={objCurrentDatum}
        funcUpdateCurrentDatumInput={funcUpdateCurrentDatumInput}
        funcAddCurrentDatum        ={funcAddCurrentDatum}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    arrDatumList: state.arrDatumList,
    objCurrentDatum: state.objCurrentDatum,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    funcUpdateCurrentDatumInput: (e) => {
      dispatch(funcUpdateCurrentDatumInput(e.target.value, e.target.name));
    },
    funcAddCurrentDatum: (e) => {
      e.preventDefault();
      dispatch(funcAddCurrentDatum());
      dispatch(funcClearCurrentDatum());
    },
    funcEditDatum: (e) => {
      dispatch(funcEditDatum(e.target.value));
    },
    funcDeleteDatum: (e) => {
      dispatch(funcDeleteDatum(e.target.value));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);;
