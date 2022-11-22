function ImagePopup(props) {
  return (
    <div
      className={`popup popup_to_image-strech ${
        props.isOpen ? "popup_open" : ""
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          onClick={props.onClose}
          aria-label="Закрытие попапа"
          type="button"
        ></button>
        <div className="show">
          <img
            className="show__image"
            style={{ backgroundImage: `url(${props.card.link})` }}
            alt={props.card.name}
          />
          <figcaption className="show__image-title">
            {props.card.name}
          </figcaption>
        </div>
      </div>
    </div>
  );
}
export default ImagePopup;
