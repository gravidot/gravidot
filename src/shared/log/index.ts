import log from "loglevel";

const logLevel =
  process.env.NEXT_PUBLIC_NODE_ENV === "production" ? "silent" : "debug";

log.setLevel(logLevel);

export default log;
