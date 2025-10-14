


//This code sets up the dayjs variable to work in both environments: 
// it dynamically imports dayjs in Node.js and uses window.dayjs in the browser. 
// This lets your shared functions run seamlessly in both Node and web without changing imports.


let dayjs;
if(typeof window === "undefined"){ //node.js has no window object so undefined means running in node.
  const dayjsImport = await import("dayjs"); //loads the dayjs library from your Node modules at runtime
  dayjs = dayjsImport.default;
} else {
  // Running in browser (e.g. web.mjs)
  dayjs = window.dayjs;
}

export function getGreeting() {
    return "Hello";
}

//Calculate exact day of the event based on the occurrence and dayname

export function getEventDate(event, year, month) { //event from days.json, year as per user selection, month in which event occurred
 
  //Map occurrence to number so JS can easily pick it from the array.
  const occurrenceMap = {
    first: 0,
    second: 1,
    third: 2,
    fourth: 3,
    last: -1
  };
  const targetDayName = event.dayName; //e.g targetDayName becomes something like "Tuesday" and occurrence index becomes 1.
  const occurrenceIndex = occurrenceMap[event.occurrence];//tell us e.g second tuesday of the month.

  const daysInThisMonth = dayjs().year(year).month(month).daysInMonth(); //daysInThisMonth tells us how many days to loop over by taking the year and months passed into the function- selected by user in our calender
  const matchingDays = []; //array of  exact dates of desired weekday

  //compare all days of the month with event's dayname
  for (let d = 1; d <= daysInThisMonth; d++) {
    const date = dayjs().year(year).month(month).date(d); //Calling dayjs() alone creates a date for today. passing year , month and date(d) sets it to the date we want.
    const dayName = date.format("dddd"); // gives day of the week for the date
    if (targetDayName === dayName) {
      matchingDays.push(d);
    }
  }
  //if occurrence is last return last item of array
  if (occurrenceIndex === -1) {           //last 
    return matchingDays[matchingDays.length - 1]; //last elem in the array
  }

  return matchingDays[occurrenceIndex] ;
}
