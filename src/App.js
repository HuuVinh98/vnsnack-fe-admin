import { useContext, useEffect, useState } from "react";
import "./App.css";
import "./reset.scss";
import Header from "./components/Header/Header";
import MainContent from "./components/MainContent/MainContent";
import Footer from "./components/Footer/Footer";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Context from "./Store/Context";

function App() {
  //context
  const state = useContext(Context);

  return (
    <Router>
      <div className="App">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
