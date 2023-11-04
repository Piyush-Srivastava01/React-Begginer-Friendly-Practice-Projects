import React, { Component } from "react";
import Style from "./Screen.module.css";
export default class Musicmenu extends Component {
  render() {
    return (
      <>
        <div className={Style.list}>
          <p>Music</p>
          <ul>
            <li className="music-menu-list-item active" data-id="allSongs">
              All songs
            </li>
            <li className="music-menu-list-item" data-id="artists">
              Artists
            </li>
            <li className="music-menu-list-item" data-id="albums">
              Albums
            </li>
          </ul>
        </div>
      </>
    );
  }
}
