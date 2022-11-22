// прокидываю пропсы
function PopupWithForm(props) {
  
  return (
    <div
      className={`popup popup_to_${props.name} ${
        props.isOpen ? "popup_open" : ""
      } `}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          aria-label="Закрытие формы"
          type="button"
          onClick={props.onClose}
        ></button>
        <form
          name={props.name}
          className={`form form_${props.name}`}
          noValidate
          onSubmit={props.onSubmit}
        >
          <h2 className="form__title">{props.title}</h2>
          {props.children}
          <button className="form__save-button form__editSubmit" type="submit">
            {props.submitText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
