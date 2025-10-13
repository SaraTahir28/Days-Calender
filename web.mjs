
import { getEventDate, getGreeting } from "./common.mjs";
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
  ];

  // Populate month select
  monthNames.forEach((name, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = name;
    monthSelect.appendChild(option);
  });
  monthSelect.value=currentMonth;

  // Populate year select
  for (let year = 1900; year <= 2050; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  }
  yearSelect.value=currentYear;

  console.log("Month and year selects populated!");

  //  renderCalendar function
  function renderCalendar(month, year) {
    calendarGrid.innerHTML = ""; // Clear previous calendar

    // Update title (e.g., “October 2025”)
    calendarTitle.textContent = `${monthNames[month]} ${year}`;

    // Weekday headers (Mon → Sun)
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const headerRow = document.createElement("div");
    headerRow.setAttribute("role", "row");

    weekdays.forEach(day => {
      const cell = document.createElement("div");
      cell.setAttribute("role", "columnheader");
      cell.textContent = day;
      headerRow.appendChild(cell);
    });
    calendarGrid.appendChild(headerRow);

    // First day & number of days in month
    const firstDay = dayjs().year(year).month(month).date(1); //First day gives you both the day and date of the week.

    let weekday = firstDay.day(); // 0=Sun,6=Sat-day() tell you which day of the week to place your day on calender cell.

    let adjustedWeekday = (weekday === 0) ? 6 : weekday - 1; // 0=Mon ... 6=Sun
    const daysInMonth = firstDay.daysInMonth(); //how many days in this month -> firstday has given us.


    // Total cells before first day (padding)
    let dayCounter = 1;  //Tracks which day number we’re placing in the grid.


    // Build rows (weeks)
    while (dayCounter <= daysInMonth) {//The loop continues as long as we still have days left to place in the calendar

      const weekRow = document.createElement("div"); //Each loop cycle creates a new “week” row.(Each week can hold up to 7 day cells (Mon → Sun).)
      weekRow.setAttribute("role", "row");

      for (let i = 0; i < 7; i++) { //The inner for loop makes 7 cells per row.
        const cell = document.createElement("div");
        cell.setAttribute("role", "cell");

        // Fill blanks before 1st day
        if ((calendarGrid.children.length === 1 && i < adjustedWeekday) || dayCounter > daysInMonth) { //calendarGrid.children.length===1 is first weekrow
          cell.textContent = "";
        } else {
          cell.textContent = dayCounter;
          cell.setAttribute('data-day', dayCounter); //setting attribute for better styling later
          const today = dayjs();
          if (year === today.year() && month === today.month() && dayCounter === today.date()) {
             cell.classList.add('today');  }
          dayCounter++; //Increment dayCounter by one so the next cell gets the next day’s number.
        }

        weekRow.appendChild(cell);
      }

      calendarGrid.appendChild(weekRow);
    }

    console.log(`Rendered ${monthNames[month]} ${year} (${daysInMonth} days, starts on ${firstDay.format("dddd")})`);
  }

  function renderEventsForMonth(month,year){
     const currentMonthName = monthNames[month]; //month is the index which gets converted to a month name

    // Filter all events that occur in this month
     const eventsThisMonth = daysData.filter(e => e.monthName===currentMonthName); //gives us an array of events in the month

    // Loop through each event and render it in the calendar
     eventsThisMonth.forEach(event => {
    // Calculate the exact day number of the event in the current month/year
     const eventDay = getEventDate(event,year,month); //returns a number for the day.(date for e.g second tuesday)
    
    // Only proceed if a valid day was returned
     if(eventDay!=null){
      // Find the corresponding cell in the calendar using the data-day attribute
      
      const cell=calendarGrid.querySelector(`div[role="cell"][data-day="${eventDay}"]`);
      // If the cell exists, create a new div to display the event

      if(cell){
        const eventEl=document.createElement("div");
        eventEl.classList.add("special-day");// Add CSS class for styling
        eventEl.textContent=event.name;
       cell.appendChild(eventEl);// Append the event to the cell
      }else{
        console.warn(`Cell for day ${eventDay} not found!`);
      }
     }
     });

  }

  // Initial render
  renderCalendar(currentMonth, currentYear);
  renderEventsForMonth(currentMonth, currentYear);

  // Add click event listeners for "Previous" and "Next" buttons
  // to navigate the calendar month by month.
  prevBtn.addEventListener("click",()=>{
    currentMonth--;
    if (currentMonth<0){
      currentMonth=11; //wrap up to december of previous year
      currentYear--; // subtract a year
    }
    renderCalendar(currentMonth,currentYear);
    renderEventsForMonth(currentMonth, currentYear);
    monthSelect.value=currentMonth;
    yearSelect.value=currentYear;
  }
  );

  nextBtn.addEventListener("click",()=>{
    currentMonth++;
    if(currentMonth>11){ //move to Jan of next year
      currentMonth=0;
      currentYear++;// increment by a year
    }
    renderCalendar(currentMonth,currentYear);
    renderEventsForMonth(currentMonth, currentYear);
    monthSelect.value=currentMonth;
    yearSelect.value=currentYear;
  })
  
  //Jump to Specific Month & Year
  jumpBtn.addEventListener("click",()=>{
    currentMonth=monthSelect.value;
    currentYear=yearSelect.value;
    renderCalendar(currentMonth,currentYear);
    renderEventsForMonth(currentMonth, currentYear);
  })
});