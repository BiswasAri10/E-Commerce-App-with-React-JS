import React from 'react';
import Header from '../Layout/Header';
import { FaPlay } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  return (
    <div>
      <Header />
      <div className="home-container">
        <h2 className="home-heading">The Generics</h2>
        <button className="album-button">Get Our Latest Album</button>
        <div className="play-button">
          <FaPlay className="play-icon" />
        </div>
      </div>
    </div>
  );
};

export default Home;
