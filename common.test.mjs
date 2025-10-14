import { getGreeting, getEventDate } from "./common.mjs";
//import assert from "node:assert";
//import test from "node:test";
import dayjs from "dayjs";


test("should return the correct day for first Tuesday of October 2025", () => {
  const event = { dayName: "Tuesday", occurrence: "first" };
  const result = getEventDate(event, 2025, 9);
  const expected = 7; // 1 Oct 2025 is Wednesday → first Tuesday is 7 Oct
   expect(result).toBe(expected);
});

test("should return the correct day for second Tuesday of October 2025", () => {
  const event = { dayName: "Tuesday", occurrence: "second" };
  const result = getEventDate(event, 2025, 9);
  const expected = 14; // second Tuesday
   expect(result).toBe(expected);
});

test("should return the correct day for last Saturday of May 2025", () => {
  const event = { dayName: "Saturday", occurrence: "last" };
  const result = getEventDate(event, 2025, 4);
  const expected = 31; // last Saturday of May
   expect(result).toBe(expected);
});

test("should return undefined if no matching day exists", () => {
  const event = { dayName: "InvalidDay", occurrence: "first" };
  const result = getEventDate(event, 2025, 0);
  expect(result).toBe(undefined);
});