export function stringIsNullOrEmpty(value): Boolean {
  return !value || value == undefined || value == "" || value.length == 0;
}

export function convertTimeStringToMinutes(time: String): Number
{
  const currentDate = new Date();
  const d = new Date(`${(new Date()).toDateString()} ${time}`)
  return d.getMinutes() + d.getHours() * 60; 
}

export function minutesOfDay(m: Date): Number {
  return m.getMinutes() + m.getHours() * 60;
};
//  String.isNullOrEmpty = function (value) {
//     return (!value || value == undefined || value == "" || value.length == 0);
// }
String.prototype.padLeft = function (paddingValue) {
  return String(paddingValue + this).slice(-paddingValue.length);
};

export const buildFileNameWithTime = (first: string ='IMG' ,ext: String ='jpg'): String => {
  let d = new Date();
  let dformat =`${d.getFullYear().toString().padLeft('0000')}${(d.getMonth() + 1).toString().padLeft('00')}${(d.getDate()).toString().padLeft('00')}_${(d.getHours()).toString().padLeft('00')}h${(d.getMinutes()).toString().padLeft('00')}${(d.getSeconds()).toString().padLeft('00')}`;
  return `${first}_${dformat}.${ext}` ;
}

export default stringIsNullOrEmpty;