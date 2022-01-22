import "./Login.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { authenticated } from "../../Store/reducer";
import { useStore } from "../../Store/hooks";
import { useState } from "react";
export default function Login() {
  const [state, dispatch] = useStore(); //global state

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login">
      <div className="container">
        <form className="login-form flex f-column a-center j-spaceBetween">
          <div className="user-name">
            <FontAwesomeIcon icon={faUser} style={{ marginRight: "10px" }} />
            <input
              placeholder="User name"
              onKeyUp={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
          <div className="password">
            <FontAwesomeIcon icon={faKey} style={{ marginRight: "10px" }} />
            <input
              placeholder="Password"
              onKeyUp={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            onClick={() => {
              if (userName === "admin" && password === "admin") {
                dispatch(authenticated(true));
              } else {
                dispatch(authenticated(false));
                alert("Wrong user name or password, please try again!");
              }
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
