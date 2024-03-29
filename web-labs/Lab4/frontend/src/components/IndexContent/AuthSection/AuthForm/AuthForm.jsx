import React from 'react';
import CSSModules from 'react-css-modules';
import { useFormik } from 'formik';
import styles from './AuthForm.module.css';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import ControlButton from 'components/common/ControlButton/ControlButton';

const validate = values => {
  const errors = {};

  if (!values.username && !values.password) {
    errors.errorMessage = 'Введите данные для авторизации в поля ниже.';
  } else if (!values.username) {
    errors.errorMessage = 'Имя пользователя не может быть пустым.';
  } else if (!values.password) {
    errors.errorMessage = 'Пароль не может быть пустым.';
  }

  return errors;
};

const AuthForm = (props) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      newAccount: false
    },
    validate,
    onSubmit: values => {
      if (values.newAccount) {
        props.register(values.username, values.password);
      } else {
        props.login(values.username, values.password);
      }
    },
    validateOnChange: false,
    validateOnBlur: false
  });

  return (
    <div styleName="form-container">
      <ErrorMessage message={formik.errors.errorMessage
        ? formik.errors.errorMessage
        : props.serverErrorMessage
          ? props.serverErrorMessage
          : ""} />
      <form onSubmit={formik.handleSubmit}>
        <p styleName="text-field">
          <label styleName="text-field__label" htmlFor="username">
            Имя пользователя
          </label>
          <input id="username" type="text" name="username"
            value={formik.values.username} onChange={formik.handleChange} />
        </p>
        <br />

        <p styleName="text-field">
          <label styleName="text-field__label" htmlFor="password">
            Пароль
          </label>
          <input id="password" type="text" name="password"
            value={formik.values.password} onChange={formik.handleChange} />
        </p>
        <br />

        <ControlButton text="Войти" />
        <br />

        <div styleName="register-field">
          <input id="register-check" type="checkbox" name="newAccount"
            checked={formik.values.newAccount} onChange={formik.handleChange} />
          <label styleName="register-label" htmlFor="register-check">
            Создать новый аккаунт?
          </label>
        </div>
      </form>
    </div>
  );
}

export default CSSModules(AuthForm, styles, { allowMultiple: true, handleNotFoundStyleName: 'ignore' });
