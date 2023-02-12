import React, { useEffect, useState } from "react";
import styles from "./ConfigContainer.module.css";
interface ConfigAudioProps {
  // reLoadFnc: (void) => 0;
}
function ConfigAudio(props: ConfigAudioProps) {
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
          <input type="file" accept="application/mp3, .mp3" />
        </div>
        <div>
          <label className={styles.titleFieldTT}>
            File âm thanh cảnh báo phương tiện
          </label>
          <input type="file" accept="application/mp3, .mp3" />
        </div>
        <div>
          <label className={styles.titleFieldTT}>
            File âm thanh cảnh báo người & PT
          </label>
          <input type="file" accept="application/mp3, .mp3" />
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
          <input type="file" accept="application/mp3, .mp3" />
        </div>
        <div>
          <label className={styles.titleFieldXL}>
            File âm thanh cảnh báo xử lý phương tiện
          </label>
          <input type="file" accept="application/mp3, .mp3" />
        </div>
        <div>
          <label className={styles.titleFieldXL}>
            File âm thanh cảnh báo xử lý người & PT
          </label>
          <input type="file" accept="application/mp3, .mp3" />
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
