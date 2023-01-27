import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './CheckBoxGroup.module.css';

const CheckBoxGroupX = (props) => {
    return (
        <div>
            {props.groupValues.map(value => <span styleName="checkbox" key={value.key}>
        <input type={"checkbox"} id={value.id} value={value.valueX} onChange={() => props.changeValue(value.valueX)}/>
        <label htmlFor={value.id}>{value.valueX}</label>
      </span>)}
        </div>
    );
}
export default CSSModules(CheckBoxGroupX, styles, {allowMultiple: true, handleNotFoundStyleName: 'ignore'});
