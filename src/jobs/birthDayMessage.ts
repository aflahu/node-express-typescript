import Bull from "../providers/Bull";
import axios from "axios";

import User, { IUserModel } from "../models/User";
import Log from "../middlewares/Log";

class BirthDayMessage {
  private jobName: string = "birthDayMessage";
  private delayInDay: number = 0;
  constructor(_user_id: string, _delayInDay: number = 0) {
    this.delayInDay = _delayInDay;

    const bull = new Bull(this.jobName);
    bull.dispatch(this.jobName, { user_id: _user_id }, this.callback, {
      repeat: { cron: "0 9 * * *" },
    });
  }

  private async callback(_job: any, _done: Function): Promise<void> {
    const user: IUserModel = await User.findById(_job.data.user_id);
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const currentMonth = currentDate.getMonth();

    if (
      currentDay + this.delayInDay == user.birthdayDate.getDay() &&
      currentMonth == user.birthdayDate.getMonth()
    ) {
      await axios.post("https://hookb.in/r10GPwdoVeHqk2XXB7Qk", {
        text: `Hey, ${user.fullName()} it's your bithday`,
      });
    }
    _done();
  }
}
export default BirthDayMessage;
