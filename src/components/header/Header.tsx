import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <Link to="/" className="header-content__logo">
            MOVIE
          </Link>
          <nav className="header-content__nav">
            <ul className="header-content__nav__list">
              <li className="header-content__nav__list__item">
                <Link
                  className="header-content__nav__list__item__link"
                  to={"/movies"}
                >
                  Фильмы
                </Link>
              </li>
              <li className="header-content__nav__list__item">
                <Link
                  className="header-content__nav__list__item__link"
                  to={"/series"}
                >
                  Сериалы
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
