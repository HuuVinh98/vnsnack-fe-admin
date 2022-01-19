import Product from "./Product/Product";
import AddProduct from "./AddProduct/AddProduct";
import HomePage from "./HomePage/HomePage";
import {
  faAngleDown,
  faAngleRight,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Switch, Route } from "react-router-dom";
import "./MainContent.scss";
import { useEffect, useState } from "react";
export default function MainContent() {
  const [drop, setDrop] = useState(false);
  return (
    <div className="main-content">
      <div className="container flex">
        <div className="main-content__left">
          <ul className="admin-list">
            <li className="flex f-column">
              <div className="title flex j-around a-center">
                <FontAwesomeIcon icon={faClock} />
                <p>Quản trị danh mục</p>
                <FontAwesomeIcon
                  icon={faAngleDown}
                  onClick={() => {
                    setDrop(!drop);
                  }}
                />
              </div>
              <ul
                className={`drop-down ${
                  drop === true ? "drop-down__active" : ""
                }`}
              >
                <li>
                  <a href="/product">
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      style={{ marginRight: "10px" }}
                    />
                    Sản phẩm
                  </a>
                </li>
                <li>
                  <a href="">
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      style={{ marginRight: "10px" }}
                    />
                    ABCD
                  </a>
                </li>
              </ul>
            </li>
            <li className="flex j-around a-center">
              <FontAwesomeIcon icon={faClock} />
              <p>Quản trị danh mục</p>
              <FontAwesomeIcon icon={faAngleDown} />
            </li>
            <li className="flex j-around a-center">
              <FontAwesomeIcon icon={faClock} />
              <p>Quản trị danh mục</p>
              <FontAwesomeIcon icon={faAngleDown} />
            </li>
          </ul>
        </div>
        <div className="main-content__right">
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/product">
              <Product />
            </Route>
            <Route path="/add-product">
              <AddProduct />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}
