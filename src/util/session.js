import { string } from 'yargs';
import {ITimeRange} from './inteface';

const SessionType = {
    ConfigTime : "_configTime"
}

export function saveConfigTime(lstTime : ITimeRange[])
{
    sessionStorage.setItem( SessionType.ConfigTime, JSON.stringify(lstTime))
}

export function getConfigTime() : ITimeRange[]
{
    var jsonConfig = sessionStorage.getItem(SessionType.ConfigTime);
    if( jsonConfig != null && jsonConfig.length)
    {
        let times : ITimeRange[] = JSON.parse(jsonConfig);
        return times;
    }
    return null;
}
export function removeSessionItem(itemName: string)
{
    sessionStorage.removeItem(itemName);
}
export function resetSession(){
    sessionStorage.clear();
}