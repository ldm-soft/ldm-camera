// style = các thuộc tính hiển thị của thẻ trên màn hình web
// console = phần hiển thị log khi sử dụng ứng dụng
// ứng dụng tích hợp tính năng phân tích dữ liệu từ hình ảnh dựa theo thuật toán nhận diện của google.
// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilities";
import { Helmet } from "react-helmet";
import transportPath from './audio/transport.mp3'
import personPath from './audio/person.mp3'
export interface itemDetect {
  objectItems: obj;
  timeExt: Date;
}
function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [person, setPerson] = useState(0);
  const [transport, setTransport] = useState(0);
  
  const maxPerson = 20; //Số lượng đối tượng là con người (Nếu lớn  hơn sẽ thông báo: Khu vực cổng trường xin mọi người hãy di chuyển tránh tắc nghẽn giao thông.)
  const maxTransport= 3;  //Số lượng đối tượng là phương tiện tối đa có trong khung hình(Nếu lớn hơn sẽ thông báo: Yêu cầu phương tiện giao thông di chuyển nhanh qua khu vực cổng trường để đảm bảo an toàn giao thông.)
  let itemObj : itemDetect[] =[];
  //
  var audioTransport = new Audio(transportPath);
  var audioPersion = new Audio(personPath);
  // Main function
  const runMain = async () => {
    const net = await cocossd.load();
    console.log("Handpose model loaded.");
    //  Set thời gian re-load tìm kiếm người có trong khung hình đơn vị tính mili giây
    //  Mặc định 10ms sẽ load 1 lần
    setInterval(() => {
      detect(net);
    }, 10);
  };
  const  playAudio = async(audio: Audio) =>
  {
    await audio.play();
  }
  const detect = async (net) => {
    // Kiểm tra data video trong khung hình tồn tại
    // undefined = chưa tồn tại/chưa được định nghĩa
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Lấy thông tin video
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Thiết lập chiều cao/rộng cho khung hình video
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Thiết lập chiều cao/rộng cho khung hình viền đối tượng khi phát hiện.
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Phân tích và phát hiện đối tượng trong khung hình - Tối đa được thiết lập là 100
      //(*Tùy số lượng đối tượng cần phát hiện mà thay đổi thông số này)
      const obj = await net.detect(video,1000);
      var objectItems = [];
      let countPerson=0;
      let countTransport = 0;
      //remove item old
      //
      Object.values(obj).forEach((item) => {
        //Các đối tượng là con người(person) sẽ được chọn lọc và lấy ra ở bước này.
        //bicycle, motorcycle , car  = transport
        if (
          (item.class ===
            "person" ||
            item.class === "bicycle" ||
            item.class === "car" ||
            item.class === "motorcycle")
        ) {
          if (item.class === "person") {
              countPerson++; //Tăng biến đếm  số người lên 1 đơn vị
          }
          else
          {
            countTransport++; //Tăng biến đếm  số phương tiện lên 1 đơn vị
          }
          //find item
          objectItems.push(item);
        }
      });
      //Set số lượng đối tượng là con người được phát hiện trong hình hiển thị lên màn hình
      setPerson(countPerson);
      setTransport(countTransport);
      // Thực hiện vẽ viền những đối tượng được phát hiện là con người.
      const ctx = canvasRef.current.getContext("2d");
      drawRect(objectItems, ctx);
      //
      if(countPerson > maxPerson)
      {
        playAudio(audioPersion)
      }
      if(countTransport > maxTransport)
      {
        playAudio(audioTransport)
      }
      //
    }
  };

  useEffect(() => {
    runMain();
    
  }, []);
  useEffect(() => {
    checkAllowCamera();
  }, []);
  const [deviceId, setDeviceId] = React.useState({});
  const [devices, setDevices] = React.useState([]);
  const [indexDevice, setIndexDevice] = React.useState(0);
  //Kiển tra camera được chấp nhận sử dụng hay chưa.
  function checkAllowCamera() {
    navigator.mediaDevices
      .getUserMedia({video: true })
      .then(function (stream) {
        loadDevices();
      });
  }
  // Load lên tất cả thiết bị là camera được xuất hiện
  function loadDevices() {
    if (!navigator.mediaDevices?.enumerateDevices) {
      console.log("enumerateDevices() không được hỗ trợ.");
    } else {
      // List cameras and microphones.
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          var arr = [];
          devices.forEach((device) => {
            //Kiểm tra và lấy ra danh sách các thiết bị là camera(tương ứng videoinput)
            if (device.kind === "videoinput") {
              arr.push(device);
            }
          });
          //Set danh sách thiết bị là camera
          setDevices(arr);
          //Set ID thiết bị hiển thị lên màn hình
          setDeviceId(devices[indexDevice].deviceId);
        })
        .catch((err) => {
          // Xuất log nếu gặp lỗi
          console.error(`${err.name}: ${err.message}`);
        });
    }
  }
  // Sự kiện click chuyển đổi camera
  function handleClick() {
    let indexNew = indexDevice;
    if (indexDevice < devices.length - 1) {
      indexNew++;
    } else {
      indexNew = 0;
    }
    setIndexDevice(indexNew);
    setDeviceId(devices[indexNew].deviceId);
  }
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>LDM SOFT</title>
        <meta name="description" content="camera-ai" />
        <link rel="icon" type="image/png" href="./icon/logo.png" />
      </Helmet>
      <header className="App-header">
        <div className="camera-info">
          Camera: {indexDevice + 1} of {devices.length}
        </div>
        <div className={`person ${person > maxPerson ? "alert-red" : ""}`}>
          Số người: {person}
        </div>
        <div className={`transport ${transport > maxTransport ? "alert-red" : ""}`}>
          Phương tiện: {transport}
        </div>
        {devices.length > 1 && (
          <button className="devicesButton" onClick={handleClick}>
            Change Camera
          </button>
        )}
        <Webcam
          ref={webcamRef}
          muted={true}
          videoConstraints={{
            deviceId: deviceId,
          }}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: "100%",
            height: "100%",
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
            width: "100%",
            height: "100%",
          }}
        />
      </header>
    </div>
  );
}

export default App;
