import stringIsNullOrEmpty, { convertTimeStringToMinutes } from "./helper";
import { ITimeRange } from "./inteface";
import { getConfigTime, saveConfigTime } from "./session";
import { format } from "react-string-format";
export function deleteItemConfigTime(itemSave: ITimeRange) {
  let timeRanges: ITimeRange[] = getConfigTime();
  if (timeRanges != null) {
    const indexTime = timeRanges.findIndex(
      (item) => item.id != null && item.id === itemSave.id
    );
    if (indexTime != -1) {
      timeRanges.splice(indexTime, 1);
    } else {
      
    }
  } else {
    timeRanges = [itemSave];
  }
  saveConfigTime(timeRanges);
}
export function saveItemConfigTime(itemSave: ITimeRange) {
  let timeRanges: ITimeRange[] = getConfigTime();
  if (timeRanges != null) {
    const indexTime = timeRanges.findIndex(
      (item) => item.id != null && item.id === itemSave.id
    );
    if (indexTime != -1) {
      const newTimeRanges = timeRanges.map((obj) => {
        if (obj.id === itemSave.id) {
          return itemSave;
        }
        return obj;
      });
      //
      timeRanges = newTimeRanges;
    } else {
      timeRanges.push(itemSave);
    }
  } else {
    timeRanges = [itemSave];
  }
  saveConfigTime(timeRanges);
}

export function buildConfigTimeId(): Number {
  let timeRanges: ITimeRange[] = getConfigTime();
  let id: Number =
    timeRanges != null
      ? Math.max(
          ...timeRanges.filter((item) => item.id != null).map((item) => item.id)
        )
      : 0;
  return id != NaN && isFinite(id) ? id + 1 : 0;
}
export const ValidatorType = {
  New :"N",
  Update :"U",
};
export function ValidatorTimeRange(item: ITimeRange, type: ValidatorType): IValidator[] {
  let error: IValidator[] = [];
  let emptyValue = "{0} chưa được nhập";
  let inValidData = "{0} không hợp lệ";
  let existsItem = "Khung giờ {0} ~ {1} đã tồn tại thiết lập!";
  let errorFromTo = "Khung giờ không hợp lệ {0} --> {1}!";
  if (item.id === undefined || item.id < 0) {
    error.push({ error: true, errorText: "ID chưa được tạo!" });
  }
  if (stringIsNullOrEmpty(item.fromTime) || stringIsNullOrEmpty(item.toTime)) {
    error.push({
      error: true,
      errorText: format(
        emptyValue,
        `Khung giờ ${
          stringIsNullOrEmpty(item.fromTime) ? "[BẮT ĐẦU]" : "[KẾT THÚC]"
        }`
      ),
    });
  } else {
    if (
      convertTimeStringToMinutes(item.fromTime) >
      convertTimeStringToMinutes(item.toTime)
    ) {
      error.push({
        error: true,
        errorText: format(errorFromTo, item.fromTime, item.toTime),
      });
    }
    if (checkExistsTime(item)) {
      error.push({
        error: true,
        errorText: format(existsItem, item.fromTime, item.toTime),
      });
    }
  }
  if (item.maxPersion <= 0) {
    error.push({
      error: true,
      errorText: format(inValidData, `Số người giới hạn`),
    });
  }
  if (item.maxTransport <= 0) {
    error.push({
      error: true,
      errorText: format(inValidData, `Số người phương tiện`),
    });
  }
  return error;
}
export function checkExistsTime(itemCheck: ITimeRange): Boolean {
  let timeRanges: ITimeRange[] = getConfigTime();
  const indexItem =
    timeRanges != null
      ? timeRanges.findIndex(
          (item) =>
            item.id !== itemCheck.id &&
            item.fromTime === itemCheck.fromTime &&
            item.toTime === itemCheck.toTime
        )
      : -1;
  return indexItem != -1;
}
