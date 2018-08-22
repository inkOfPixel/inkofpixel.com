/**
j* Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.modifyBabelrc = ({ babelrc }) => ({
  ...babelrc,
  presets: babelrc.presets.concat(["flow"]),
  plugins: babelrc.plugins.concat([
    "babel-plugin-styled-components",
    [
      "react-intl",
      {
        messagesDir: "./src/translations/extractedMessages/"
      }
    ]
  ])
});

exports.modifyWebpackConfig = ({ config, stage }) => {
  config.merge({
    resolve: {
      root: path.resolve(__dirname, "./src"),
      extensions: ["", ".js", ".jsx", ".json"]
    }
  });
  return config;
};

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  const parent = getNode(node.parent);
  if (parent && parent.internal.mediaType === "application/json") {
    const name = parent.name;
    createNodeField({ node, name: "name", value: name });
  }
};

exports.createPages = context => {
  return Promise.all([createStaticPages(context)]);
};

function createStaticPages({ graphql, boundActionCreators }) {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        settingsJson(fields: { name: { eq: "general" } }) {
          fields {
            name
          }
          defaultLanguage
        }
        allStaticPagesJson {
          edges {
            node {
              template
              fields {
                name
              }
              locales {
                language
                url
              }
            }
          }
        }
      }
    `).then(result => {
      const { allStaticPagesJson, settingsJson } = result.data;
      const defaultLocale = settingsJson.defaultLanguage;
      allStaticPagesJson.edges.forEach(({ node }) => {
        const { template, locales } = node;
        locales.forEach(locale => {
          createPage({
            path:
              locale.language === defaultLocale
                ? path.join("/", locale.url)
                : path.join("/", locale.language, locale.url),
            component: path.resolve(`./src/templates/${template}.js`),
            context: {
              name: node.fields.name,
              locale: locale.language
            }
          });
        });
      });
      resolve();
    });
  });
}

exports.setFieldsOnGraphQLNodeType = ({
  boundActionCreators,
  getNodes,
  getNode
}) => {
  const { createNodeField } = boundActionCreators;

  const homeNode = getNodes().find(node => {
    return (
      node.internal.type === "StaticPagesJson" && node.fields.name === "home"
    );
  });

  if (homeNode) {
    homeNode.locales.forEach(homeLocale => {
      if (Array.isArray(homeLocale.projects.featuredProjects)) {
        const featuredProjectsTitles = homeLocale.projects.featuredProjects.map(
          ({ project }) => project
        );
        const featuredProjectsMarkdownNodes = getNodes().filter(
          markdownNode =>
            markdownNode.internal.type === "MarkdownRemark" &&
            markdownNode.fields.collection === "projects" &&
            featuredProjectsTitles.includes(markdownNode.frontmatter.title)
        );
        createNodeField({
          node: homeNode,
          name: "featuredProjects",
          value: featuredProjectsMarkdownNodes
        });
      }
    });
  }
};
