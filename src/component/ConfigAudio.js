import React, { useEffect, useState } from "react";
import styles from "./ConfigContainer.module.css";
import axios from "axios";
import { CheckFile, UploadFile } from "../util/api/fileApi";
import InputFileComponent from "../control/InputFileComponent";
interface ConfigAudioProps {
  // reLoadFnc: (void) => 0;
}
function ConfigAudio(props: ConfigAudioProps) {
  const [value, setValueFile] = useState();
  const [file, setFile] = useState();
  return (
    <div className={styles.groupAudio}>
      <div className={styles.headerConfigLevel1}>2.Cách thức phát cảnh báo</div>
      <div>
        <div className={styles.headerConfigLevel2}>
          A. Cảnh báo tuyên truyền
        </div>
        <div>
          <label className={styles.titleFieldTT}>
            File âm thanh cảnh báo người
          </label>
          <InputFileComponent 
            acceptFileType="application/mp3, .mp3"
            inputValue ={{value : value, setValue : setValueFile}}
            inputFiles ={{value : file, setValue : setFile}}
          />
        </div>
        <div>
          <label className={styles.titleFieldTT}>
            File âm thanh cảnh báo phương tiện
          </label>
          <InputFileComponent 
            acceptFileType="application/mp3, .mp3"
            inputValue ={{value : value, setValue : setValueFile}}
            inputFiles ={{value : file, setValue : setFile}}
          />
        </div>
        <div>
          <label className={styles.titleFieldTT}>
            File âm thanh cảnh báo người & PT
          </label>
          <InputFileComponent 
            acceptFileType="application/mp3, .mp3"
            inputValue ={{value : value, setValue : setValueFile}}
            inputFiles ={{value : file, setValue : setFile}}
          />
        </div>
        <div className={styles.groupL}>
          <label>Thời gian sau:</label>
          <input type="number" className={styles.inputTimeWait} />
          <label className={styles.explainTimeWait}>
            (Sẽ phát cảnh báo nếu người/phương tiện liên tục vượt ngưỡng cảnh
            báo)
          </label>
        </div>
      </div>
      <div>
        <div className={styles.headerConfigLevel2}> B. Cảnh báo xử lý</div>
        <div>
          <label className={styles.titleFieldXL}>
            File âm thanh cảnh báo xử lý người
          </label>
          <InputFileComponent 
            acceptFileType="application/mp3, .mp3"
            inputValue ={{value : value, setValue : setValueFile}}
            inputFiles ={{value : file, setValue : setFile}}
          />
        </div>
        <div>
          <label className={styles.titleFieldXL}>
            File âm thanh cảnh báo xử lý phương tiện
          </label>
          <InputFileComponent 
            acceptFileType="application/mp3, .mp3"
            inputValue ={{value : value, setValue : setValueFile}}
            inputFiles ={{value : file, setValue : setFile}}
          />
        </div>
        <div>
          <label className={styles.titleFieldXL}>
            File âm thanh cảnh báo xử lý người & PT
          </label>
          <InputFileComponent 
            acceptFileType="application/mp3, .mp3"
            inputValue ={{value : value, setValue : setValueFile}}
            inputFiles ={{value : file, setValue : setFile}}
          />
        </div>
        <div>
          <label>Cảnh báo xử lý sau khi vượt quá:</label>
          <input type="number" className={styles.inputCount} />
          <label>lần cảnh báo tuyên truyền</label>
        </div>
      </div>
    </div>
  );
}

export default ConfigAudio;
