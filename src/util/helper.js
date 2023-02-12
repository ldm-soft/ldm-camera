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

export default stringIsNullOrEmpty;