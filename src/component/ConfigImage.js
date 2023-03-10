import React, { useEffect, useState } from "react";
import InputFileComponent from "../control/InputFileComponent";
import styles from "./ConfigContainer.module.css";
import {IStageValueField, IStage} from "../util/inteface";
import InputComponent from "../control/InputComponent";
interface ConfigImageProps {
  //inputImgPathFile : IStageValueField<any, String>
  pathSave: IStage<String>;
  warningMax: IStage<any>;
}
function ConfigImage(props: ConfigImageProps) {
  const {warningMax, pathSave}  = props;
  console.log(pathSave)
  const onClick = async () => {
   // window.open('file:///D:/', "_self")
    // const dirHandle = await window.showDirectoryPicker(pathSave);
  }
  return (
    <div className={styles.groupImage}>
      <div className={styles.headerConfigLevel1}>3. Thiết lập hình ảnh</div>
      <div>
        <label className={styles.titleFieldHA}>Đường dẫn lưu ảnh:</label>
        <a href= '#' onClick={onClick}>{pathSave.value}</a>
      </div>
      <div>
        <label className={styles.titleFieldHA}>Lưu ảnh vi phạm sau:</label>
        <InputComponent
          inputType="number"
          inputValue={warningMax}
          classStyle={styles.inputImgSave}
        />
        <label>lần cảnh báo xử lý</label>
      </div>
    </div>
  );
}

export default ConfigImage;
