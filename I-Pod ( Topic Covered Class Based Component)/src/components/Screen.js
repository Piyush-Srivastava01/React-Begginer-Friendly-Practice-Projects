import React, { Component } from "react";
import Display from "./Display";
import Musicmenu from "./Musicmenu";
import Style from "./Screen.module.css";
export default class Screen extends Component {
  render() {
    return (
      <>
        {this.props.showMenu && (
          <div className={Style.list}>
            <p>Ipod</p>
            <ul>
              <li className="menu-list-item active" data-id="coverFlow">
                Cover Flow
              </li>
              <li className="menu-list-item" data-id="music">
                Music
              </li>
              <li className="menu-list-item" data-id="game">
                Game
              </li>
              <li className="menu-list-item" data-id="setting">
                Setting
              </li>
            </ul>
          </div>
        )}
        {this.props.showMusicMenu && <Musicmenu />}
        {this.props.displayTitle &&
          !this.props.showMenu &&
          !this.props.showMusicMenu && (
            <Display displayTitle={this.props.displayTitle} />
          )}
      </>
    );
  }
}
