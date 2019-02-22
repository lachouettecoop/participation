const assert = require("assert").strict;
const util = require("util");
const ldap = require("ldapjs");

/**
 * @todo Extract env variables and other things to a config
 */
exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;

  const client = ldap.createClient({
    url: process.env.LDAP_SERVER
  });
  const bind = util.promisify(client.bind.bind(client));
  const search = util.promisify(client.search.bind(client));

  const createChouettos = nodeData => {
    // nodeData: {"dn":"cn=tariq.demmou@example.com,ou=membres,o=lachouettecoop,dc=lachouettecoop,dc=fr","controls":[],"objectClass":["posixAccount","person","mailAccount"],"gidNumber":"1","uid":"2147","uidNumber":"2147","userPassword":"{MD5}9zWZe8lUPzUMHLYWGcNPdQ==","cn":"tariq.demmou@example.com","sn":"Demmou","description":"Tariq","mail":"tariq.demmou@example.com","homeDirectory":"2414890131122"}
    const nodeContent = JSON.stringify(nodeData);

    const nodeMeta = {
      id: createNodeId(`chouettos-${nodeData.uid}`),
      parent: null,
      children: [],
      internal: {
        type: `Chouettos`,
        content: nodeContent,
        contentDigest: createContentDigest(nodeData)
      }
    };

    const node = Object.assign({}, nodeData, nodeMeta);
    createNode(node);
  };

  return bind(process.env.LDAP_USER, process.env.LDAP_PASS)
    .then(() =>
      search("dc=lachouettecoop,dc=fr", {
        scope: "sub"
      })
    )
    .then(
      res =>
        new Promise((resolve, reject) => {
          res.on("searchEntry", entry =>
            createChouettos({
              uid: entry.object.uid,
              mail: entry.object.mail,
              barcode: entry.object.homeDirectory,
              lastname: entry.object.sn,
              firstname: entry.object.description
            })
          );
          res.on("end", () => resolve());
          res.on("error", () => reject());
        })
    );
};
