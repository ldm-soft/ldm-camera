import {IConfigAudio, IConfigModel, ITimeRange} from "./inteface";
export function MapToConfigModel(audio: IConfigAudio, timeRanges: ITimeRange[]) : IConfigModel
{
    return {
        audio:{
            persionA: audio.audioPersonA.valueItem.value,
            transportA: audio.audioTransportA.valueItem.value,
            persionTransportA: audio.audioPersonTransportA.valueItem.value,
            persionB: audio.audioPersonB.valueItem.value,
            transportB: audio.audioTransportB.valueItem.value,
            persionTransportB: audio.audioPersonTransportB.valueItem.value,
        },
        countMax: audio.countMax.value,
        timeDelay:  audio.timeDelay.value,
        listTime: timeRanges,
    }
}
