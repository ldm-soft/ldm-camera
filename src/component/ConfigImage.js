import React, { useEffect, useState } from "react";
import InputFileComponent from "../control/InputFileComponent";
import styles from "./ConfigContainer.module.css";
interface ConfigImageProps {
  // reLoadFnc: (void) => 0;
}
function ConfigImage(props: ConfigImageProps) {
  const [value, setValueFile] = useState();
  const [file, setFile] = useState();
  return (
    <div className={styles.groupImage}>
      <div className={styles.headerConfigLevel1}>3. Thiết lập hình ảnh</div>
      <div>
        <label className={styles.titleFieldHA}>Đường dẫn lưu ảnh</label>
        <InputFileComponent 
            acceptFileType="application/mp3, .mp3"
            inputValue ={{value : value, setValue : setValueFile}}
            inputFiles ={{value : file, setValue : setFile}}
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
