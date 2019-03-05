import React from "react";
import { graphql } from "gatsby";
import { Text, Flex } from "rebass";

import Page404 from "../pages/404";
import Layout from "../components/layout";
import DernierePiaf from "../components/Indicateurs/DernierePiaf";
import ProchainePiaf from "../components/Indicateurs/ProchainePiaf";
import RecapGlobal from "../components/Indicateurs/RecapGlobal";
import Barcode from "../ui/Barcode";

export default ({ data }) => {
  if (!data.allChouettos || !data.allGoogleSheetSuiviRow) return <Page404 />;

  const chouettos = data.allChouettos.edges[0].node;
  const piaf = data.allGoogleSheetSuiviRow.edges[0].node;

  return (
    <Layout
      title={`Bonjour ${
        chouettos.firstname
      } ${chouettos.lastname.toUpperCase()},`}
    >
      <Text as="p">
        <strong>Voici un récapitulatif de votre participation.</strong> Vous
        pouvez retrouver ces informations depuis l’espace membres (rubrique «
        Mon Compte »),
      </Text>

      <Text>
        <Barcode textAlign="center" mb={2}>
          {chouettos.barcode}
        </Barcode>
      </Text>

      <Flex flexWrap="wrap" justifyContent="space-between" my={4}>
        <DernierePiaf
          date={piaf.derniertafeffectue}
          nbSemaines={piaf.nbsemdepuisderniertaf}
          width={1 / 2}
          py={5}
        />
        <ProchainePiaf date={piaf.prochaintaf} width={1 / 2} py={5} />
      </Flex>

      <RecapGlobal
        nbPiafAttendues={piaf.nbtafattendus}
        nbPiafDepuis2017={piaf.nbtafeffectuesdepuisle2017}
        nbPiafDepuis2018={piaf.nbtafeffectuesdepuisle2018}
        mail={chouettos.mail}
        width={1}
        py={5}
      />
    </Layout>
  );
};

export const query = graphql`
  query($barcode: String!, $mail: String!) {
    allChouettos(filter: { barcode: { eq: $barcode } }) {
      edges {
        node {
          mail
          barcode
          lastname
          firstname
        }
      }
    }

    allGoogleSheetSuiviRow(filter: { mail: { eq: $mail } }) {
      edges {
        node {
          nom
          prenom
          mail
          nbtafok

          derniertafeffectue
          nbsemdepuisderniertaf
          prochaintaf

          nbtafeffectuesdepuisle2017
          nbtafeffectuesdepuisle2018
          nbtafattendus
        }
      }
    }
  }
`;
