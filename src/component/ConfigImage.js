import React, { useEffect, useState } from "react";
import InputFileComponent from "../control/InputFileComponent";
import styles from "./ConfigContainer.module.css";
import {IStageValueField} from "../util/inteface";
interface ConfigImageProps {
  inputImgPathFile : IStageValueField<any, String>
}
function ConfigImage(props: ConfigImageProps) {
  // const [value, setValueFile] = useState();
  // const [file, setFile] = useState();
  const {inputImgPath}  = props;
  return (
    <div className={styles.groupImage}>
      <div className={styles.headerConfigLevel1}>3. Thiết lập hình ảnh</div>
      <div>
        <label className={styles.titleFieldHA}>Đường dẫn lưu ảnh</label>
        <InputFileComponent 
            inputPath={true}
            title={'Chọn'}
            inputValue ={inputImgPath.valueItem}
            inputFiles ={inputImgPath.fieldItem}
          />
      </div>
      <div>
        <label className={styles.titleFieldHA}>Lưu ảnh vi phạm sau:</label>
        <input type="number" className={styles.inputImgSave} />
        <label>lần cảnh báo xử lý</label>
      </div>
    </div>
  );
}

export default ConfigImage;
