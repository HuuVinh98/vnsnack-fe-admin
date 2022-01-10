import Product from "./Product/Product";
import {
  faAngleDown,
  faAngleRight,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Switch, Route } from "react-router-dom";
import "./MainContent.scss";
export default function MainContent() {
  return (
    <div className="main-content">
      <div className="container flex">
        <div className="main-content__left">
          <ul className="admin-list">
            <li className="flex f-column">
              <div className="title flex j-around a-center">
                <FontAwesomeIcon icon={faClock} />
                <p>Quản trị danh mục</p>
                <FontAwesomeIcon icon={faAngleDown} />
              </div>
              <ul className="drop-down">
                <li>
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    style={{ marginRight: "10px" }}
                  />
                  Sản phẩm
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    style={{ marginRight: "10px" }}
                  />
                  Sản phẩm
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
          <Product />
        </div>
      </div>
    </div>
  );
}
