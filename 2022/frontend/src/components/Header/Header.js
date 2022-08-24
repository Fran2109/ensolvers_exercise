import React, { useCallback, useContext, useEffect } from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  Button
} from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './../../contexts/userContext';
import axios from 'axios';
import { reactAppApiEndpoint } from '../../config/config.js';

const Header = () => {
  const defaultImage = "https://cdn4.iconfinder.com/data/icons/web-design-and-development-6-4/128/279-512.png";
  const [userContext, setUserContext] = useContext(UserContext);
  const Navigate = useNavigate();

  const logoutHandler = () => {
    const headers = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userContext.token}`
      }
    }
    axios
      .get(`${reactAppApiEndpoint}api/users/logout`, headers)
      .then(res => {
        setUserContext({
          ...userContext,
          user: undefined,
          token: null
        });
        window.localStorage.setItem("logout", Date.now());
      })
  }
  const syncLogout = useCallback(event => {
    if(event.key === "logout") {
      Navigate("/");
    }
  }, [])

  useEffect(() => {
    window.addEventListener("storage", syncLogout);
    return () => {
      window.removeEventListener("storage", syncLogout);
    }
  } ,[syncLogout]);

  return (
    <div>
      <Navbar 
        color = "secondary"
        dark = {true}
        expand = "md"
        container = "fluid"
      >
        <Nav className='me-auto' navbar style={{marginLeft: "20px"}}>
          <NavItem>
            <Link to="/" className="nav-link">Home</Link>
          </NavItem>
          {!userContext.token ? 
            <>
              <NavItem>
                <Link to='/Login' className="nav-link">Login</Link>
              </NavItem>
              <NavItem>
                <Link to='/Register' className="nav-link">Register</Link>
              </NavItem>
            </>
            :
            <NavItem>
              <Link to='/' onClick={logoutHandler} className="nav-link">Logout</Link>
            </NavItem>
          }
        </Nav>
        <Nav navbar>
          <NavItem>
            <img src={userContext.user?.icon ? userContext.user.icon : defaultImage} alt="profile" className="rounded-circle" style={{width: "50px", height: "50px"}}/>
          </NavItem>         
        </Nav>
      </Navbar>
    </div>
  );
}

export default Header;