import React, { useEffect, useState } from "react";
import { getConfigTime, resetSession, saveConfigTime } from "../util/session";
import { ITimeRange, IStage, ValidatorTimeRange } from "../util/inteface";
import { IValidator } from "../util/validator";
import { buildId, saveItemConfigTime } from "../util/config";
import styles from "./ConfigContainer.module.css";
import ListTime from "./ListTime";
import ConfigTime from "./ConfigTime";
import CheckboxComponent from "../control/CheckboxComponent";
import CardHeaderComponent from "../card/CardHeaderComponent";
import ConfigAudio from "./ConfigAudio";
import ConfigImage from "./ConfigImage";

interface IConfig {
  fromTime: IStage<String>;
  toTime: IStage<String>;
  isCustom: IStage<Boolean>;
  isDefault: IStage<Boolean>;
  showListTime: IStage<Boolean>;
}
function ConfigContainer() {
  //    resetSession();
  const [timeCustom, setTimeCustom] = useState(true);
  const [showListTime, setShowListTime] = useState(false);
  const [timeDefault, setTimeDefault] = useState(false);
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
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

  const folderInput = React.useRef(null);
  function reloadConfig() {
    setTimeRanges(getConfigTime());
  }
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
  function onClickEditTime(item)
  {
    setItem(item);
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
        {( config.isCustom.value ) && <ConfigTime reLoadFnc={reloadConfig} data={itemData} />}
        <div
          className={`${styles.groupListTime} ${
            config.showListTime.value ? styles.groupListTimeShow : ""
          }`}
        >
          <CardHeaderComponent
            headerText={`Danh sách khung giờ thiết lập (${timeRanges?timeRanges.length:0})`}
            isShow={config.showListTime}
            classStyle={
              config.showListTime.value ? styles.headerListTimeShow : ""
            }
          />
          {config.showListTime.value && <ListTime lstData={timeRanges} editCTA={onClickEditTime} />}
        </div>
        {config.isCustom.value && <ConfigAudio />}
        {config.isCustom.value && <ConfigImage />}
        {config.isCustom.value && (
          <div className={styles.groupSave}>
            <button className={styles.saveBtn}>Lưu thiết lập</button>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default ConfigContainer;
