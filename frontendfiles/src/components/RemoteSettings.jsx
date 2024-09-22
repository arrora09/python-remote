import React, { useEffect, useState } from "react";
import "../css/remoteSettings.css";
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
    <div className={"settings-container"}>
      <div className={"hdr"}>
        <div className={"home"} onClick={toRemote}>
          <IoIosArrowBack />
        </div>
        <p>Settings</p>
      </div>
      <div className="setting-item">
        <label htmlFor="host">Host:</label>
        <input
          type="text"
          id="host"
          name="host"
          value={host}
          onChange={handleHostChange}
          className="setting-input"
        />
      </div>

      <div className="setting-item">
        <label htmlFor="speed">Speed:</label>
        <input
          type="number"
          id="speed"
          name="speed"
          value={speed}
          onChange={handleSpeedChange}
          className="setting-input"
          onKeyDown={preventNegativeValues}
          max={maxSpeed}
          min={1}
        />
      </div>

      <div className="setting-actions">
        <button
          className={allowed ? "save-button" : "save-button disabled"}
          disabled={!allowed}
          onClick={saveSettings}
        >
          Save Settings
        </button>
        <button className="reset-button" onClick={resetSettings}>
          Reset
        </button>
      </div>
    </div>
  );
};
