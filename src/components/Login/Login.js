import "./Login.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { authenticated } from "../../Store/reducer";
import { useStore } from "../../Store/hooks";
import { useEffect, useState } from "react";
import apiHttp from "../../Store/Variable";
export default function Login() {
  const [state, dispatch] = useStore(); //global state (when you successfully logged instate.authorizated = true)
  const [userMail, setUserMail] = useState(""); //  email login
  const [userPhone, setUserPhone] = useState(""); // phone number login
  const [password, setPassword] = useState(""); // password to login
  const [auth, setAuth] = useState({
    email: userMail,
    phone: userPhone,
    password: password,
  }); // authentication information
  useEffect(() => {
    setAuth({ email: userMail, phone: userPhone, password: password });
  }, [userPhone, userMail, password]); // use useEffect to get current state (not privious state)

  const postAuth = (auth) => {
    fetch(`${apiHttp}auth/login`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auth),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error == 0) {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          alert("login successfull!");
          dispatch(authenticated(true)); // enter home page when when you successfully logged
        } else {
          alert("Wrong email/phone or password!");
        }
      });
  }; // post authentication information

  const checkUser = (user) => {
    let defaultMail =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let defaultPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (defaultMail.test(user)) {
      setUserMail(user);
      return true;
    } else if (defaultPhone.test(user)) {
      {
        setUserPhone(user);
        return true;
      }
    } else {
      return false;
    }
  }; // check if the input is in the correct format and check if input is phone number or email
  return (
    <div className="login">
      <div className="container">
        <div className="login-form flex f-column a-center j-spaceBetween">
          <div className="user-name">
            <FontAwesomeIcon icon={faUser} style={{ marginRight: "10px" }} />
            <input
              placeholder="Email/phone"
              onChange={(e) => {
                checkUser(e.target.value);
              }}
            />
          </div>
          <div className="password">
            <FontAwesomeIcon icon={faKey} style={{ marginRight: "10px" }} />
            <input
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            onClick={() => {
              // if (userName === "admin" && password === "admin") {
              //   dispatch(authenticated(true));
              // } else {
              //   dispatch(authenticated(false));
              //   alert("Wrong user name or password, please try again!");
              // }
              // if (checkUser(userName, password) === true) {
              //   console.log(auth);
              //   //postAuth(auth);
              //   //dispatch(authenticated(true));
              // }
              //checkUser(userName, password);
              //console.log(response);

              if (auth.email.length > 0) {
                postAuth(auth);
              } else {
                alert("Invalid email or phone number!");
              }
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
