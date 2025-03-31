import React, { useEffect, useState } from "react";
import { saveDataToLocalStorage } from "./RemoteControl.jsx";
import { IoIosArrowBack, IoMdHome } from "react-icons/io";

export const preventNegativeValues = (e) =>
  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
export const RemoteSettings = (props) => {
  const maxSpeed = 500;
  const [host, setHost] = useState(props.host);
  const [speed, setSpeed] = useState(parseInt(props.speed));
  const [allowed, setAllowed] = useState(true);

  useEffect(() => {
    setSpeed(props.speed);
  }, [props.speed]);

  useEffect(() => {
    setHost(props.host);
  }, [props.host]);

  const handleHostChange = (e) => {
    setHost(e.target.value);
  };

  const handleSpeedChange = (e) => {
    setSpeed(e.target.value);
  };

  const resetSettings = () => {
    setHost(props.host);
    setSpeed(parseInt(props.speed));
  };

  const saveSettings = () => {
    if (allowed) {
      props.setHost(host);
      props.setSpeed(parseInt(speed));
      saveDataToLocalStorage("remoteData", {
        speed: parseInt(speed),
        host: host,
      });
    }
  };

  useEffect(() => {
    if (parseInt(speed) > 0 && parseInt(speed) <= maxSpeed) {
      setAllowed(true);
    } else {
      setAllowed(false);
    }
  }, [speed]);

  const toRemote = () => {
    props.setPage("remote");
  };

  return (
    <div
      className={
        "w-[95vw] h-fit flex flex-col items-center bg-[#1c1c1e] text-white p-4 rounded-2xl"
      }
    >
      <div className={" relative w-full text-3xl h-fit mb-3 text-center"}>
        <div
          className={
            " w-10  h-10 absolute flex items-center justify-center cursor-pointer bg-old p-3 rounded-full text-2xl"
          }
          onClick={toRemote}
        >
          <IoIosArrowBack />
        </div>
        <p className={"mt-0 mb-0"}>Settings</p>
      </div>
      <div className=" flex flex-col mb-5 w-[80%]">
        <label htmlFor="host" className={"mb-2.5 text-xl "}>
          Host:
        </label>
        <input
          type="text"
          id="host"
          name="host"
          value={host}
          onChange={handleHostChange}
          className=" p-3 w-full bg-old border-none rounded-xl text-white font-medium"
        />
      </div>

      <div className=" flex flex-col mb-5 w-[80%]">
        <label htmlFor="speed" className={"mb-2.5 text-xl "}>
          Speed:
        </label>
        <input
          type="number"
          id="speed"
          name="speed"
          value={speed}
          onChange={handleSpeedChange}
          className=" p-3 w-full bg-old border-none rounded-xl text-white font-medium"
          onKeyDown={preventNegativeValues}
          max={maxSpeed}
          min={1}
        />
      </div>

      <div className=" flex flex-row justify-between items-center text-xl">
        <button
          className={`p-3 border-none rounded-2xl cursor-pointer bg-old text-white transition-all duration-300 m-1.5 disabled:cursor-not-allowed disabled:bg-red-500 `}
          disabled={!allowed}
          onClick={saveSettings}
        >
          Save Settings
        </button>
        <button
          className="p-3 border-none rounded-2xl cursor-pointer bg-old text-white transition-all duration-300 m-1.5"
          onClick={resetSettings}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
