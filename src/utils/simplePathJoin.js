// @flow

export default (...args): string => {
  const [first, ...others] = args;
  const prefix = /^\/*/;
  const suffix = /\/*$/;
  const components = others
    .map(component =>
      component
        .trim()
        .replace(prefix, "")
        .replace(suffix, "")
    )
    .filter(component => component.length > 0);
  return (
    first
      .trim()
      .replace(prefix, "")
      .replace(suffix, "") +
    "/" +
    components.join("/")
  );
};
