import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Layout from "../components/layout";
import BrowseByBarcode from "../components/BrowseByBarcode";
import BrowseByName from "../components/BrowseByName";

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    {
      allChouettos(
        filter: { barcode: { ne: null } }
        sort: { fields: [lastname], order: ASC }
      ) {
        edges {
          node {
            barcode
            firstname
            lastname
          }
        }
      }
    }
  `);

  return (
    <Layout title="Contrôle de la Participation">
      <BrowseByBarcode />
      <BrowseByName chouettos={data.allChouettos.edges} />
    </Layout>
  );
};

export default IndexPage;
