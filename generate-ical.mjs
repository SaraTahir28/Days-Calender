// This is a placeholder file which shows how you can access functions and data defined in other files. You can delete the contents of the file once you have understood how it works.
// It can be run with `node`.

import { getGreeting,getEventDate } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };
import dayjs from "dayjs";
import fs from "fs"; //Node’s file system (fs) to write the .ics file
import { createEvents } from "ics";

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

 function generateICalendar(){
    const events = [];
    for (let year = 2020; year <= 2030; year++) {
    for (const event of daysData) {
      const monthIndex = monthNames.indexOf(event.monthName); //  "October" 9 or "May  4"
      const eventDay = getEventDate(event, year, monthIndex); // shared logic from our common.mjs file 

       //do we have any event in this month based on the JSON file?” before trying to add it to the .ics file.
      if (eventDay) {                
        events.push({   //Adds a new event object to the events array
          start: [year, monthIndex + 1, eventDay], // year, ics expect months to start at 1 , day
          title: event.name,
          description: event.description || "Special commemorative day",
        });
      }
    }
}
  // Generate ICS content using library
  createEvents(events, (error, value) => { //createEvents function from the ics library. Takes a callback(if there is any error), value(the generated ICS content as a string).
    if (error) {
      console.error("Error creating events:", error);
      return;
    }

    // Write the file
    fs.writeFileSync("days.ics", value); //if no errors. write value to days.ics file.
    console.log(" days.ics file created successfully!");
  });

}
generateICalendar();

   

    
