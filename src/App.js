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
        {arrDatums.map((arrDatum, i) => {
          return (
            <li
              key={i}
              className='datum'
            >
              {arrDatum.map((strTag, i) => {
                return (
                  <span key={i} >
                    {strTag + ' '}
                  </span>
                )
              })}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const AddDatumBar = ({
  arrCurrentDatum,
  funcUpdateCurrentDatumInput,
  funcAddCurrentDatum,
}) => {
  return (
    <div id='add-datum-bar'>
      <form onSubmit={funcAddCurrentDatum}>
        {arrCurrentDatum.map((tag, i) => {
          return (
            <input
              name    ={i}
              key     ={i}
              value   ={tag}
              onChange={funcUpdateCurrentDatumInput}
            />
          );
        })}
        <button
          onClick={funcAddCurrentDatum}
        ></button>
      </form>
    </div>
  );
};

const App = ({
  arrDatums,
  arrCurrentDatum,
  funcAddCurrentDatum,
  funcUpdateCurrentDatumInput,
}) => {
  return (
    <div className="app">
      <View
        arrDatums={arrDatums}
      />
      <AddDatumBar
        arrCurrentDatum            ={arrCurrentDatum}
        funcUpdateCurrentDatumInput={funcUpdateCurrentDatumInput}
        funcAddCurrentDatum        ={funcAddCurrentDatum}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    arrDatums: state.arrDatums,
    arrCurrentDatum: state.arrCurrentDatum,
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);;
