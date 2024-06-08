import logo from './logo.svg';
import './App.css';
import Login from './components/Login/login';
import Signup from './components/Login/signup';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, { useState, useEffect, useLayoutEffect } from 'react';
import SlideRoutes from 'react-slide-routes';
import Loginsignupheader from './components/Login/loginsignupheader';
import Post from './components/Homepage/post';
import Create from './components/postcreation/create';
import Homepage from './components/Homepage/homepage';
import Singlepost from './components/posts/singlepost';
import Saved from "./components/savedposts/saved.js";


function App() {
  const [loginheader, setloginheader] = useState(true);
  const [location, setlocation] = useState([

  ]);
  const [token, settoken] = useState('null');
  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      settoken(localStorage.getItem('token'));
    }
  }, [])
  
  useLayoutEffect(() => {
    const getlocation = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        // console.log("Latitude is :", position.coords.latitude);
        // console.log("Longitude is :", position.coords.longitude);
        setlocation([position.coords.longitude,
        position.coords.latitude])
      });
    }
    getlocation();

  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {/* <Home/> */}
        {token == 'null' ? <Loginsignupheader /> : null}
        <SlideRoutes duration={600}  >
          <Route exact path="/" element={<Homepage coord={location} usertoken={token} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/:id' element={<Singlepost />} />
          <Route path="/saved" element={<Saved />} />
        </SlideRoutes>
      </BrowserRouter>

    </div>
  );
}

export default App;
