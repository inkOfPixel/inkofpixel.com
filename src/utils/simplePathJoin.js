export default (...args) => {
  const prefix = /^\/+/;
  const suffix = /\/+$/;
  const origin = /(https:\/\/[^\/]+)(\/+)$/;
  const joinedPath = args
    .reduce((path, component) => {
      return `${path.trim().replace(suffix, "")}/${component
        .trim()
        .replace(prefix, "")}`;
    })
    .replace(origin, "$1");
  return joinedPath;
};
