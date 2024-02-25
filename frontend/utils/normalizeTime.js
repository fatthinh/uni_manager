import moment from "moment";

function normalizeTime(timeObject) {
  const { seconds, nanoseconds } = timeObject;

  const milliseconds = seconds * 1000 + nanoseconds / 1000000;
  const momentTime = moment.utc(milliseconds);

  return momentTime.fromNow();
}

export { normalizeTime };
