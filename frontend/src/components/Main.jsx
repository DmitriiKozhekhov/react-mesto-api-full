import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
// прокидываю пропсы

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-div">
          <img
            className="profile__avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          />
          <button
            type="button"
            className="profile__ToAvatarButton"
            onClick={props.onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__box">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              onClick={props.onEditProfile}
              aria-label="Редактирование"
              type="button"
            ></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          onClick={props.onAddPlace}
          aria-label="Добавление новой карточки"
          type="button"
        ></button>
      </section>
      <section className="elements">
        {props.cards.map((item) => (
          <Card
            key={item._id}
            card={item}
            stretchImage={props.onCardClick}
            onCardDelete={props.onCardDelete}
            onCardLike={props.onCardLike}
          />
        ))}
      </section>
    </main>
  );
}
export default Main;
