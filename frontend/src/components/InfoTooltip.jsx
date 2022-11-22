import React from "react";
import ok from "../images/ok.svg";
import isNotOk from "../images/isnotok.svg";

function InfoTooltip({ result, status, isOpen, onClose }) {
  return (
    <div className={`popup ${isOpen && "popup_open"}`}>
      <div className="popup__container popup__container_status">
        <img
          className="popup__img"
          src={result ? ok : isNotOk}
          alt="Успешная регистрация"
        />
        <h2 className="popup__title">
          {status}
        </h2>
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
      </div>
      <div className="popup__overlay" onClick={onClose}></div>
    </div>
  );
}

export default InfoTooltip;
