// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilities";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [person, setPersion] = useState(0)
  // Main function
  const runCoco = async () => {
    const net = await cocossd.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };
  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const obj = await net.detect(video);
      let count = 0;
      Object.values(obj).forEach((item)=>{
        if(item.class =='person')
        {
          count++;
        }
      });
      setPersion(count);
      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx); 
    }
  };

  useEffect(()=>{runCoco()},[]); 
  useEffect(()=>{loadDevices()},[]); 
  const [deviceId, setDeviceId] = React.useState({});
  const [devices, setDevices] = React.useState([]);
  const [indexDevice, setIndexDevice] = React.useState(0);
  const [logApp, setLogApp] = React.useState('');
  function loadDevices()
  {
    console.log('loadDevices');
    if (!navigator.mediaDevices?.enumerateDevices) {
      console.log("enumerateDevices() not supported.");
    } else {
      // List cameras and microphones.
      navigator.mediaDevices.enumerateDevices()
        .then((devices) => {
          var arr =[];
          var log='';
          devices.forEach((device) => {
            log += JSON.stringify(device) + '\r\n';
            if(device.kind === 'videoinput')
            {
              arr.push(device);
            }
          });
          setDevices(arr);
          setLogApp(log);
        })
        .catch((err) => {
          console.error(`${err.name}: ${err.message}`);
        });
        
    }
  }
  function handleClick()
  {
    if(indexDevice < devices.length - 1)
    {
      setIndexDevice(indexDevice + 1);
    }
    else
    {
      setIndexDevice(0);
    }
    setDeviceId(devices[indexDevice].deviceId);
  }
  return (
    <div className="App">
      <header className="App-header">
        <div className="persion">
        Camera: {indexDevice + 1} - Person: {person}
        </div>
        <div className="logApp">Log: {logApp}</div>
        <div className="devicesButton" onClick={handleClick}>Change Camera -{indexDevice + 1}</div>
        <Webcam
          ref={webcamRef}
          muted={true} 
          videoConstraints={{
            deviceId: deviceId
          }}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: '100%',
            height: '100%',
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: '100%',
            height: '100%',
          }}
        />
      </header>
    </div>
  );
}

export default App;
