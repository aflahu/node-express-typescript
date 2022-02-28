import * as bull from "bull";

import Locals from "./Locals";

class Bull {
  public queue: any;

  constructor(_name: string) {
    this.queue = new bull(_name, {
      redis: {
        port: Locals.config().redisHttpPort,
        host: Locals.config().redisHttpHost,
      },
    });
  }
  public dispatch(
    _jobName: string,
    _args: object,
    _callback: Function,
    _ops: object
  ): void {
    // https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueadd
    const job = this.queue.add(_jobName, _args, _ops);

    // https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueprocess
    this.queue.process(_jobName, _callback);
  }
}

export default Bull;
