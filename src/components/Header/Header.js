import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsersCog } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header>
      <div className="container">
        <ul>
          <li>
            <Link to="/" style={{ color: "white" }}>
              <FontAwesomeIcon
                icon={faUsersCog}
                color="white"
                style={{ marginRight: "10px" }}
              />
              Administrator
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
