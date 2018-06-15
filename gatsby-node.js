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
  plugins: babelrc.plugins.concat(["babel-plugin-styled-components"])
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
  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const slug = createFilePath({ node, getNode });
    createNodeField({ node, name: "slug", value: slug });
    createNodeField({
      node,
      name: "collection",
      value: fileNode.sourceInstanceName
    });
    createNodeField({
      node,
      name: "path",
      value:
        fileNode.sourceInstanceName === "pages"
          ? slug
          : `/${fileNode.sourceInstanceName}${slug}`
    });
  }
  const parent = getNode(node.parent);
  if (parent && parent.internal.mediaType === "application/json") {
    const name = parent.name;
    createNodeField({ node, name: "name", value: name });
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
                path
              }
              frontmatter {
                template
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        const { template } = node.frontmatter;
        createPage({
          path: node.fields.path,
          component: path.resolve(`./src/templates/${template}.js`),
          context: {
            slug: node.fields.slug
          }
        });
      });
      resolve();
    });
  });
};

exports.setFieldsOnGraphQLNodeType = ({
  boundActionCreators,
  getNodes,
  getNode
}) => {
  const { createNodeField } = boundActionCreators;

  const projectsSection = getNodes().find(node => {
    return (
      node.internal.type === "HomePageJson" && node.fields.name === "projects"
    );
  });

  if (projectsSection) {
    if (Array.isArray(projectsSection.featuredProjects)) {
      const featuredProjectsTitles = projectsSection.featuredProjects.map(
        project => project.project
      );
      const featuredProjectsMarkdownNodes = getNodes().filter(
        markdownNode =>
          markdownNode.internal.type === "MarkdownRemark" &&
          markdownNode.fields.collection === "projects" &&
          featuredProjectsTitles.includes(markdownNode.frontmatter.title)
      );
      createNodeField({
        node: projectsSection,
        name: "featuredProjects",
        value: featuredProjectsMarkdownNodes
      });
    }
  }
};
