import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './Table.module.css';
import Entry from './Entry';
import { v4 } from 'uuid'

const Table = (props) => {
  return (
    <div styleName="table-container">
      <table styleName="result-table">
        <tbody>
          <tr key={v4()}>
          <th>X</th>
          <th>Y</th>
          <th>R</th>
          <th>Результат</th>
          <th>Текущее время</th>
          <th>Время выполнения(мс)</th>
        </tr>
        {props.entries.map(entry => <Entry x={entry.x} y={entry.y} r={entry.r} result={entry.inside} currentTime={entry.currentTime} workTime={entry.workTime} key={v4()}/>)}
        </tbody>
      </table>
    </div>
  );
}

export default CSSModules(Table, styles, {allowMultiple: true, handleNotFoundStyleName: 'ignore'});
