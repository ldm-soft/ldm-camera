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
export interface IStageValueField<TValue,TField> {
  valueItem: IStage<TValue>;
  fieldItem: IStage<TField>;
}
export interface IConfigAudio {
  audioPersonA : IStageValueField<any, String>,
  audioTransportA : IStageValueField<any, String>,
  audioPersonTransportA : IStageValueField<any, String>,
  audioPersonB : IStageValueField<any, String>,
  audioTransportB : IStageValueField<any, String>,
  audioPersonTransportB : IStageValueField<any, String>,
  timeDelay: IStage<Number>;
  countMax: IStage<Number>;
}

export interface IConfigModel{
  audio:{
    persionA: String;
    transportA: String;
    persionTransportA: String;
    persionB: String;
    transportB: String;
    persionTransportB: String;
  };
  timeDelay: Number;
  countMax: Number;
  warningMax: Number;
}

export interface IConfigIMGProps{
  warningMax: IStage<Number>;
  pathSave: IStage<String>;
}

export interface IConfig {
  fromTime: IStage<String>;
  toTime: IStage<String>;
  isCustom: IStage<Boolean>;
  isDefault: IStage<Boolean>;
  showListTime: IStage<Boolean>;
}

export default null;