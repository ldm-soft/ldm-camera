import React, { useEffect, useState } from "react";
import styles from "./ConfigContainer.module.css";
import axios from "axios";
import { CheckFile, UploadFile } from "../util/api/fileApi";
import InputFileComponent from "../control/InputFileComponent";
import {IConfigAudio} from "../util/inteface";
import InputComponent from "../control/InputComponent";

interface IConfigAudioProps{
  configData: IConfigAudio
}
function ConfigAudio(props: IConfigAudioProps) {
  const { audioPersonA, audioTransportA, audioPersonTransportA, audioPersonB, audioTransportB, audioPersonTransportB, timeDelay, countMax } = props.configData;
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
            inputValue ={audioPersonA.valueItem}
            inputFiles ={audioPersonA.fieldItem}
          />
        </div>
        <div>
          <label className={styles.titleFieldTT}>
            File âm thanh cảnh báo phương tiện
          </label>
          <InputFileComponent 
            acceptFileType="application/mp3, .mp3"
            inputValue ={audioTransportA.valueItem}
            inputFiles ={audioTransportA.fieldItem}
          />
        </div>
        <div>
          <label className={styles.titleFieldTT}>
            File âm thanh cảnh báo người & PT
          </label>
          <InputFileComponent 
            acceptFileType="application/mp3, .mp3"
            inputValue ={audioPersonTransportA.valueItem}
            inputFiles ={audioPersonTransportA.fieldItem}
          />
        </div>
        <div className={styles.groupL}>
          <label>Thời gian sau(s):</label>
          <InputComponent
            inputType="number"
            inputValue={timeDelay}
            classStyle={styles.inputTimeWait}
            titleOnHover="Thời gian delay giữa 2 lần cảnh báo liên tiếp."
          />
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
            inputValue ={audioPersonB.valueItem}
            inputFiles ={audioPersonB.fieldItem}
          />
        </div>
        <div>
          <label className={styles.titleFieldXL}>
            File âm thanh cảnh báo xử lý phương tiện
          </label>
          <InputFileComponent 
            acceptFileType="application/mp3, .mp3"
            inputValue ={audioTransportB.valueItem}
            inputFiles ={audioTransportB.fieldItem}
          />
        </div>
        <div>
          <label className={styles.titleFieldXL}>
            File âm thanh cảnh báo xử lý người & PT
          </label>
          <InputFileComponent 
            acceptFileType="application/mp3, .mp3"
            inputValue ={audioPersonTransportB.valueItem}
            inputFiles ={audioPersonTransportB.fieldItem}
          />
        </div>
        <div>
          <label>Cảnh báo xử lý sau khi vượt quá:</label>
          <InputComponent
            inputType="number"
            inputValue={countMax}
            classStyle={styles.inputCount}
            titleOnHover="Thời gian delay giữa 2 lần cảnh báo liên tiếp."
          />
          <label>lần cảnh báo tuyên truyền</label>
        </div>
      </div>
    </div>
  );
}

export default ConfigAudio;
