/* eslint-disable */

import React from 'react';
import { connect } from 'react-redux';

import {
  funcAddActiveDatum,
  funcUpdateFocusedTagName,
  funcUpdateFocusedTagValue,
  funcUpdateFocusedInput,
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
        funcUpdateFocusedInput   ={funcUpdateFocusedInput}
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
      dispatch(funcConvertToButton(e.target.id));
    },
    funcConvertToInput: (e) => {
      e.preventDefault();
      dispatch(funcConvertToInput(e.target.id));
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
    },
    funcUpdateFocusedInput: (e) => {
      dispatch(funcUpdateFocusedInput(
        e.target.value,
        e.target.id
      ));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);;
