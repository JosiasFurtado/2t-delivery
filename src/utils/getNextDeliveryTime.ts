//  import moment from "moment";
// import { useMemo } from "react";
import { Window } from "types/app";

export function getNextDeliveryTime(windows: Window[]) {
//  moment.locale('en')
//  const today = moment()
//  const tomorrow = moment().add(1, 'days')
//  const todayWeekDay = today.format('dddd').toLowerCase()


 // const todayDeliveryTimesArr = windows.filter(item => item.weekDay === todayWeekDay)
 
 // const todayCompareHour = todayDeliveryTimesArr.filter(item => today.isBefore(`${today.format().slice(0, 11)}${item.startsAt}`, "hour"))


 // const tomorrowWeekDay = tomorrow.format('dddd').toLowerCase()
 // const tomorrowDeliveryTimesArr = useMemo(
 //   () => windows.filter(item => item.weekDay === tomorrowWeekDay).sort(),
 //   [tomorrowWeekDay, windows],
 // )

 // console.warn("today weekday", todayWeekDay)
  const result = "Faz entregas" // todayCompareHour[0] ? `Hoje, ${todayCompareHour[0].startsAt.slice(0, 5)} hrs` : `Amanhã, ${tomorrowDeliveryTimesArr[0].startsAt.slice(0, 5)} hrs`
  return result
}