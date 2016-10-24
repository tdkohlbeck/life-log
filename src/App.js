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
              {`${strDatum[0]}, ${strDatum[1]}`}
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
        <input
          name     ={0}
          value   ={arrCurrentDatum[0]}
          onChange={funcUpdateCurrentDatumInput}
        />
        <input
          name    ={1}
          value   ={arrCurrentDatum[1]}
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
