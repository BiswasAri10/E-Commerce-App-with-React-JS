import React from "react";
import Header from "../Layout/Header";
import { FaPlay } from "react-icons/fa";
import "./Home.css";

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
      <div className="lists-container">
        <h2 className="lists-heading">TOURS</h2>
        <ul className="home-list">
          <li className="list-item">
            <div className="list-details">
              <span>JUL 16</span>
              <span>JUL 19</span>
              <span>JUL 22</span>
              <span>JUL 29</span>
              <span>AUG 2</span>
              <span>AUG 7</span>
            </div>
            <div className="list-details">
              <span>DETROIT, MI</span>
              <span>TORONTO, ON</span>
              <span>BRISTOW, VA</span>
              <span>PHOENIX, AZ</span>
              <span>LAS VEGAS, NV</span>
              <span>CONCORD, CA</span>
            </div>
            <div className="list-details">
              <span>DTE ENERGY MUSIC THEATRE</span>
              <span>BUDWEISER STAGE</span>
              <span>JIGGY LUBE LIVE</span>
              <span>AK-CHIN PAVILION</span>
              <span>T-MOBILE ARENA</span>
              <span>CONCORD PAVILION</span>
            </div>
            <div className="list-details">
              <span>
                <button className="buy-tickets-button">BUY TICKETS</button>
              </span>
              <span>
                <button className="buy-tickets-button">BUY TICKETS</button>
              </span>
              <span>
                <button className="buy-tickets-button">BUY TICKETS</button>
              </span>
              <span>
                <button className="buy-tickets-button">BUY TICKETS</button>
              </span>
              <span>
                <button className="buy-tickets-button">BUY TICKETS</button>
              </span>
              <span>
                <button className="buy-tickets-button">BUY TICKETS</button>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
