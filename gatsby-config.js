module.exports = {
  siteMetadata: {
    title: "Retelit CDA Campaign"
  },
  plugins: [
    "gatsby-plugin-react-next",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-netlify-cms",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/_site/pages`,
        name: "pages"
      }
    },
    "gatsby-transformer-remark",
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-117532371-1",
        // Puts tracking script in the head instead of the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: ["/preview/**", "/do-not-track/me/too/"]
      }
    }
  ],
  pathPrefix: "/assets"
};
