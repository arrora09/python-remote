import React, { useState } from "react";
import {
  FaVolumeUp,
  FaVolumeDown,
  FaVolumeMute,
  FaPlay,
  FaPause,
  FaBackspace,
  FaArrowRight,
} from "react-icons/fa";
import "../css/remoteControl.css";
import { HiMiniPlayPause } from "react-icons/hi2";
import { AiOutlineEnter } from "react-icons/ai";
import { ImTab } from "react-icons/im";
import { Joystick } from "react-joystick-component";
import { IoIosSkipBackward, IoIosSkipForward } from "react-icons/io";
import { PiMouseLeftClick, PiMouseRightClick } from "react-icons/pi";
import { GoTriangleUp } from "react-icons/go";
import {
  RxTriangleDown,
  RxTriangleLeft,
  RxTriangleRight,
  RxTriangleUp,
} from "react-icons/rx";

export const RemoteControl = () => {
  const [host, setHost] = useState("");
  //const [host, setHost] = useState("http://localhost:5000");
  const [text, setText] = useState("");

  function increaseVolume() {
    fetch(host + "/volUp");
  }

  function decreaseVolume() {
    fetch(host + "/volDown");
  }

  function muteVolume() {
    fetch(host + "/volMute");
  }

  function togglePlayPause() {
    fetch(host + "/playpause");
  }

  function moveUp() {
    fetch(host + "/up");
  }

  function moveDown() {
    fetch(host + "/down");
  }

  function moveLeft() {
    fetch(host + "/left");
  }

  function moveRight() {
    fetch(host + "/right");
  }

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSend = () => {
    if (text) {
      fetch(host + "/typeText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
      });
      setText("");
    }
  };

  const handleEnter = () => {
    fetch(host + "/enter");
  };

  const handleBackspace = () => {
    fetch(host + "/backspace");
  };

  const handleTab = () => {
    fetch(host + "/tab");
  };

  const handleMove = (e) => {
    console.log("move");
    fetch(host + "/moveMouse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ x: e.x, y: e.y }),
    });
  };

  const handleSkipForward = () => {
    fetch(host + "/skipForward");
  };

  const handleSkipBackward = () => {
    fetch(host + "/skipBackward");
  };

  const handleLeftClick = () => {
    fetch(host + "/clickLeft");
  };

  const handleRightClick = () => {
    fetch(host + "/clickRight");
  };

  return (
    <div className="remote-container">
      <div className={"upper-container"}>
        <div className="control-container">
          <div className="icon" onClick={increaseVolume}>
            <FaVolumeUp />
          </div>
          <div className="icon" onClick={decreaseVolume}>
            <FaVolumeDown />
          </div>
        </div>
        <div className="arrows-container">
          <div className="side-arrows">
            <div className="arrow arrow-left" onClick={moveLeft}>
              <RxTriangleLeft />
            </div>
            <div className="arrow arrow-right" onClick={moveRight}>
              <RxTriangleRight />
            </div>
          </div>
          <div className="arrow arrow-up" onClick={moveUp}>
            <RxTriangleUp />
          </div>
          <div className="arrow arrow-down" onClick={moveDown}>
            <RxTriangleDown />
          </div>
        </div>
        <div className="control-container">
          <div className="icon" onClick={muteVolume}>
            <FaVolumeMute />
          </div>
          <div className="icon" onClick={togglePlayPause}>
            <HiMiniPlayPause />
          </div>
        </div>
      </div>
      <div className={"skip-container"}>
        <div className={"icon"} onClick={handleSkipBackward}>
          <IoIosSkipBackward />
        </div>
        <div className={"icon"} onClick={handleSkipForward}>
          <IoIosSkipForward />
        </div>
      </div>

      <div className="input-section">
        <div className="input-row">
          <input
            type="text"
            placeholder="Type here"
            className="text-input"
            value={text}
            onChange={handleInputChange}
          />
          <div className="send-button" onClick={handleSend}>
            Send
          </div>
        </div>
        <div className="button-row">
          <div className="icon-button enter-button" onClick={handleEnter}>
            <AiOutlineEnter />
          </div>

          <div className={"icon-button tab-button"} onClick={handleTab}>
            <ImTab />
          </div>
          <div
            className="icon-button backspace-button"
            onClick={handleBackspace}
          >
            <FaBackspace />
          </div>
        </div>
      </div>

      <div className={"mouse-container"}>
        <div className={"mb"} onClick={handleLeftClick}>
          <PiMouseLeftClick />
        </div>
        <Joystick
          size={150}
          sticky={false}
          baseColor="#2c2c2e"
          stickColor="white"
          move={handleMove}
          throttle={100}
        ></Joystick>
        <div className={"mb"} onClick={handleRightClick}>
          <PiMouseRightClick />
        </div>
      </div>
    </div>
  );
};
