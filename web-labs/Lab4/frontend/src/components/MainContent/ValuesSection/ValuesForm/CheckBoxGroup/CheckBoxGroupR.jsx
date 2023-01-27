import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './CheckBoxGroup.module.css';

const CheckBoxGroupR = (props) => {
    return (
        <div>
            {props.groupValues.map(value => <span styleName="checkbox" key={value.key}>
        <input type={"checkbox"} id={value.id} value={value.valueR} onChange={() => props.changeValue(value.valueR)}/>
        <label htmlFor={value.id}>{value.valueR}</label>
      </span>)}
        </div>
    );
}
export default CSSModules(CheckBoxGroupR, styles, {allowMultiple: true, handleNotFoundStyleName: 'ignore'});
