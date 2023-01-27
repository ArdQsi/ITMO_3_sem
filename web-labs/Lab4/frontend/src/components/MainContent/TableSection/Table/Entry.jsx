import React from 'react';

const Entry = (props) => {
    return (
        <tr key={props.key}>
            <td>{props.x}</td>
            <td>{props.y}</td>
            <td>{props.r}</td>
            <td>{props.result ? "Попадание" : "Промах"}</td>
            <td>{props.currentTime}</td>
            <td>{props.workTime}</td>
        </tr>
    );
}

export default Entry;
