import React, {useState, useEffect} from 'react';
import CSSModules from 'react-css-modules';
import styles from './ValuesForm.module.css';
import ControlButton from 'components/common/ControlButton/ControlButton';
import InfoMessage from './InfoMessage/InfoMessage';
import TextField from './TextField/TextField';
import CheckBoxGroupX from "./CheckBoxGroup/CheckBoxGroupX";
import CheckBoxGroupR from "./CheckBoxGroup/CheckBoxGroupR";
import {logout, setServerErrorMessage} from "../../../../redux/modules/auth";
import {useDispatch} from "react-redux";

const CHECK = 'check';

const validateForm = values => {
    let isNumeric = num => {
        return !isNaN(parseFloat(num)) && isFinite(num);
    }

    if (!values.rValues.includes(parseFloat(values.rCurrent))) {
        return 'Выберите значение R!';
    }

    if (!values.xValues.includes(parseFloat(values.xCurrent))) {
        return 'Выберите значение X!';
    }

    if ((values.yCurrent != null && (!isNumeric(values.yCurrent.replace(',', '.')))) || values.yCurrent < values.yMin || values.yCurrent > values.yMax) {
        return `Введите значение Y от ${values.yMin} до ${values.yMax}!`;
    }

    return '';
}

const ValuesForm = (props) => {
    const [infoMessage, setInfoMessage] = useState('Введите координаты точки');
    const [action, setAction] = useState(undefined);
    const dispatch = useDispatch();

    useEffect(() => {
        const obj = JSON.parse(localStorage.getItem('userWl4'));
        if (obj == null) {
            dispatch(logout());
            dispatch(setServerErrorMessage("Вы не авторизованы"));
        }
    })
    const handleCheckCLick = () => {
        setAction(CHECK);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        switch (action) {
            case CHECK:
                let message = validateForm(props);
                if (message === '') {
                    props.checkEntry();
                }
                break;
            default:
                alert('Неверный Action в ValuesForm!');
        }
    }

    useEffect(() => {
        let message = validateForm(props);
        setInfoMessage(message === '' ? 'Введите координаты точки' : message);
    }, [props]);

    return (
        <form styleName="values-form" onSubmit={(e) => handleSubmit(e)}>
            <InfoMessage message={infoMessage}/>

            <div styleName="values-form__container">
                <label styleName="values-form__label">
          <span className="values-form__label-text">
            X:
          </span>
                </label>
                <div styleName="values-form__control">
                    <CheckBoxGroupX groupValues={props.xChoose} changeValue={props.selectX}/>
                </div>
            </div>


            <div styleName="values-form__container">
                <label styleName="values-form__label" htmlFor="y-text">
          <span className="values-form__label-text">
            Y:
          </span>
                </label>
                <div styleName="values-form__control">
                    <TextField value={props.yCurrent} changeValue={props.changeY} maxLength="7"
                               placeholder="Число от -3 до 3"/>
                </div>
            </div>

            <div styleName="values-form__container">
                <label styleName="values-form__label">
          <span className="values-form__label-text">
            R:
          </span>
                </label>
                <div styleName="values-form__control">
                    <CheckBoxGroupR groupValues={props.rChoose} changeValue={props.selectR}/>
                </div>
            </div>

            <div styleName="values-form__control-container">
                <ControlButton text="Отправить" action={handleCheckCLick}/>
            </div>
        </form>
    );
}

export default CSSModules(ValuesForm, styles, {allowMultiple: true, handleNotFoundStyleName: 'ignore'});
