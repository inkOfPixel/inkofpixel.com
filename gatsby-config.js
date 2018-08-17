module.exports = {
  siteMetadata: {
    title: "inkOfPixel"
  },
  plugins: [
    "gatsby-plugin-react-next",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-netlify-cms",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/assets`,
        name: "assets"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/_site/pages`,
        name: "pages"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/_site/projects`,
        name: "projects"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/_site/home-page`,
        name: "home-page"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/_site/static-pages`,
        name: "static-pages"
      }
    },
    "gatsby-transformer-json",
    "gatsby-plugin-netlify-cms-paths",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-plugin-netlify-cms-paths",
          {
            resolve: "gatsby-remark-images",
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2400,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-28251380-1",
        // Puts tracking script in the head instead of the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: ["/preview/**", "/do-not-track/me/too/"]
      }
    },
    "gatsby-plugin-netlify"
  ],
  pathPrefix: "/assets"
};
