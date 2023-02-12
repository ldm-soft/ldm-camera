import React from "react";
import { IStage } from "../util/inteface";
import styles from "./CardHeaderComponent.module.css";
interface CardHeaderProps {
  headerText: String;
  isShow: IStage<Boolean>;
  classStyle: any;
}
function CardHeaderComponent(props: CardHeaderProps) {
  const { headerText, isShow, classStyle } = props;
  return (
    <div
      className={`${styles.component} ${classStyle}` }
      onClick={() => {
        isShow.setValue(!isShow.value);
      }}
    >
      {headerText} <span className={`${styles.icon} ${isShow.value ? styles.iconPlus : ''}`}>{isShow.value ? "-" : "+"}</span>
    </div>
  );
}

export default CardHeaderComponent;
