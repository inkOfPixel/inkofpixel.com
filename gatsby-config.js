const path = require("path");
const generalSettings = require("./_site/settings/general.json");

module.exports = {
  siteMetadata: {
    title: "inkOfPixel",
    origin: "https://inkofpixel.com",
    siteUrl: "https://inkofpixel.com"
  },

  plugins: [
    "gatsby-plugin-sitemap",
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "inkOfPixel",
        short_name: "iop",
        start_url: "/",
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "src/images/favicon.png" // This path is relative to the root of the site.
      }
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-typescript",
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
        path: `${__dirname}/_site/settings`,
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
    "gatsby-plugin-netlify-markdown-paths",
    {
      resolve: "gatsby-plugin-markdown-locales",
      options: {
        name: "projects",
        defaultLocale: generalSettings.defaultLanguage,
        getPath: ({ node, locale, defaultLocale, slug }) => {
          const basePathByLocale = {
            en: "/projects",
            it: "/progetti"
          };
          return locale === defaultLocale
            ? path.join("/", basePathByLocale[locale], slug)
            : path.join("/", locale, basePathByLocale[locale], slug);
        }
      }
    },
    {
      resolve: "gatsby-plugin-markdown-locales",
      options: {
        name: "pages",
        defaultLocale: generalSettings.defaultLanguage,
        getPath: ({ node, locale, defaultLocale, slug }) => {
          const currentLocale = node.frontmatter.locales.find(
            loc => loc.language === locale
          );
          return locale === defaultLocale
            ? path.join("/", currentLocale.handle || slug)
            : path.join("/", locale, currentLocale.handle || slug);
        }
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-plugin-netlify-markdown-paths",
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
      resolve: "gatsby-source-iubenda",
      options: {
        documentIds: ["84397204", "57888804"]
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
