import React from 'react';
import './Footer.css';
import { FaYoutube, FaSpotify, FaFacebook } from 'react-icons/fa';

const Footer = () => {
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
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="icon" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
