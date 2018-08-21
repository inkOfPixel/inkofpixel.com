const getConfig = require("./get-config");
const makeRelative = require("./make-relative");
const isPlainObject = require("lodash/isPlainObject");

exports.onCreateNode = async ({ node }, options) => {
  const cmsOptions = await getConfig(options);
  if (node.internal.type === "MarkdownRemark") {
    node.frontmatter = parse(node.frontmatter, node, cmsOptions);
  }
};

const parse = (obj, node, options) => {
  if (typeof obj === "string") {
    return makeRelative(node.fileAbsolutePath, obj, options);
  }
  if (Array.isArray(obj)) {
    return obj.map(item => parse(item, node, options));
  }
  if (isPlainObject(obj)) {
    const objCopy = { ...obj };
    for (let i in objCopy) {
      if (!["_PARENT", "parent"].includes(i)) {
        objCopy[i] = parse(objCopy[i], node, options);
      }
    }
    return objCopy;
  }
  return obj;
};
