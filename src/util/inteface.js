import React from "react";
import { saveItemConfigTime } from "./config";
import { minutesOfDay, stringIsNullOrEmpty } from "./helper";
import { IValidator } from "./validator";
export interface ITimeRange {
  id: Number;
  fromTime: String;
  toTime: String;
  maxPersion: Number;
  maxTransport: Number;
  delayTime?: Number;
  warningLevelLater?: Number;
}

export interface IStage<T> {
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
}

export default null;