import { useContext, useEffect, useState } from "react";
import "./App.css";
import "./reset.scss";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useStore } from "./Store/hooks";
import Context from "./Store/Context";

function App() {
  //context
  const [state, dispatch] = useStore();
  return (
    <Router>
      <div className="App">
        <Header />
        {state.authenticated ? <MainContent /> : <Login />}

        <Footer />
      </div>
    </Router>
  );
}

export default App;
