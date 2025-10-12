// This is a placeholder file which shows how you can define functions which can be used from both a browser script and a node script. You can delete the contents of the file once you have understood how it works.

export function getGreeting() {
    return "Hello";
}

//Calculate exact day of the event based on the occurrence and dayname
export function getEventDate(event, year, month) {
  //Map occurrence to number
  const occurrenceMap = {
    first: 0,
    second: 1,
    third: 2,
    fourth: 3,
    last: -1,
  };
  const targetDayName = event.dayName;
  const occurrenceIndex = occurrenceMap[event.occurrence];

  const daysInThisMonth = dayjs().year(year).month(month).daysInMonth();
  const matchingDays = []; //array of  exact date of dayname

  //compare all days of the month with event's dayname
  for (let d = 1; d <= daysInThisMonth; d++) {
    const date = dayjs().year(year).month(month).day(d);
    const dayName = date.format("dddd"); // like Monday,Tuesday,...
    if (targetDayName === dayName) {
      matchingDays.push(d);
    }

    //if occurrence is last return last item of array
    if (occurrenceIndex === -1) {
      return matchingDays[matchingDays.length - 1];
    }

    return matchingDays[occurrenceIndex];
  }
}
