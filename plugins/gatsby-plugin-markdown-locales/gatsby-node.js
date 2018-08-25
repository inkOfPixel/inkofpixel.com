const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, getNode, boundActionCreators }, options) => {
  const { defaultLocale = "en", name, getPath = defaultGetPath } = options;
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    if (name === undefined || fileNode.sourceInstanceName === name) {
      const slug = createFilePath({ node, getNode });
      createNodeField({ node, name: "slug", value: slug });
      createNodeField({
        node,
        name: "collection",
        value: fileNode.sourceInstanceName
      });
      createNodeField({
        node,
        name: "frontmatter",
        value: {
          ...node.frontmatter,
          locales: node.frontmatter.locales.map(locale => ({
            ...locale,
            path: getPath({
              node,
              locale: locale.language,
              defaultLocale,
              slug
            })
          }))
        }
      });
    }
  }
};

const defaultGetPath = ({ node, locale, defaultLocale, slug }) =>
  locale === defaultLocale
    ? path.join("/", slug)
    : path.join("/", locale, slug);

exports.createPages = ({ graphql, boundActionCreators }, options) => {
  const { defaultLocale = "en", name } = options;
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark${
          typeof name === "string"
            ? `(
          filter: { fields: { collection: { eq: "${name}" } } }
        )`
            : ""
        } {
          edges {
            node {
              fields {
                slug
                frontmatter {
                  template
                  locales {
                    language
                    path
                  }
                }
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        const { template, locales } = node.fields.frontmatter;
        locales.forEach(locale => {
          createPage({
            path: locale.path,
            component: path.resolve(`./src/templates/${template}.js`),
            context: {
              slug: node.fields.slug,
              locale: locale.language
            }
          });
        });
      });
      resolve();
    });
  });
};
