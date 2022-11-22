import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import * as Auth from "../utils/Auth";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, stretchSelectedCard] = React.useState({});
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [cardsData, setCardsData] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [emailUser, setEmailUser] = React.useState("");
  const [authStatus, setAuthStatus] = React.useState("");
  const [isOk, setIsOk] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const history = useHistory();

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(elem) {
    setImagePopupOpen(true);
    stretchSelectedCard(elem);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    stretchSelectedCard({});
    setInfoTooltipOpen(false);
  }

  function handleUpdateUser(userData) {
    api
      .editProfileData(userData.name, userData.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatarData) {
    api
      .editProfileAvatar(avatarData.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.includes(currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card, !isLiked)
      .then((newCard) => {
        setCardsData((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .removeCard(card)
      .then(() => {
        setCardsData((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .addCard(card)
      .then((res) => {
        setCardsData([res, ...cardsData]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    if (!loggedIn) return;
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);
  // пустой массив зависимостей нужен, чтобы цикл закончился строго на монтировании элемента;

  React.useEffect(() => {
    if (!loggedIn) return;
    api
      .getCards()
      .then((res) => {
        setCardsData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  function handleRegister(email, password) {
    return Auth.register(email, password)
      .then((res) => {
        if (res) {
          setInfoTooltipOpen(true);
          setIsOk(true);
          setAuthStatus("Вы успешно зарегистрировались!");
          history.push("/sign-in");
        }
      })
      .catch((err) => {
        setInfoTooltipOpen(true);
        setIsOk(false);
        setAuthStatus("Что-то пошло не так! Попробуйте ещё раз.");
        console.log(err);
      });
  }

  function handleLogin(email, password) {
    return Auth.authorize(email, password)
      .then(() => {
        setLoggedIn(true);
        setEmailUser(email);
        history.push("/");
      })
      .catch((err) => {
        setAuthStatus("Что-то пошло не так! Попробуйте ещё раз.");
        setInfoTooltipOpen(true);
        setIsOk(false);
        console.log(err);
      });
  }

  function handleLogout() {
    setEmailUser("");
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    history.push("/sign-in");
  }

  function checkToken() {
    return Auth.getContent()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmailUser(res.data.email);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    checkToken();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} onLogout={handleLogout} email={emailUser} />
        <Switch>
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Main
              cards={cardsData}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
            />
          </ProtectedRoute>
          <Route path="*">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />
        {/* компоненты и внутри пропсы */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />
        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />
        <PopupWithForm
          name="verify"
          title="Вы уверены?"
          submitText="Да"
          onClose={closeAllPopups}
        />
        <ImagePopup
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
          card={selectedCard}
        />
        <InfoTooltip
          result={isOk}
          status={authStatus}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
