// style = các thuộc tính hiển thị của thẻ trên màn hình web
// console = phần hiển thị log khi sử dụng ứng dụng
// ứng dụng tích hợp tính năng phân tích dữ liệu từ hình ảnh dựa theo thuật toán nhận diện của google.
// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./util/utilities";
import { Helmet } from "react-helmet";
import transportPath from "./audio/transport.mp3";
import personPath from "./audio/person.mp3";
import persontransportPath from "./audio/persontransport.mp3";
import warningtransportPath from "./audio/warningtransport.mp3";
import warningpersonPath from "./audio/warningperson.mp3";
import ConfigContainer from "./component/ConfigContainer";
import { ITimeRange, IConfigModel } from "./util/inteface";
import logo from "./icon/logo.png";
import { getConfigTime } from "./util/session";
import { ReadTextOfFile, SaveBase64ToIMG, urlServerStatic } from "./util/api/fileApi";
import { buildFileNameWithTime } from "./util/helper";
function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [person, setPerson] = useState(0);
  const [transport, setTransport] = useState(0);
  //
  const waitimeReadWarning: Number = 10 * 1000; //10s (đơn vị tính mili giây với 1s = 1000ms)
  //defaultMax Sử dụng cho trường hợp khác khung giờ cao điểm
  const defaultMax = {
    maxTransport: 10,
    maxPersion: 10,
  };

  const defaultTime: ITimeRange[] = [
    {
      fromTime: "06:40",
      toTime: "07:10",
      maxTransport: 20,
      maxPersion: 20,
    },
    {
      fromTime: "16:30",
      toTime: "16:50",
      maxTransport: 20,
      maxPersion: 20,
    },
  ];
  //timeRanges định nghĩa khung giờ cao điểm
  let timeRanges: ITimeRange[] = defaultTime;
  var configModel: IConfigModel = null;
  async function readConfig() {
    console.log("read config");
    var result = await ReadTextOfFile("config.txt");
    console.log(result)
    if (result && result.isOk) {
      configModel = JSON.parse(result.data);
      SetDataFromConfigModel();
    }
    if (!timeRanges) {
      timeRanges = defaultTime;
    }
  }
  function IsNotNullOrEmpty(value: string) {
    return value && value != undefined && value != null && value.length > 0;
  }
  function SetDataFromConfigModel() {
    timeRanges = configModel.listTime;
    current.maxRemind = configModel.countMax;
    current.timeDelay = configModel.timeDelay;
    current.maxWarning = configModel.warningMax;
    var pathAudio : string ='';
    if (IsNotNullOrEmpty(configModel.audio.persionA)) {
      pathAudio = `${urlServerStatic}\\music?fileName=${configModel.audio.persionA}`;
      audioPersion = new Audio(pathAudio);
    }
    
    if (IsNotNullOrEmpty(configModel.audio.transportA)) {
      pathAudio = `${urlServerStatic}\\music?fileName=${configModel.audio.transportA}`;
      audioTransport = new Audio(pathAudio);
    }
    
    if (IsNotNullOrEmpty(configModel.audio.persionTransportA)) {
      pathAudio = `${urlServerStatic}\\music?fileName=${configModel.audio.persionTransportA}`;
      audioTransport = new Audio(pathAudio);
    }
    
    if (IsNotNullOrEmpty(configModel.audio.persionB)) {
      pathAudio = `${urlServerStatic}\\music?fileName=${configModel.audio.persionB}`;
      audioWarningPerson = new Audio(pathAudio);
    }
    
    if (IsNotNullOrEmpty(configModel.audio.transportB)) {
      pathAudio = `${urlServerStatic}\\music?fileName=${configModel.audio.transportB}`;
      audioWarningTransport = new Audio(pathAudio);
    }
    pathAudio = `${urlServerStatic}\\music?fileName=${configModel.audio.persionTransportB}`;
    if (IsNotNullOrEmpty(configModel.audio.persionTransportB)) {
      audioWarningTransport = new Audio(pathAudio);
    }
  }

  //Khởi tạo max =  default
  const [maxPerson, setmaxPerson] = useState(defaultMax.maxPersion); //Số lượng đối tượng là con người (Nếu lớn  hơn sẽ thông báo: Khu vực cổng trường xin mọi người hãy di chuyển tránh tắc nghẽn giao thông.)
  const [maxTransport, setMaxTransport] = useState(defaultMax.maxTransport); //Số lượng đối tượng là phương tiện tối đa có trong khung hình(Nếu lớn hơn sẽ thông báo: Yêu cầu phương tiện giao thông di chuyển nhanh qua khu vực cổng trường để đảm bảo an toàn giao thông.)
  //
  var personPath_server = `${urlServerStatic}\\music?fileName=persion`;
  //
  var audioTransport = new Audio(transportPath);
  var audioPersion = new Audio(personPath);
  var audioPersonTransport = new Audio(persontransportPath);
  var audioWarningTransport = new Audio(warningtransportPath);
  var audioWarningPerson = new Audio(warningpersonPath);
  // Main function
  const runMain = async () => {
    const net = await cocossd.load();
    console.log("Handpose model loaded.");
    await readConfig();
    //  Set thời gian re-load tìm kiếm người có trong khung hình đơn vị tính mili giây
    //  Mặc định 10ms sẽ load 1 lần
    setInterval(() => {
      detect(net);
    }, 10);
  };
  let isEnabledAudio: Boolean = true;
  const playAudio = async (audio: Audio) => {
    if (isEnabledAudio) {
      isEnabledAudio = false;
      await audio.play();
      //Dừng lại đợi tương ứng thời gian timeDelay mới phát thông báo tiếp theo nếu có cảnh báo
      await sleep(current.timeDelay * 1000);
      isEnabledAudio = true;
    }
  };
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
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
      const obj = await net.detect(video, 1000);
      var objectItems = [];
      let countPerson = 0;
      let countTransport = 0;
      //remove item old
      //
      Object.values(obj).forEach((item) => {
        //Các đối tượng là con người(person) sẽ được chọn lọc và lấy ra ở bước này.
        //bicycle, motorcycle , car  = transport
        if (
          item.class === "person" ||
          item.class === "bicycle" ||
          item.class === "car" ||
          item.class === "motorcycle"
        ) {
          if (item.class === "person") {
            countPerson++; //Tăng biến đếm  số người lên 1 đơn vị
          } else {
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
      checkActiveRemind(countPerson, countTransport);
      //
    }
  };
  let countRemindTransport: number = 0;
  let timeRemindTransportOld: date = null;
  let countRemindPerson: number = 0;
  let timeRemindPersontOld: date = null;
  let current = {
    maxPerson: 0,
    maxTransport: 0,
    maxRemind: 5,
    timeCheck: 20,
    timeDelay: 10,
    maxWarning: 5,
  };
  let warning =  {
    person: 0,
    transport: 0,
  }
  //Tính toán để nhắc nhở TH:
  function checkWarning(countPerson: number, countTransport: number): Boolean {
    const currentDate = new Date();
    //Tính toán nhắc nhở đối tượng phương tiện
    //Trong trường hợp 05 lần phát cảnh báo mà phương tiện không di chuyển
    //Ứng dụng sẽ phát ra thông báo: "Nếu các phương tiện không ra khỏi khu vực này, gây ảnh hưởng ATGT, dữ liệu vi phạm sẽ được chuyển đến cơ quan Công an xử lý"
    if (countTransport > current.maxTransport) {
      if (
        timeRemindTransportOld == null ||
        currentDate - timeRemindTransportOld < current.timeCheck * 1000
      ) {
        // Nhắc nhở  liên tiếp trong 20s
        countRemindTransport++;
      } else {
        countRemindTransport = 0;
        timeRemindTransportOld = null;
        warning.transport = 0;
      }
      //Trường hợp nhắc nhở > 5 lần mà không di chuyển)
      if (countRemindTransport >= current.maxRemind) {
        playAudio(audioWarningTransport);
        warning.transport++;
        if(warning.transport >= current.maxWarning){
          //Lưu hình ảnh
          capture();
          warning.transport = 0;
          warning.person = 0;
          countRemindTransport = 0; // Sau khi nhắc nhở thì reset
          timeRemindTransportOld = null;
        }
        return true;
      }
      
      timeRemindTransportOld = currentDate;
    }
    //Tính toán nhắc nhở đối tượng con người
    //TH 05 lần học sinh không giải tán vẫn tụ tập thì phát cảnh báo: "Đề nghị các em học sinh chấp hành tốt nội quy nhà trường, cố tình vi phạm dữ liệu hình ảnh sẽ được chuyển cho Nhà trường xử lý".
    console.log(`${countPerson}-maxPerson-${current.maxPerson}`)
    if (countPerson > current.maxPerson) {
      if (
        timeRemindPersontOld == null ||
        currentDate - timeRemindPersontOld < current.timeCheck * 1000
      ) {
        // Nhắc nhở  liên tiếp   trong 20s
        countRemindPerson++;
      } else {
        countRemindPerson = 0;
        warning.person = 0;
        timeRemindPersontOld = null;
      }
      console.log(`${countPerson}-countRemindPerson-${countRemindPerson}`)
      //Trường hợp nhắc nhở > 5 lần mà không di chuyển)
      if (countRemindPerson >= current.maxRemind) {
        playAudio(audioWarningPerson);
        warning.person++;
        if(warning.person >= current.maxWarning){
          //Lưu hình ảnh
          capture();
          warning.person = 0;
          warning.transport = 0;
          countRemindPerson = 0; // Sau khi nhắc nhở thì reset
          timeRemindPersontOld = null;
        }
        
        return true;
      }
      
      timeRemindPersontOld = currentDate;
    }
    return false;
  }
  var minutesOfDay = function (m: Date) {
    return m.getMinutes() + m.getHours() * 60;
  };
  function setMaxOnTime() {
    const currentDate = new Date();
    const indexTime = timeRanges.findIndex(
      (item) =>
        minutesOfDay(currentDate) >=
          minutesOfDay(
            new Date(`${currentDate.toDateString()} ${item.fromTime}`)
          ) &&
        minutesOfDay(currentDate) <=
          minutesOfDay(new Date(`${currentDate.toDateString()} ${item.toTime}`))
    );

    const timeRange = indexTime !== -1 ? timeRanges[indexTime] : defaultMax;
    setmaxPerson(timeRange.maxPersion);
    setMaxTransport(timeRange.maxTransport);
    current.maxPerson = timeRange.maxPersion;
    current.maxTransport = timeRange.maxTransport;
  }
  function checkActiveRemind(
    countPerson: number,
    countTransport: number
  ): void {
    //Set lại max theo khung giờ
    setMaxOnTime();
    //
    if (!isEnabledAudio) {
      return;
    }
    //
    if (checkWarning(countPerson, countTransport)) {
      return;
    }
    if (
      countPerson > current.maxPerson &&
      countTransport > current.maxTransport
    ) {
      playAudio(audioPersonTransport);
      return;
    }
    if (countPerson > current.maxPerson) {
      playAudio(audioPersion);
      return;
    }
    if (countTransport > current.maxTransport) {
      playAudio(audioTransport);
      return;
    }
  }
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
      .getUserMedia({ video: true })
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
  //Save img
  const capture =  React.useCallback(async () => {
    const pictureSrc = webcamRef.current.getScreenshot();
    var result = await SaveBase64ToIMG(
      buildFileNameWithTime('IMG','png'),
      pictureSrc
    );
    console.log("Lưu thành công(capture)!!!");
  })
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>LDM SOFT</title>
        <meta name="description" content="camera-ai" />
        <link rel="icon" type="image/png" href={logo} />
      </Helmet>
      <header className="App-header">
        <div className="camera-info">
          Camera: {indexDevice + 1} of {devices.length}
        </div>
        <div className={`person ${person > maxPerson ? "alert-red" : ""}`}>
          Số người: {person}
        </div>
        <div
          className={`transport ${transport > maxTransport ? "alert-red" : ""}`}
        >
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
          screenshotFormat="image/jpeg"
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
        <button style={{ right: "5px", bottom: "5px", position: "fixed", minWidth:'50px'  }} >
          <a href="./config">Thiết lập</a>
        </button>
        <button style={{ left: "5px", bottom: "5px", position: "fixed", minWidth:'50px' }} onClick ={()=> {capture()}} >
          [Chụp]
        </button>
      </header>
    </div>
  );
}

export default App;
