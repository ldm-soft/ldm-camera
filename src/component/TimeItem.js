import { ITimeRange } from "../util/inteface";
import React from "react";
import styles from "./ListTime.module.css";
export interface TimeItemProp {
  data: ITimeRange;
  index: Number;
  editCTA: (void) => 0;
}
function TimeItem(props: TimeItemProp) {
  const { data, index,editCTA } = props;
  return (
    <tr className={styles.tr}>
      <td className={styles.td}>{index}</td>
      <td className={`${styles.td} ${styles.clickItem}`} onClick={() => {editCTA(data);}} title="[Nhấp vào để sửa/xóa]">
        {data.fromTime}~{data.toTime}
      </td >
      <td className={styles.td}>{data.maxPersion}</td>
      <td className={styles.td}>{data.maxTransport}</td>
    </tr>
  );
}
export default TimeItem;
