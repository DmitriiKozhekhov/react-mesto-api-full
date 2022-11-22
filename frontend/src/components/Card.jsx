import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = `element__remove ${
    !isOwn && "element__remove_inactive"
  }`;
  const isLiked = props.card.likes.includes(currentUser._id);
  const cardLikeButtonClassName = `element__like-button ${
    isLiked && "element__like-button_active"
  }`;

  function handleClick() {
    props.stretchImage(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleRemoveCard() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="element">
      <div
        className="element__image"
        style={{ backgroundImage: `url(${props.card.link})` }}
        onClick={handleClick}
        alt={props.card.name}
      ></div>
      <button
        className={cardDeleteButtonClassName}
        aria-label="Удалить изображение"
        type="button"
        onClick={handleRemoveCard}
      ></button>
      <div className="element__btm">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-container">
          <button
            className={cardLikeButtonClassName}
            aria-label="Мне нравится"
            type="button"
            onClick={handleLikeClick}
          ></button>
          <span className="element__like-counter">
            {props.card.likes.length}
          </span>
        </div>
      </div>
    </article>
  );
}
export default Card;
