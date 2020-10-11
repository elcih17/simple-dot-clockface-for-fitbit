import { me } from "appbit";
import { HeartRateSensor } from "heart-rate";
import { BodyPresenceSensor } from "body-presence";
import { display } from "display";

import { FitFont } from "fitfont";

const hrHeart = new FitFont({
  id: "hr-heart",
  font: "PixelMplus10_40",
});
const hr = new FitFont({
  id: "hr",
  font: "PixelMplus10_40",
});

export class HeartRate {
  constructor() {
    if (HeartRateSensor && me.permissions.granted("access_heart_rate")) {
      this.hrm = new HeartRateSensor({ frequency: 1 });
      this.hrm.addEventListener("reading", () => {
        hr.text = this.hrm.heartRate;
      });
    }
  }

  start() {
    if (this.hrm) {
      hrHeart.text = "♡";
      this.hrm.start();
    }
  }

  stop() {
    if (this.hrm) {
      hrHeart.text = "";
      hr.text = "";
      this.hrm.stop();
    }
  }
}
