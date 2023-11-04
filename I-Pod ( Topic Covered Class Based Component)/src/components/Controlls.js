import React, { Component } from "react";
import Style from "./Controlls.module.css";
import { AiOutlineFastForward } from "react-icons/ai";
import { AiFillFastBackward } from "react-icons/ai";
import { HiPlayPause } from "react-icons/hi2";
import { ImMenu } from "react-icons/im";
export default class Controlls extends Component {
  render() {
    return (
      <>
        <div className={Style.outer} id="outer">
          <AiOutlineFastForward
            className={Style.icon}
            style={{ right: ".7rem" }}
            title="Forward"
          />
          <AiFillFastBackward
            className={Style.icon}
            style={{ left: ".7rem" }}
            title="Backward"
          />
          <HiPlayPause
            className={Style.icon}
            style={{ bottom: ".7rem" }}
            title="Play Pause"
          />
          <ImMenu
            className={Style.icon}
            style={{ top: ".7rem" }}
            onClick={this.props.toggleMenu}
            title="Menu"
          />
        </div>
        <div
          className={Style.inner}
          onClick={this.props.handleSelect}
          onDoubleClick={this.props.handleDoubleClick}
        ></div>
      </>
    );
  }
}
