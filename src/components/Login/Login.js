import "./Login.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { authenticated } from "../../Store/reducer";
import { useStore } from "../../Store/hooks";
import { useEffect, useState } from "react";
import http from "../../Store/Variable";
export default function Login() {
  const [state, dispatch] = useStore(); //global state
  const [userMail, setUserMail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [password, setPassword] = useState("");
  const [respone, setRespone] = useState("");
  const [auth, setAuth] = useState({
    email: userMail,
    phone: userPhone,
    password: password,
  });
  useEffect(() => {
    setAuth({ email: userMail, phone: userPhone, password: password });
  }, [userPhone, userMail, password]);
  //response
  // useEffect(()=>
  // {
  //   fetch("")
  // })
  const postAuth = (auth) => {
    fetch(`${http}auth/login`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auth),
    })
      .then((res) => res.json())
      .then((respone) => {
        console.log("aa", respone);
        localStorage.setItem("accessToken", respone.accessToken);
        localStorage.setItem("refreshToken", respone.refreshToken);
        setRespone(respone);
      });
  };
  console.log(respone);
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
  };
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

              if (auth.email.length > 0) {
                console.log(auth);
                postAuth(auth);
                dispatch(authenticated(true));
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
