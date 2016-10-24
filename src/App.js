/* eslint-disable */

import React from 'react';
import { connect } from 'react-redux';

import {
  funcAddCurrentDatum,
  funcUpdateCurrentDatumInput,
  funcClearCurrentDatum,
} from './actions';

import './App.css';

const View = ({
  arrDatums,
}) => {
  return (
    <div id='view'>
      <ul>
        {arrDatums.map((strDatum, i) => {
          return (
            <li
              key={i}
              className='datum'
              >
              {strDatum}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const AddDatumBar = ({
  strCurrentDatum,
  funcUpdateCurrentDatumInput,
  funcAddCurrentDatum,
}) => {
  return (
    <div id='add-datum-bar'>
      <form onSubmit={funcAddCurrentDatum}>
        <input
          value={strCurrentDatum}
          onChange={funcUpdateCurrentDatumInput}
          />
        <button
          onClick={funcAddCurrentDatum}
        ></button>
      </form>
    </div>
  );
};

const App = ({
  arrDatums,
  strCurrentDatum,
  funcAddCurrentDatum,
  funcUpdateCurrentDatumInput,
}) => {
  return (
    <div className="app">
      <View
        arrDatums={arrDatums}
      />
      <AddDatumBar
        strCurrentDatum            ={strCurrentDatum}
        funcUpdateCurrentDatumInput={funcUpdateCurrentDatumInput}
        funcAddCurrentDatum        ={funcAddCurrentDatum}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    arrDatums: state.arrDatums,
    strCurrentDatum: state.strCurrentDatum,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    funcUpdateCurrentDatumInput: (e) => dispatch(
      funcUpdateCurrentDatumInput(e.target.value)
    ),
    funcAddCurrentDatum: (e) => {
      e.preventDefault();
      dispatch(funcAddCurrentDatum());
      dispatch(funcClearCurrentDatum());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);;
