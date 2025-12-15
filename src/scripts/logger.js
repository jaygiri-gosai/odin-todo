const logger = {
  error(msg, error) {
    console.error(msg, error);
  },
  info(msg) {
    console.info(msg);
  },
  warning(msg) {
    console.warn(msg);
  },
};
export default logger;
