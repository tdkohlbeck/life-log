import React from 'react';
import { getTimeString } from '../../utils';

export const View = ({
  datumsList,
  funcEditDatum,
  funcDeleteDatum,
}) => {
  const datums = datumsList.map((datum, i) => {
    const time = (
      <span>
        {getTimeString(
          datum.numTime,
          ['Hours', 'Minutes', 'Seconds']
        ) + ' '}
      </span>
    );
    const tags = datum.tags.map((tag, i) => {
      return (
        <span key={i}>
          {`${tag.strName}` + (
            tag.strValue ?
            `:${tag.strValue}, ` :
            `, `
          )}
        </span>
      );
    });
    const buttons = [
      {
        label: 'edit',
        name: 'edit',
        onClick: funcEditDatum,
      },
      {
        label: 'del',
        name: 'delete',
        onClick: funcDeleteDatum,
      },
    ].map((button, i) => {
      return (
        <button
          key={i}
          name={button.name}
          onClick={button.onClick}
          value={datum.strId}
          >
          {button.label}
        </button>
      );
    });
    return (
      <li
        className='li-datum'
        key={i}
        >
        {time}
        {tags}
        {buttons}
      </li>
    );
  });
  return (
    <div id='div-view'>
      <ul>{datums}</ul>
    </div>
  );
};
