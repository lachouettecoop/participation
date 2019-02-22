/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allChouettos(filter: { barcode: { ne: null } }) {
          edges {
            node {
              barcode
              mail
            }
          }
        }
      }
    `).then(result => {
      result.data.allChouettos.edges.forEach(({ node }) => {
        createPage({
          path: `chouettos/${node.barcode}`,
          component: path.resolve(`./src/templates/chouettos.js`),
          context: { barcode: node.barcode, mail: node.mail }
        });
      });
      resolve();
    });
  });
};
