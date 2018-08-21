const { relative, dirname } = require("path");

const cwd = process.cwd();

module.exports = (markdownPath, imagePath, options) => {
  const { mediaPath, publicPath } = options;
  if (
    typeof imagePath !== `string` ||
    imagePath.indexOf(`${publicPath}/`) !== 0
  ) {
    return imagePath;
  }
  markdownPath = dirname(markdownPath).replace(`${cwd}/`, ``);
  imagePath = imagePath.replace(publicPath, mediaPath);
  const newPath = relative(markdownPath, imagePath);
  return newPath;
};
