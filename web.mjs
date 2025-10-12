// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getGreeting } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };


let currentMonth = dayjs().month(); // 0-11
let currentYear = dayjs().year();
document.addEventListener("DOMContentLoaded", () => {
const calendarTitle = document.getElementById("calendar-title");
const calendarGrid = document.getElementById("calendar-grid");
const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("next-month");
const monthSelect = document.getElementById("month-select");
const yearSelect = document.getElementById("year-select");
const jumpBtn = document.getElementById("jump-button");

const monthNames = [
    "January","February","March","April","May","June",
  "July","August","September","October","November","December"
]
//populating the select dropdown 
monthNames.forEach((name, index) => {
  const option = document.createElement("option");
  option.value = index;     // 0 → January, 11 → December
  option.textContent = name;
  monthSelect.appendChild(option);
})
// Populate year select
    for(let year=1900; year<=2050; year++){
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }

console.log("Month and year selects populated!");
});
