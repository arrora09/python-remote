import React, { useEffect, useState } from "react";
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
import {
  IoIosSettings,
  IoIosSkipBackward,
  IoIosSkipForward,
} from "react-icons/io";
import { PiMouseLeftClick, PiMouseRightClick } from "react-icons/pi";
import { GoTriangleUp } from "react-icons/go";
import {
  RxTriangleDown,
  RxTriangleLeft,
  RxTriangleRight,
  RxTriangleUp,
} from "react-icons/rx";
import { RemoteSettings } from "./RemoteSettings.jsx";
import { CiSettings } from "react-icons/ci";

export const saveDataToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getDataFromLocalStorage = (key) => {
  const data = JSON.parse(localStorage.getItem(key));
  //console.log(data);
  if (data == null) {
    return;
  }
  return data;
};

export const createEvent = (address, payload) => {
  try {
    fetch(address, payload ?? {});
  } catch (e) {}
};

export const RemoteControl = () => {
  const [host, setHost] = useState(
    getDataFromLocalStorage("remoteData")
      ? getDataFromLocalStorage("remoteData").host ?? ""
      : "",
  );
  const [text, setText] = useState("");
  const [speed, setSpeed] = useState(
    getDataFromLocalStorage("remoteData")
      ? getDataFromLocalStorage("remoteData").speed ?? 30
      : 30,
  );
  const [page, setPage] = useState("remote");

  function increaseVolume() {
    createEvent(host + "/volUp");
  }

  function decreaseVolume() {
    createEvent(host + "/volDown");
  }

  function muteVolume() {
    createEvent(host + "/volMute");
  }

  function togglePlayPause() {
    createEvent(host + "/playpause");
  }

  function moveUp() {
    createEvent(host + "/up");
  }

  function moveDown() {
    createEvent(host + "/down");
  }

  function moveLeft() {
    createEvent(host + "/left");
  }

  function moveRight() {
    createEvent(host + "/right");
  }

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSend = () => {
    if (text) {
      createEvent(host + "/typeText", {
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
    createEvent(host + "/enter");
  };

  const handleBackspace = () => {
    createEvent(host + "/backspace");
  };

  const handleTab = () => {
    createEvent(host + "/tab");
  };

  const handleMove = (e) => {
    //console.log("move");
    createEvent(host + "/moveMouse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        x: e.x,
        y: e.y,
        speed: speed,
      }),
    });
  };

  const handleSkipForward = () => {
    createEvent(host + "/skipForward");
  };

  const handleSkipBackward = () => {
    createEvent(host + "/skipBackward");
  };

  const handleLeftClick = () => {
    createEvent(host + "/clickLeft");
  };

  const handleRightClick = () => {
    createEvent(host + "/clickRight");
  };

  const toSettings = () => {
    setPage("settings");
  };

  return page === "remote" ? (
    <div className="remote-container">
      <div className={"hdr"}>
        <p>
          Current host: <span>{host}</span>
        </p>
      </div>
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
          <div className="icon" onClick={toSettings}>
            <IoIosSettings />
          </div>
          <div className="icon" onClick={muteVolume}>
            <FaVolumeMute />
          </div>
        </div>
      </div>
      <div className={"skip-container"}>
        <div className={"icon"} onClick={handleSkipBackward}>
          <IoIosSkipBackward />
        </div>
        <div className="icon" onClick={togglePlayPause}>
          <HiMiniPlayPause />
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
  ) : page === "settings" ? (
    <RemoteSettings
      host={host}
      setHost={setHost}
      speed={speed}
      setSpeed={setSpeed}
      setPage={setPage}
    />
  ) : (
    <></>
  );
};
