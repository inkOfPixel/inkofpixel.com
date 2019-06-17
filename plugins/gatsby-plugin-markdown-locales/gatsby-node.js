const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, getNode, actions }, options) => {
  const { defaultLocale = "en", name, getPath = defaultGetPath } = options;
  const { createNodeField } = actions;
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

exports.createPages = ({ graphql, actions }, options) => {
  const { defaultLocale = "en", name } = options;
  const { createPage } = actions;
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
                  published
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
        console.log(node);
        console.log(node.fields.frontmatter);
        const { template, published, locales } = node.fields.frontmatter;
        if ((template === "project" && published) || template !== "project") {
          locales.forEach(locale => {
            createPage({
              path: locale.path,
              component: path.resolve(`./src/templates/${template}.tsx`),
              context: {
                slug: node.fields.slug,
                locale: locale.language
              }
            });
          });
        }
      });
      resolve();
    });
  });
};
