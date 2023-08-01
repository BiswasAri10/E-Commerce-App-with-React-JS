import React , {useContext} from "react";
import "./Footer.css";
import AuthContext from "../store/AuthContext";
import { useNavigate } from "react-router";
import { FaYoutube, FaSpotify, FaFacebook } from "react-icons/fa";

const Footer = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    authCtx.logout(); 
    navigate('/login');
  };
  return (
    <div className="footer-container">
      <h2 className="footer-heading">The Generics</h2>
      <div className="footer-icons">
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <FaYoutube className="icon" />
        </a>
        <a href="https://spotify.com" target="_blank" rel="noopener noreferrer">
          <FaSpotify className="icon" />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="icon" />
        </a>
      </div>
      {authCtx.isLoggedIn && (
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      )}
    </div>
  );
};

export default Footer;
