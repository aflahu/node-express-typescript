import faker from "@faker-js/faker";
import BirthDayMessage from "../../jobs/birthDayMessage";
import UserModel from "../../models/User";
import * as _ from "lodash";

class User {
  public static create(req, res, next): any {
    req.assert("firstName", "firstName cannot blank").notEmpty();
    req.assert("lastName", "lastName cannot blank").notEmpty();
    req.assert("birthdayDate", "birthdayDate cannot blank").notEmpty();
    req.assert("location", "location cannot blank").notEmpty();

    const errors = req.validationErrors();
    if (errors) {
      return res.json({
        error: errors,
      });
    }

    const user = new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthdayDate: req.body.birthdayDate,
      location: req.body.location,
      email: faker.internet.email(),
    });
    user.save((err, doc) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      new BirthDayMessage(doc._id);

      return res.json({
        message: ["You have been successfully create a user"],
      });
    });
  }

  public static update(req, res, next): any {
    const { firstName, lastName, location, birthdayDate } = req.body;
    // console.log({ firstName, lastName, location, birthdayDate });
    const body = _.pick(req.body, [
      "firstName",
      "lastName",
      "location",
      "birthdayDate",
    ]);
    UserModel.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: body },
      (err) => {
        if (err) {
          return res.json({
            error: err,
          });
        }

        return res.json({
          message: [`You have been successfully update a user`],
        });
      }
    );
  }

  public static delete(req, res, next): any {
    const user = UserModel.find(req.params.userId);
    UserModel.deleteOne({ _id: req.params.userId }, (err) => {
      if (err) {
        return res.json({
          error: err,
        });
      }

      return res.json({
        message: [`You have been successfully delete a user`],
      });
    });
  }

  public static async sendDelayedMessage(req, res, next): Promise<any> {
    await req.assert("delayInDay", "delayInDay cannot blank").notEmpty();

    const errors = req.validationErrors();
    if (errors) {
      return res.json({
        error: errors,
      });
    }

    const users = await UserModel.find({});
    users.forEach((user) => {
      new BirthDayMessage(user._id, req.body.delayInDay);
    });

    return res.json({
      message: [`You have been successfully add birthday message queues`],
    });
  }
}

export default User;
