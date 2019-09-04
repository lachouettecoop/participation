require("dotenv").config({
  path: `.env`
});

const googleSheetsCredentials = {
  type: process.env.GOOGLE_SHEETS_TYPE,
  project_id: process.env.GOOGLE_SHEETS_PROJECT_ID,
  private_key_id: process.env.GOOGLE_SHEETS_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY,
  client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_SHEETS_CLIENT_ID,
  auth_uri: process.env.GOOGLE_SHEETS_AUTH_URI,
  token_uri: process.env.GOOGLE_SHEETS_TOKEN_URI,
  auth_provider_x509_cert_url:
    process.env.GOOGLE_SHEETS_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.GOOGLE_SHEETS_CLIENT_X509_CERT_URL
};

module.exports = {
  siteMetadata: {
    title: `Chouette PIAF`,
    description: `Le suivi de la PIAF`,
    author: `@lachouettecoop`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: "gatsby-mdx",
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/mdx-layout.js")
        }
      }
    },
    {
      resolve: `gatsby-plugin-styled-components`
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Cabin", "Montserrat", "Libre Barcode 128 Text"]
        }
      }
    },
    {
      resolve: `gatsby-source-ldap`
    },
    {
      resolve: `gatsby-source-cooperateurs-csv`
    },
    {
      resolve: "gatsby-source-google-sheets-raw",
      options: {
        spreadsheetId: "1ZdhAb-EOV9FdMEgpEaIcRuWcRMtj3fRQi9xRHKnxhzo",
        worksheetTitle: "Suivi",
        credentials: googleSheetsCredentials,
        autoCast: false
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `chouette-participation`,
        short_name: `lccparticipation`,
        start_url: `/`,
        background_color: `#445448`,
        theme_color: `#445448`,
        display: `minimal-ui`,
        icon: `src/ui/Logo/logo.jpg` // This path is relative to the root of the site.
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    "gatsby-plugin-offline"
  ]
};
