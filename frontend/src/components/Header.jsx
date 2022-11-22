import logo from "../images/logo-header.svg";
import { Route, Switch, Link } from "react-router-dom";

function Header({ loggedIn, onLogout, email }) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <div className="header__navigator">
        <p className="header__email">{loggedIn ? email : ""}</p>
        <Switch>
          <Route path="/sign-up">
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          </Route>
          <Route path="/sign-in">
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          </Route>
          <Route exact path="/">
            <Link to="/sign-in" className="header__link" onClick={onLogout}>
              Выйти
            </Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
