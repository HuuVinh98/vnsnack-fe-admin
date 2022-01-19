import "./Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsersCog } from "@fortawesome/free-solid-svg-icons";
function Header() {
  return (
    <header>
      <ul className="container">
        <li>
          <a href="/" style={{ color: "white" }}>
            <FontAwesomeIcon
              icon={faUsersCog}
              color="white"
              style={{ marginRight: "10px" }}
            />
            Administrator
          </a>
        </li>
      </ul>
    </header>
  );
}

export default Header;
