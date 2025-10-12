
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

  // ✅ Correct renderCalendar function
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
    const firstDay = dayjs().year(year).month(month).date(1);
    let weekday = firstDay.day(); // 0=Sun ... 6=Sat
    let adjustedWeekday = (weekday === 0) ? 6 : weekday - 1; // 0=Mon ... 6=Sun
    const daysInMonth = firstDay.daysInMonth();

    // Total cells before first day (padding)
    let dayCounter = 1;

    // Build rows (weeks)
    while (dayCounter <= daysInMonth) {
      const weekRow = document.createElement("div");
      weekRow.setAttribute("role", "row");

      for (let i = 0; i < 7; i++) {
        const cell = document.createElement("div");
        cell.setAttribute("role", "cell");

        // Fill blanks before 1st day
        if ((calendarGrid.children.length === 1 && i < adjustedWeekday) || dayCounter > daysInMonth) {
          cell.textContent = "";
        } else {
          cell.textContent = dayCounter;
          dayCounter++;
        }

        weekRow.appendChild(cell);
      }

      calendarGrid.appendChild(weekRow);
    }

    console.log(`Rendered ${monthNames[month]} ${year} (${daysInMonth} days, starts on ${firstDay.format("dddd")})`);
  }

  // Initial render
  renderCalendar(currentMonth, currentYear);
});