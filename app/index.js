import clock from "clock";
import { me } from "appbit";
import { preferences } from "user-settings";
import { display } from "display";
import { HeartRate } from "./heartrate";
import { zeroPad } from "../common/utils";

import { FitFont } from "fitfont";

const dayLabel = new FitFont({
  id: "dayLabel",
  font: "PixelMplus10_20",
});

const dateLabel = new FitFont({
  id: "dateLabel",
  font: "PixelMplus10_40",
});

const timeLabel = new FitFont({
  id: "timeLabel",
  font: "PixelMplus10_80",
});

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const getDay = (now) => {
  return days[now.getDay()];
};

const getDate = (now) => {
  const month = months[now.getMonth()];
  const date = now.getDate();
  return `${month}.${date}`;
};

const updateClock = () => {
  const now = new Date();
  dateLabel.text = getDate(now);
  dayLabel.text = getDay(now);

  let hours = now.getHours();
  if (preferences.clockDisplay === "12h") {
    hours = hours % 12 || 12;
  }
  const minutes = now.getMinutes();
  timeLabel.text = zeroPad(hours) + ":" + zeroPad(minutes);
};

const HR = new HeartRate();

if (display.aodAvailable && me.permissions.granted("access_aod")) {
  display.aodAllowed = true;

  display.addEventListener("change", () => {
    if (!display.aodActive && display.on) {
      clock.granularity = "seconds";
      if (HR) HR.start();
    } else {
      clock.granularity = "minutes";
      if (HR) HR.stop();
    }
  });
}

clock.granularity = "seconds";
clock.ontick = (evt) => {
  updateClock();
};

updateClock();
if (HR) HR.start();
