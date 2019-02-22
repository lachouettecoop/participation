import React from "react";
import { Heading, Text } from "rebass";

import Layout from "../components/layout";

const NotFoundPage = () => (
  <Layout title="404 : Page introuvable">
    <Heading>OOPS !!!</Heading>
    <Text as="p">
      Chouette qui vole se prend un mur ! On dirait que vous avez essayé
      d’accéder à une page qui n’existe pas.
    </Text>
  </Layout>
);

export default NotFoundPage;
