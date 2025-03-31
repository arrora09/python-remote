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
import axios from "axios";

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
  const [isStreamVisible, setIsStreamVisible] = useState(false);

  function increaseVolume() {
    try {
      const resp = axios.get(host + "/volUp");
    } catch (e) {
      console.log(e);
    }
  }

  function decreaseVolume() {
    try {
      const resp = axios.get(host + "/volDown");
    } catch (e) {
      console.log(e);
    }
  }

  function muteVolume() {
    try {
      const resp = axios.get(host + "/volMute");
    } catch (e) {
      console.log(e);
    }
  }

  function togglePlayPause() {
    try {
      const resp = axios.get(host + "/playpause");
    } catch (e) {
      console.log(e);
    }
  }

  function moveUp() {
    try {
      const resp = axios.get(host + "/up");
    } catch (e) {
      console.log(e);
    }
  }

  function moveDown() {
    try {
      const resp = axios.get(host + "/down");
    } catch (e) {
      console.log(e);
    }
  }

  function moveLeft() {
    try {
      const resp = axios.get(host + "/left");
    } catch (e) {
      console.log(e);
    }
  }

  function moveRight() {
    try {
      const resp = axios.get(host + "/right");
    } catch (e) {
      console.log(e);
    }
  }

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSend = () => {
    if (text) {
      try {
        const resp = axios.post(host + "/typeText", { text: text });
      } catch (e) {
        console.log(e);
      }

      setText("");
    }
  };

  const handleEnter = () => {
    try {
      const resp = axios.get(host + "/enter");
    } catch (e) {
      console.log(e);
    }
  };

  const handleBackspace = () => {
    try {
      const resp = axios.get(host + "/backspace");
    } catch (e) {
      console.log(e);
    }
  };

  const handleTab = () => {
    try {
      const resp = axios.get(host + "/tab");
    } catch (e) {
      console.log(e);
    }
  };

  const handleMove = (e) => {
    try {
      const resp = axios.post(host + "/moveMouse", {
        x: e.x,
        y: e.y,
        speed: speed,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSkipForward = () => {
    try {
      const resp = axios.get(host + "/skipForward");
    } catch (e) {
      console.log(e);
    }
  };

  const handleSkipBackward = () => {
    try {
      const resp = axios.get(host + "/skipBackward");
    } catch (e) {
      console.log(e);
    }
  };

  const handleLeftClick = () => {
    try {
      const resp = axios.get(host + "/clickLeft");
    } catch (e) {
      console.log(e);
    }
  };

  const handleRightClick = () => {
    try {
      const resp = axios.get(host + "/clickRight");
    } catch (e) {
      console.log(e);
    }
  };

  const toSettings = () => {
    setPage("settings");
  };

  return page === "remote" ? (
    <div className="w-[95vw] h-fit flex flex-col items-center bg-[#1c1c1e] text-white p-4 rounded-2xl ">
      <div
        className={
          " w-full text-lg h-fit flex flex-row items-center justify-center "
        }
      >
        <p>
          Current host: <span className={"text-gray-400"}>{host}</span>
        </p>
      </div>
      <div
        className={
          "w-full flex flex-row items-center justify-center text-xl my-4 "
        }
      >
        <p
          className={"px-4 py-2 bg-old rounded-xl"}
          onClick={() => {
            setIsStreamVisible(!isStreamVisible);
          }}
        >
          {isStreamVisible ? "Volume Control" : "Stream"}
        </p>
      </div>
      {/*
      asd
      */}
      {isStreamVisible ? (
        <div className={" rounded-xl w-full h-48 mb-4"}>
          <img alt={"stream"} src={host + "/stream"} />
        </div>
      ) : (
        <div className={"w-full h-fit "}>
          <div
            className={
              " w-full h-fit flex flex-row items-center justify-center mt-5"
            }
          >
            <div className=" flex justify-around flex-col items-center w-full mb-2.5  gap-2.5">
              <div
                className="cursor-pointer bg-old p-3 rounded-2xl w-12 h-16 flex flex-col items-center justify-center text-3xl"
                onClick={increaseVolume}
              >
                <FaVolumeUp />
              </div>
              <div
                className="cursor-pointer bg-old p-3 rounded-2xl w-12 h-16 flex flex-col items-center justify-center text-3xl"
                onClick={decreaseVolume}
              >
                <FaVolumeDown />
              </div>
            </div>
            <div className=" relative min-w-36 max-w-36 min-h-36  max-h-36 flex flex-col items-center justify-center mb-2.5">
              <div
                className="absolute  top-[50%] left-[50%] w-full h-full flex justify-between"
                style={{ transform: "translate(-50%, -50%)" }}
              >
                <div
                  className="absolute cursor-pointer text-white bg-old p-3 rounded-full w-14 h-14 flex flex-row items-center justify-center text-6xl   left-0 "
                  style={{ transform: "translateY(45px)" }}
                  onClick={moveLeft}
                >
                  <RxTriangleLeft />
                </div>
                <div
                  className="absolute cursor-pointer text-white bg-old p-3 rounded-full w-14 h-14 flex flex-row items-center justify-center text-6xl right-0 "
                  style={{ transform: "translateY(45px)" }}
                  onClick={moveRight}
                >
                  <RxTriangleRight />
                </div>
              </div>
              <div
                className="absolute cursor-pointer text-white bg-old p-3 rounded-full w-14 h-14 flex flex-row items-center justify-center text-3xl top-0 left-[50%] "
                style={{ transform: "translateX(-50%)" }}
                onClick={moveUp}
              >
                <RxTriangleUp />
              </div>
              <div
                className="absolute cursor-pointer text-white bg-old p-3 rounded-full w-14 h-14 flex flex-row items-center justify-center text-3xl bottom-0 left-[50%]"
                style={{ transform: "translateX(-50%)" }}
                onClick={moveDown}
              >
                <RxTriangleDown />
              </div>
            </div>
            <div className=" flex justify-around flex-col items-center w-full mb-2.5 gap-2.5">
              <div
                className=" cursor-pointer bg-old p-3 rounded-2xl w-12 h-16 flex flex-col items-center justify-center text-3xl"
                onClick={toSettings}
              >
                <IoIosSettings />
              </div>
              <div
                className=" cursor-pointer bg-old p-3 rounded-2xl w-12 h-16 flex flex-col items-center justify-center text-3xl"
                onClick={muteVolume}
              >
                <FaVolumeMute />
              </div>
            </div>
          </div>
          <div
            className={
              " w-full h-fit flex flex-row justify-evenly items-center m-1.5 mb-2.5 ml-0 mr-0 gap-2.5"
            }
          >
            <div
              className={
                " cursor-pointer bg-old p-3 rounded-2xl w-20 h-12 flex flex-col items-center justify-center text-3xl"
              }
              onClick={handleSkipBackward}
            >
              <IoIosSkipBackward />
            </div>
            <div
              className=" cursor-pointer bg-old p-3 rounded-2xl w-20 h-12 flex flex-col items-center justify-center text-3xl"
              onClick={togglePlayPause}
            >
              <HiMiniPlayPause />
            </div>
            <div
              className={
                " cursor-pointer bg-old p-3 rounded-2xl w-20 h-12 flex flex-col items-center justify-center text-3xl"
              }
              onClick={handleSkipForward}
            >
              <IoIosSkipForward />
            </div>
          </div>
        </div>
      )}

      <div className=" flex flex-col justify-between items-center w-[88%] mb-5">
        <div className="input-row w-full flex flex-row items-center justify-center mb-2.5 gap-2.5">
          <input
            type="text"
            placeholder="Type here"
            className=" p-3 w-2/3 h-12 rounded-xl border-none bg-old text-white  text-lg justify-center items-start"
            value={text}
            onChange={handleInputChange}
          />
          <div
            className="w-1/3 h-12 flex flex-col items-center justify-center p-3 rounded-xl border-none text-white text-base cursor-pointer bg-old"
            onClick={handleSend}
          >
            Send
          </div>
        </div>
        <div className=" w-full flex flex-row items-center justify-center gap-2.5 ">
          <div
            className="w-1/3 h-12 flex items-center justify-center bg-old transition-all duration-300  p-3 rounded-xl border-none text-white text-xl cursor-pointer   enter-button"
            onClick={handleEnter}
          >
            <AiOutlineEnter />
          </div>

          <div
            className="w-1/3 h-12 flex items-center justify-center bg-old transition-all duration-300  p-3 rounded-xl border-none text-white text-xl cursor-pointer   enter-button"
            onClick={handleTab}
          >
            <ImTab />
          </div>
          <div
            className="w-1/3 h-12 flex items-center justify-center bg-old transition-all duration-300  p-3 rounded-xl border-none text-white text-xl cursor-pointer   enter-button"
            onClick={handleBackspace}
          >
            <FaBackspace />
          </div>
        </div>
      </div>

      <div className={" w-full flex flex-row justify-evenly items-center"}>
        <div
          className={
            "w-16 h-32 flex flex-col items-center justify-center cursor-pointer bg-old p-3 rounded-2xl text-5xl"
          }
          onClick={handleLeftClick}
        >
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
        <div
          className={
            "w-16 h-32 flex flex-col items-center justify-center cursor-pointer bg-old p-3 rounded-2xl text-5xl"
          }
          onClick={handleRightClick}
        >
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
