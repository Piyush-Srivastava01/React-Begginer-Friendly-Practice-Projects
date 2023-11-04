import React, { Component } from "react";
import Style from "./Screen.module.css";
export default class Display extends Component {
  render() {
    return (
      <>
        <div className={Style.display}>
          <p>{this.props.displayTitle}</p>
        </div>
      </>
    );
  }
}
