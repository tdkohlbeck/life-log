/* eslint-disable */

import React from 'react';
import { connect } from 'react-redux';

import {
  funcAddActiveDatum,
  funcUpdateFocusedTagName,
  funcUpdateFocusedTagValue,
  funcCacheCurrentDatum,
  funcClearCurrentDatum,
  funcConvertToButton,
  funcConvertToInput,
  funcEditDatum,
  funcDeleteDatum,
  funcSaveActiveDatum,
  funcUncacheDatum,
} from './actions';

import {
  enumBarMode,
  enumLabelType,
} from './reducer';

import { View } from './components/View';
import { DatumBar } from './components/DatumBar';

import { getTimeString } from './utils';

import './App.css';

const App = ({
  funcAddActiveDatum,
  funcDeleteDatum,
  funcEditDatum,
  funcSaveActiveDatum,
  funcUpdateFocusedTagName,
  funcUpdateFocusedTagValue,
  funcConvertToButton,
  funcConvertToInput,
  stateDatumBar,
  datumsList,
}) => {
  return (
    <div className="app">
      <View
        datumsList     ={datumsList}
        funcEditDatum  ={funcEditDatum}
        funcDeleteDatum={funcDeleteDatum}
      />
      <DatumBar
        funcUpdateFocusedTagName ={funcUpdateFocusedTagName}
        funcUpdateFocusedTagValue={funcUpdateFocusedTagValue}
        funcAddActiveDatum       ={funcAddActiveDatum}
        funcSaveActiveDatum      ={funcSaveActiveDatum}
        funcConvertToButton      ={funcConvertToButton}
        funcConvertToInput       ={funcConvertToInput}
        state                    ={stateDatumBar}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    datumsList: state.datumsList,
    stateDatumBar: state.stateDatumBar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    funcAddActiveDatum: (e) => {
      e.preventDefault();
      dispatch(funcAddActiveDatum());
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
    funcSaveActiveDatum: (e) => {
      e.preventDefault();
      dispatch(funcSaveActiveDatum());
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
