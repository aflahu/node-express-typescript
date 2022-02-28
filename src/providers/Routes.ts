/**
 * Define all your routes
 *
 * @author Faiz A. Farooqui <faiz@geekyants.com>
 */

import { Application } from "express";
import { BullMonitorExpress } from "@bull-monitor/express";
import { BullAdapter } from "@bull-monitor/root/dist/bull-adapter";

import Locals from "./Locals";
import Log from "../middlewares/Log";
import Bull from '../providers/Bull'

import webRouter from "./../routes/Web";
import apiRouter from "./../routes/Api";

class Routes {
  public mountWeb(_express: Application): Application {
    Log.info("Routes :: Mounting Web Routes...");

    return _express.use("/", webRouter);
  }

  public mountApi(_express: Application): Application {
    const apiPrefix = Locals.config().apiPrefix;
    Log.info("Routes :: Mounting API Routes...");

    return _express.use(`/${apiPrefix}`, apiRouter);
  }

  public async mountBullMonitor(_express: Application): Promise<Application> {
    const monitor: any = new BullMonitorExpress({
      queues: [new BullAdapter(new Bull("birthDayMessage").queue)],
    });
    await monitor.init();
    return _express.use("/bullmonitor", monitor.router);
  }
}

export default new Routes();
