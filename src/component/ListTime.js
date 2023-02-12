import { ITimeRange } from "../util/inteface";
import React, { useEffect, useState } from "react";
import TimeItem from "./TimeItem";
import styles from "./ListTime.module.css";
export interface ListTimeProps {
  lstData: ITimeRange[];
  editCTA: (void) => 0;
}
function ListTime(props: ListTimeProps) {
  const { lstData, editCTA } = props;
  const listTime =
    lstData != null
      ? lstData.map((item, index) => <TimeItem data={item} index={index + 1} editCTA={editCTA} />)
      : "";
  return (
    <table className={styles.table} >
      <tr className={`${styles.tr} ${styles.header}`} >
        <td className={`${styles.td}`} rowSpan={2}>STT</td>
        <td className={styles.td} rowSpan={2}>Khung giờ</td>
        <td className={styles.td} colSpan={2}>Giới hạn cảnh báo</td>
      </tr>
      <tr className={styles.header}>
        <td className={`${styles.td} ${styles.tdLimit}`}>Số người</td>
        <td className={`${styles.td} ${styles.tdLimit}`}>Số PT</td>
      </tr>
      {listTime}
    </table>
  );
}

export default ListTime;
