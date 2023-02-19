import React, { useEffect, useState } from "react";
import { getConfigTime, resetSession, saveConfigTime } from "../util/session";
import {
  ITimeRange,
  IStage,
  ValidatorTimeRange,
  IStageValueField,
  IConfig,
  IConfigAudio,
} from "../util/inteface";
import { IValidator } from "../util/validator";
import { buildId, saveItemConfigTime } from "../util/config";
import styles from "./ConfigContainer.module.css";
import ListTime from "./ListTime";
import ConfigTime from "./ConfigTime";
import CheckboxComponent from "../control/CheckboxComponent";
import CardHeaderComponent from "../card/CardHeaderComponent";
import ConfigAudio from "./ConfigAudio";
import ConfigImage from "./ConfigImage";
import { MapToConfigModel } from "../util/mapper";
import { ReadTextOfFile, SaveTextToFile } from "../util/api/fileApi";
import {IConfigModel} from "../util/inteface";

function ConfigContainer() {
  //    resetSession();
  const [timeCustom, setTimeCustom] = useState(true);
  const [showListTime, setShowListTime] = useState(false);
  const [timeDefault, setTimeDefault] = useState(false);
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  //File
  const [audioFilePersionA, setAudioFilePersionA] = useState();
  const [audioValuePersionA, setAudioValuePersionA] = useState("");
  const [audioFileTransportA, setAudioFileTransportA] = useState();
  const [audioValueTransportA, setAudioValueTransportA] = useState("");
  const [audioFilePersonTransportA, setAudioFilePersonTransportA] = useState();
  const [audioValuePersonTransportA, setAudioValuePersonTransportA] =
    useState("");
  const [audioFilePersionB, setAudioFilePersionB] = useState();
  const [audioValuePersionB, setAudioValuePersionB] = useState("");
  const [audioFileTransportB, setAudioFileTransportB] = useState();
  const [audioValueTransportB, setAudioValueTransportB] = useState("");
  const [audioFilePersonTransportB, setAudioFilePersonTransportB] = useState();
  const [audioValuePersonTransportB, setAudioValuePersonTransportB] =
    useState("");
  //
  const [timeDelay, setTimeDelay] = useState(10);
  const [countMax, setCountMax] = useState(5);
  //
  var configAudio: IConfigAudio = {
    audioPersonA: {
      fieldItem: { value: audioFilePersionA, setValue: setAudioFilePersionA },
      valueItem: { value: audioValuePersionA, setValue: setAudioValuePersionA },
    },
    audioTransportA: {
      fieldItem: {
        value: audioFileTransportA,
        setValue: setAudioFileTransportA,
      },
      valueItem: {
        value: audioValueTransportA,
        setValue: setAudioValueTransportA,
      },
    },
    audioPersonTransportA: {
      fieldItem: {
        value: audioFilePersonTransportA,
        setValue: setAudioFilePersonTransportA,
      },
      valueItem: {
        value: audioValuePersonTransportA,
        setValue: setAudioValuePersonTransportA,
      },
    },
    audioPersonB: {
      fieldItem: { value: audioFilePersionB, setValue: setAudioFilePersionB },
      valueItem: { value: audioValuePersionB, setValue: setAudioValuePersionB },
    },
    audioTransportB: {
      fieldItem: {
        value: audioFileTransportB,
        setValue: setAudioFileTransportB,
      },
      valueItem: {
        value: audioValueTransportB,
        setValue: setAudioValueTransportB,
      },
    },
    audioPersonTransportB: {
      fieldItem: {
        value: audioFilePersonTransportB,
        setValue: setAudioFilePersonTransportB,
      },
      valueItem: {
        value: audioValuePersonTransportB,
        setValue: setAudioValuePersonTransportB,
      },
    },
    countMax: { value: countMax, setValue: setCountMax },
    timeDelay: { value: timeDelay, setValue: setTimeDelay },
  };
  //
  var config: IConfig = {
    fromTime: {
      value: fromTime,
      setValue: setFromTime,
    },
    toTime: {
      value: toTime,
      setValue: setToTime,
    },
    isCustom: {
      value: timeCustom,
      setValue: setTimeCustom,
    },
    isDefault: {
      value: timeDefault,
      setValue: setTimeDefault,
    },
    showListTime: {
      value: showListTime,
      setValue: setShowListTime,
    },
  };

  const [timeRanges, setTimeRanges] = useState(getConfigTime());
  var [itemData, setItem] = useState(null);
  var [imgFile, setImgFile] = useState(null);
  var [imgTitle, setImgTitle] = useState(null);

  const folderInput = React.useRef(null);
  function reloadConfig() {
    setTimeRanges(getConfigTime());
  }
  //
  const [configModel, setConfigModel] = useState(null);
  useEffect(() => {
    readText();
  }, []);
  //
  async function readText() {
    console.log("read");
    var result = await ReadTextOfFile("config.txt");
    if(result)
    {
      var model : IConfigModel = JSON.parse(result);
      SetDataFromConfigModel(model);
    }
  }
  //
  function SetDataFromConfigModel(configModel: IConfigModel)
  {
    setTimeRanges(configModel.listTime);
    setTimeDelay(configModel.timeDelay);
    setCountMax(configModel.countMax);
    setAudioValuePersionA(configModel.audio.persionA);
    setAudioValuePersionB(configModel.audio.persionB);
    setAudioValueTransportA(configModel.audio.transportA);
    setAudioValueTransportB(configModel.audio.transportB);
    setAudioValuePersonTransportA(configModel.audio.persionTransportA);
    setAudioValuePersonTransportB(configModel.audio.persionTransportB);
  }
  //
  function onChangeCheckTime(e) {
    switch (e.target.id) {
      case "chkDefault":
        config.isCustom.setValue(e.target.checked);
        break;
      case "chkCustom":
        config.isDefault.setValue(e.target.checked);
        break;
    }
  }
  function onClickEditTime(item) {
    setItem(item);
  }
  async function onClickSave() {
    var result = await SaveTextToFile(
      "config.txt",
      JSON.stringify(MapToConfigModel(configAudio, timeRanges))
    );
    window.alert("Lưu thành công!!!");
    console.log(result);
  }
  return (
    <div className={styles.groupContainer}>
      <button style={{ left: "5px", top: "5px", position: "fixed" }}>
        <a href="/">Trang chủ</a>
      </button>
      <div className={styles.container}>
        <div className={styles.headerConfig}>Thiết lập hệ thống</div>
        <div>
          <CheckboxComponent
            hasTitle={true}
            title="Mặc định"
            inputValue={config.isDefault}
            inputId={"chkDefault"}
            onChangeFnc={onChangeCheckTime}
          />
        </div>
        <div>
          <CheckboxComponent
            hasTitle={true}
            title="Tùy chỉnh"
            inputValue={config.isCustom}
            inputId={"chkCustom"}
            onChangeFnc={onChangeCheckTime}
          />
        </div>
        {config.isCustom.value && (
          <ConfigTime reLoadFnc={reloadConfig} data={itemData} />
        )}
        <div
          className={`${styles.groupListTime} ${
            config.showListTime.value ? styles.groupListTimeShow : ""
          }`}
        >
          <CardHeaderComponent
            headerText={`Danh sách khung giờ thiết lập (${
              timeRanges ? timeRanges.length : 0
            })`}
            isShow={config.showListTime}
            classStyle={
              config.showListTime.value ? styles.headerListTimeShow : ""
            }
          />
          {config.showListTime.value && (
            <ListTime lstData={timeRanges} editCTA={onClickEditTime} />
          )}
        </div>
        {config.isCustom.value && <ConfigAudio configData={configAudio} />}
        {config.isCustom.value && (
          <ConfigImage
            inputImgPath={{
              fieldItem: { value: imgTitle, setValue: setImgTitle },
              valueItem: { value: imgFile, setValue: setImgFile },
            }}
          />
        )}
        {config.isCustom.value && (
          <div className={styles.groupSave}>
            <button className={styles.saveBtn} onClick={onClickSave}>
              Lưu thiết lập
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ConfigContainer;
