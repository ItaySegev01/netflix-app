import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './Navbar.scss';
import { AuthContext } from '../../auth/authContext';
import { Logout } from '../../auth/authActions';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user , dispatch} = useContext(AuthContext);

  const logoutHandler = () => {
    dispatch(Logout());
  };

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };




  return (
    <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
      <div className="container">
        <div className="left">
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt="Netflix"
            />
          </Link>
          <Link to="/" className="link">
            <span>Homepage</span>
          </Link>
          <Link to="/series" className="link">
            <span className="navbarmainLinks">Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span className="navbarmainLinks">Movies</span>
          </Link>
        </div>
        <div className="right">
          <Link className="link" to="/search">
            <SearchIcon className="icon" />
          </Link>
          <img src={user ? user.profilePicture : '.'} alt="" />
          <p className="username">{user ? user.username : '.'}</p>
          <div className="profile">
            <ArrowDropDownIcon className="icon" />
            <div className="options">
              <span onClick={logoutHandler}>Logout</span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
