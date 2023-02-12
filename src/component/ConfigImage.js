import React, { useEffect, useState } from "react";
import styles from "./ConfigContainer.module.css";
interface ConfigImageProps {
  // reLoadFnc: (void) => 0;
}
function ConfigImage(props: ConfigImageProps) {
  return (
    <div className={styles.groupImage}>
      <div className={styles.headerConfigLevel1}>3. Thiết lập hình ảnh</div>
      <div>
        <label className={styles.titleFieldHA}>Đường dẫn lưu ảnh</label>
        <input type="file" accept="application/mp3, .mp3" />
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
