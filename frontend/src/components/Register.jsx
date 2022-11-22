import React from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setState((old) => ({
      ...old,
      [name]: value,
    }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    const { email, password } = state;

    onRegister(email, password).catch((err) => {
      console.log(err);

      setState((old) => ({
        ...old,
        message: "Что-то пошло не так",
      }));
    });
  }
  return (
    <>
      <form className="form form_auth" name="register" onSubmit={handleSubmit}>
        <h2 className="form__title form__title_auth">Регистрация</h2>
        <input
          type="email"
          name="email"
          id="email-input"
          className="form__input form__input_auth"
          value={state.email}
          onChange={handleChange}
          placeholder="E-mail"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="form__invalid-message"></span>
        <input
          type="password"
          name="password"
          id="password-input"
          className="form__input form__input_auth"
          value={state.password}
          onChange={handleChange}
          placeholder="Пароль"
          required
        />
        <span className="form__invalid-message"></span>
        <button type="submit" className="form__save-button_auth">
          Зарегистрироваться
        </button>
      </form>
      <p className="form__authQuestion">
        Уже зарегистрированы?{" "}
        <Link className="form__linkToLogin" to="/sign-in">
          Войти
        </Link>
      </p>
    </>
  );
}
export default Register;
