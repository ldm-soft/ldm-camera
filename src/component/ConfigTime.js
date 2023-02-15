import React, { useEffect, useState } from "react";
import { getConfigTime, resetSession, saveConfigTime } from "../util/session";
import inteface, { ITimeRange, IStage } from "../util/inteface";
import {
  buildConfigTimeId,
  ValidatorTimeRange,
  ValidatorType,
} from "../util/config";
import { IValidator } from "../util/validator";
import { buildId, saveItemConfigTime, deleteItemConfigTime } from "../util/config";
import styles from "./ConfigContainer.module.css";
import ListTime from "./ListTime";
import InputComponent from "../control/InputComponent";
import NotificationComponent, {
  NotificationType,
} from "../notification/NotificationComponent";
interface IConfig {
  id?:  IStage<Number>;
  fromTime: IStage<String>;
  toTime: IStage<String>;
  maxPersion: IStage<Number>;
  maxTransport: IStage<Number>;
}
interface ConfigTimeProps {
  reLoadFnc: (void) => 0;
  data: ITimeRange;
  isShow: Boolean;
}
interface IConfigDefault{
  fromTime: String;
  toTime: String;
  maxPersion: Number;
  maxTransport: Number;
}
function ConfigTime(props: ConfigTimeProps) {
  let { reLoadFnc, data, isShow } = props;
  let configDefault :IConfigDefault ={
    fromTime:'00:00',
    toTime:'23:59',
    maxPersion: 10,
    maxTransport: 10,
  }
  const iniArr: IValidator[] = [];
  const [error, setError] = useState(iniArr);
  let [fromTime, setFromTime] = useState(configDefault.fromTime);
  const [toTime, setToTime] = useState(configDefault.toTime);
  const [id, setId] = useState(null);
  const [maxPersion, setMaxPersion] = useState(configDefault.maxPersion);
  const [maxTransport, setMaxTransport] = useState(configDefault.maxTransport);
  const [isUpdate, setIsUpdate] = useState(false);
  let config: IConfig = {
    id:{
      value: id,
      setValue: setId,
    },
    fromTime: {
      value: fromTime,
      setValue: setFromTime,
    },
    toTime: {
      value: toTime,
      setValue: setToTime,
    },
    maxPersion: {
      value: maxPersion,
      setValue: setMaxPersion,
    },
    maxTransport: {
      value: maxTransport,
      setValue: setMaxTransport,
    },
  };
  function clearData()
  {
    setError([]);
    config.fromTime.setValue(configDefault.fromTime);
    config.toTime.setValue(configDefault.toTime);
    config.maxPersion.setValue(configDefault.maxPersion);
    config.maxTransport.setValue(configDefault.maxTransport);
    config.id.setValue(null);
  }
  function newClick()
  {
    clearData();
    setIsUpdate(false);
  }
  useEffect(() => {
    if (data) {
      setError([]);
      config.id.setValue(data.id);
      config.fromTime.setValue(data.fromTime);
      config.toTime.setValue(data.toTime);
      config.maxPersion.setValue(data.maxPersion);
      config.maxTransport.setValue(data.maxTransport);
    }
    setIsUpdate(data !== null);
  }, [data]);

  function mapToTimeRange(): ITimeRange {
    return {
      id: config.id.value ?? buildConfigTimeId(),
      fromTime: config.fromTime.value,
      toTime: config.toTime.value,
      maxPersion: config.maxPersion.value,
      maxTransport: config.maxTransport.value,
    };
  }
  function deleteClick()
  {
    setError([]);
    if(window.confirm('Bạn có chắc chắn muốn xóa không?' ))
    {
      let itemSave: ITimeRange = mapToTimeRange();
      deleteItemConfigTime(itemSave);
      setError([
        {
          error: false,
          errorText: `Xóa thành công!`,
        },
      ]);
      data = null;
      setIsUpdate(false);
      clearData();
      reLoadFnc();
    }
  }
  function saveClick() {
    setError([]);
    const typeSave = config.id.value !== null ? ValidatorType.Update : ValidatorType.New;
    console.log(typeSave)
    let itemSave: ITimeRange = mapToTimeRange();
    const validator = ValidatorTimeRange(itemSave, typeSave);
    if (validator.length > 0) {
      setError(validator);
      return;
    }
    saveItemConfigTime(itemSave);
    setError([
      {
        error: false,
        errorText: `${
          typeSave === ValidatorType.New ? "Thêm mới" : "Cập nhật"
        } thành công!`,
      },
    ]);
    reLoadFnc();
  }

  return (
    <div className={styles.groupTime}>
      <div>
        <div className={styles.header1}>
          1.Khung giờ - Giới hạn cảnh báo
        </div>
        <div>Khung giờ:</div>
        <div>
          <InputComponent
            inputType="time"
            inputValue={config.fromTime}
            classStyle={styles.inputTime}
            titleOnHover="Bắt đầu"
          />
          ~
          <InputComponent
            inputType="time"
            inputValue={config.toTime}
            classStyle={styles.inputTime}
            titleOnHover="Kết thúc"
          />
        </div>
      </div>
      <div>
        <span className={styles.inputTitle}>Giới hạn người:</span>
        <InputComponent
          inputType="number"
          inputValue={config.maxPersion}
          classStyle={styles.inputNumber}
        />
      </div>
      <div>
        <span className={styles.inputTitle}>Giới hạn phương tiện:</span>
        <InputComponent
          inputType="number"
          inputValue={config.maxTransport}
          classStyle={styles.inputNumber}
        />
      </div>
      {error.length > 0 &&
        error.map(function (item, index) {
          return (
            <NotificationComponent
              notificationType={
                item.error ? NotificationType.Error : NotificationType.Success
              }
              title={item.errorText}
            />
          );
        })}
      <button className={styles.saveTime} onClick={saveClick}>
        {isUpdate ?"Cập nhật":"Thêm++"}
      </button>
      {isUpdate && (
        <>
        <button className={styles.deleteTime} onClick={deleteClick}>
          Xóa
        </button>
        <button className={styles.addTime} onClick={newClick}>
        Thêm mới
      </button>
      </>
      )}
    </div>
  );
}

export default ConfigTime;
