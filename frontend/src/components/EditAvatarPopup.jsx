import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const refAvatar = React.useRef();
  React.useEffect(() => {
    refAvatar.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar:
        refAvatar.current
          .value /* Значение инпута, полученное с помощью рефа */,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      submitText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            ref={refAvatar}
            type="url"
            name="link"
            className="form__input form__input_info_image-link"
            placeholder="Ссылка на картинку"
            id="link-input"
            required
          />
          <span className="form__invalid-message link-input-error">
            Введите адрес сайта
          </span>
        </>
      }
    />
  );
}
export default EditAvatarPopup;
