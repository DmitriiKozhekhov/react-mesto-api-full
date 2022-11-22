import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState([]);
  const [description, setDescription] = React.useState([]);
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameInput(evt) {
    setName(evt.target.value);
  }

  function handleAboutInput(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit-name"
      title="Редактировать профиль"
      submitText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            value={name || ""}
            onChange={handleNameInput}
            type="text"
            name="nameAuthor"
            className="form__input form__input_info_name"
            placeholder="Ваше имя"
            required
            minLength="2"
            maxLength="40"
            id="name-input"
          />
          <span className="form__invalid-message name-input-error"></span>
          <input
            value={description || ""}
            onChange={handleAboutInput}
            type="text"
            name="infoAuthor"
            className="form__input form__input_info_job"
            placeholder="Ваш род деятельности"
            minLength="2"
            maxLength="200"
            id="job-input"
            required
          />
          <span className="form__invalid-message job-input-error"></span>
        </>
      }
    />
  );
}
export default EditProfilePopup;
