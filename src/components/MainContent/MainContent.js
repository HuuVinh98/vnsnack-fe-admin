import Product from "./Product/Product";
import AddProduct from "./AddProduct/AddProduct";
import HomePage from "./HomePage/HomePage";
import EditProduct from "./EditProduct/EditProduct";
import {
  faAngleDown,
  faAngleRight,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Switch, Route, Link } from "react-router-dom";
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
                <p>Category</p>
                <FontAwesomeIcon icon={faAngleDown} />
              </div>
              <ul className="drop-down">
                <li>
                  <Link to="/product">
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      style={{ marginRight: "10px" }}
                    />
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      style={{ marginRight: "10px" }}
                    />
                    ABCD
                  </Link>
                </li>
              </ul>
            </li>
            <li className="flex j-around a-center">
              <FontAwesomeIcon icon={faClock} />
              <p>Category</p>
              <FontAwesomeIcon icon={faAngleDown} />
            </li>
            <li className="flex j-around a-center">
              <FontAwesomeIcon icon={faClock} />
              <p>Category</p>
              <FontAwesomeIcon icon={faAngleDown} />
            </li>
          </ul>
        </div>

        <div className="main-content__right flex a-center container">
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
            <Route path="/edit-product/:id">
              <EditProduct />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}
