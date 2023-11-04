import React, { Component } from "react";
import Controlls from "./Controlls";
import Style from "./Ipod.module.css";
import Screen from "./Screen";
import zingtouch from "zingtouch";
export default class Ipod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayTitle: "",
      showMenu: false,
      showMusicMenu: false,
      angle: 0,
      index: 0
    };
    this.timeOut = null;

    //user can adjust the sensitivity
    this.sensitivity = 15;
  }

  //This function listen the rotation event and set the angle
  handleRotation = () => {
    let updatedAngle = this.state.angle;
    let buttonWheel = document.getElementById("outer");
    let activeRegion = zingtouch.Region(buttonWheel);
    activeRegion.bind(buttonWheel, "rotate", (event) => {
      event.stopPropagation();
      updatedAngle = Math.floor(event.detail.distanceFromOrigin);
      this.setState((prev) => {
        if (updatedAngle % this.sensitivity === 0)
          return {
            angle: updatedAngle
          };
      });
    });
  };

  //handle show/Hide of menu
  toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu
    });
  };

  //handle menu selection on rotation
  handleListOnRotation = (prevState, selector) => {
    let localindex = prevState.index;
    let prevAngle = prevState.angle;
    let lists = document.querySelectorAll(selector);

    //handle the active class where to add
    Array.from(lists).forEach((el) => {
      el.classList.remove("active");
    });
    lists[this.state.index].classList.add("active");

    if (prevAngle < this.state.angle) {
      localindex += 1;
      if (localindex > lists.length - 1) {
        localindex = 0;
      }
      this.setState({ index: localindex });
    } else if (Math.abs(prevAngle) < Math.abs(this.state.angle)) {
      localindex -= 1;
      if (localindex < 0) {
        localindex = lists.length - 1;
      }
      this.setState({ index: localindex });
    } else {
      return;
    }
  };

  //handle Display after selection
  handleSelect = () => {
    this.timeOut = setTimeout(() => {
      if (this.state.showMenu || this.state.showMusicMenu) {
        let item = document.querySelector(".active");
        if (item.getAttribute("data-id") === "music") {
          this.setState({
            showMenu: false,
            showMusicMenu: true,
            index: 0
          });
        } else {
          this.setState({
            displayTitle: item.getAttribute("data-id"),
            showMenu: false,
            showMusicMenu: false
          });
        }
      }
    }, 300);
  };

  //handle go to home
  handleDoubleClick = () => {
    clearTimeout(this.timeOut);
    this.setState({
      showMenu: false,
      showMusicMenu: false,
      displayTitle: ""
    });
  };

  componentDidMount() {
    this.handleRotation();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.showMenu) {
      this.handleListOnRotation(prevState, ".menu-list-item");
    } else if (this.state.showMusicMenu) {
      this.handleListOnRotation(prevState, ".music-menu-list-item");
    }
  }
  render() {
    return (
      <>
        <div className={Style.container}>
          <div className={Style.screen}>
            <Screen
              showMenu={this.state.showMenu}
              showMusicMenu={this.state.showMusicMenu}
              displayTitle={this.state.displayTitle}
            />
          </div>
          <div className={Style.controll}>
            <Controlls
              toggleMenu={this.toggleMenu}
              handleSelect={this.handleSelect}
              handleDoubleClick={this.handleDoubleClick}
            />
          </div>
        </div>
      </>
    );
  }
}
