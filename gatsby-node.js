/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path");
const chalk = require("chalk");
const generalSettings = require("./_site/settings/general.json");

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    }
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  const parent = getNode(node.parent);
  if (node.internal.type === "StaticPagesJson" && node.template) {
    createNodeField({
      node,
      name: "locales",
      value: node.locales.map(locale => ({
        ...locale,
        path:
          locale.language === generalSettings.defaultLanguage
            ? path.join("/", typeof locale.path === "string" ? locale.path : "")
            : path.join(
                "/",
                locale.language,
                typeof locale.path === "string" ? locale.path : ""
              )
      }))
    });
  }
  if (parent && parent.internal.mediaType === "application/json") {
    const name = parent.name;
    createNodeField({ node, name: "name", value: name });
  }
};

exports.createPages = context => {
  return Promise.all([createStaticPages(context)]);
};

function createStaticPages({ graphql, actions }) {
  const { createPage } = actions;
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
                locales {
                  language
                  path
                }
              }
            }
          }
        }
      }
    `).then(result => {
      const { allStaticPagesJson, settingsJson } = result.data;
      const defaultLocale = settingsJson.defaultLanguage;
      allStaticPagesJson.edges.forEach(({ node }) => {
        const {
          template,
          fields: { locales }
        } = node;
        if (locales) {
          locales.forEach(locale => {
            createPage({
              path: locale.path,
              component: path.resolve(`./src/templates/${template}.tsx`),
              context: {
                name: node.fields.name,
                locale: locale.language
              }
            });
          });
        } else {
          console.warn(
            chalk.yellow(
              `Warning: locales are missing on StaticPage with id ${node.id}`
            )
          );
        }
      });
      resolve();
    });
  });
}

exports.setFieldsOnGraphQLNodeType = ({ actions, getNodes, getNode }) => {
  const { createNodeField } = actions;

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
