import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const refPlaceName = React.useRef();
  const refPlaceLink = React.useRef();
  
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: refPlaceName.current.value,
      link: refPlaceLink.current.value,
    });
  }

  React.useEffect(() => {
    refPlaceName.current.value = "";
    refPlaceLink.current.value = "";
  }, [props.isOpen]);
  
  return (
    <PopupWithForm
      name="create-card"
      title="Новое место"
      submitText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            ref={refPlaceName}
            type="text"
            name="name"
            className="form__input form__input_info_card-name"
            placeholder="Название"
            id="title-input"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="form__invalid-message title-input-error">
            Вы пропустили это поле
          </span>
          <input
            ref={refPlaceLink}
            type="url"
            name="link"
            className="form__input form__input_info_image-link"
            placeholder="Ссылка на картинку"
            id="link-input2"
            required
          />
          <span className="form__invalid-message link-input2-error">
            Введите адрес сайта
          </span>
        </>
      }
    />
  );
}
export default AddPlacePopup;
