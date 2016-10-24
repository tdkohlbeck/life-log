import React, { Component } from 'react';
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
  funcChangeCurrentDatumInput,
  funcAddCurrentDatum,
}) => {
  return (
    <div id='add-datum-bar'>
      <input
        value={strCurrentDatum}
        onChange={funcChangeCurrentDatumInput}
      />
      <button
        onClick={funcAddCurrentDatum}
      ></button>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <div className="app">
        <View
          arrDatums={['yey', 'brevo']}
        />
        <AddDatumBar
          strCurrentDatum={'yay?'}
          funcChangeCurrentDatumInput={e => console.log(e.target.value)}
          funcAddCurrentDatum={e => console.log('render new arrDatums!')}
        />
      </div>
    );
  }
}

export default App;
