import { useState, useContext, useCallback, useEffect } from 'react';
import Navbar from '../Header/Header';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './../Login/Login';
import Register from './../Register/Register';
import Notes from './../Notes/Notes';
import { UserContext } from './../../contexts/userContext';
import { reactAppApiEndpoint } from './../../config/config.js';
import axios from 'axios';
import { DataProvider } from './../../contexts/dataContext';

function App() {
  const [userContext, setUserContext] = useContext(UserContext);

  const getUserDetails = useCallback(() => {
    const headers = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userContext.token}`
      }
    }
    axios
      .get(`${reactAppApiEndpoint}api/users/verify`, headers)
      .then(res => {
        if(res.data.success) {
          setUserContext({
            ...userContext,
            user: res.data.user
          });
        } else {
          setUserContext({
            ...userContext,
            user: null
          });
        }
      }).catch(err => {
        setUserContext({
          ...userContext,
          user: null
        });
      });
  } ,[userContext.token, setUserContext]);

  useEffect(() => {
    if(!userContext.user && userContext.token) {
      getUserDetails();
    }
  } ,[getUserDetails, userContext.user]);

  const verifyUser = useCallback(() => {
    const headers = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      }
    }
    axios
      .post(`${reactAppApiEndpoint}api/users/refreshToken`, {}, headers)
      .then(res => {
        if(res.data.success) {
          setUserContext({
            ...userContext,
            token: res.data.token
          });
        } else {
          setUserContext({
            ...userContext,
            token: null
          });
        }
      }).catch(err => {
        setUserContext({
          ...userContext,
          token: null
        });
      })
      setTimeout(verifyUser, 1000 * 60 * 5);
  } ,[setUserContext, userContext.token]);

  useEffect(() => {
    verifyUser();
  } ,[verifyUser]);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="d-flex justify-content-center" style={{marginTop: "30px"}}>
          
            <Routes>
              <Route path="/" element={<DataProvider><Notes /></DataProvider>} />
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
            </Routes>
          
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
