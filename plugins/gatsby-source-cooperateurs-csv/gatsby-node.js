const CooperateursAPI = require("./CooperateursAPI");

/**
 * @todo Extract env variables and other things to a config
 */
exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;

  const api = new CooperateursAPI(process.env.ANNUAIRE_COOPERATEURS_CSV_URL);

  const createCooperateur = nodeData => {
    const nodeContent = JSON.stringify(nodeData);

    const nodeMeta = {
      id: createNodeId(`cooperateur-${nodeData.email}`),
      parent: null,
      children: [],
      internal: {
        type: `Cooperateur`,
        content: nodeContent,
        contentDigest: createContentDigest(nodeData)
      }
    };

    const node = Object.assign({}, nodeData, nodeMeta);
    createNode(node);
  };

  api.getAll().then(cooperateurs => cooperateurs.map(createCooperateur));
};
