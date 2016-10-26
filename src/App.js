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
  arrDatumList,
}) => {
  return (
    <div id='view'>
      <ul>
        {arrDatumList.map((objDatum, i) => {
          return (
            <li
              id       ={objDatum.strId}
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
}) => {
  return (
    <div className="app">
      <View
        arrDatumList={arrDatumList}
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);;
