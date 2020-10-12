import React from "react";
import { graphql } from "gatsby";
import { Text, Flex } from "rebass";

import Page404 from "../pages/404";
import Layout from "../components/layout";

import DernierePiaf from "../components/Indicateurs/DernierePiaf";
import ProchainePiaf from "../components/Indicateurs/ProchainePiaf";
import RecapGlobal from "../components/Indicateurs/RecapGlobal";
import FriseCalendrier from "../components/Indicateurs/FriseCalendrier";
import BrowseByBarcode from "../components/BrowseByBarcode";

import Barcode from "../ui/Barcode";

export default ({ data }) => {
  if (!data.allChouettos || !data.allGoogleSheetSuivi2020Row)
    return <Page404 />;

  const chouettos = data.allChouettos.edges[0].node;
  const piaf = data.allGoogleSheetSuivi2020Row.edges[0].node;

  return (
    <Layout
      title={`Bonjour ${
        chouettos.firstname
      } ${chouettos.lastname.toUpperCase()},`}
    >
      <Text as="p">
        <strong>Voici un récapitulatif de votre participation.</strong>
        {/* TEMPORAIREMENT PLUS POSSIBLE
        Vous pouvez retrouver ces informations depuis l’espace membres (rubrique «
        Mon Compte »), */}
      </Text>

      <Text>
        <Barcode textAlign="center" mb={2}>
          {chouettos.barcode}
        </Barcode>
      </Text>

      <Flex flexWrap="wrap" justifyContent="space-between" my={4}>
        <DernierePiaf
          date={piaf.dernierepiafeffectuee}
          nbSemaines={piaf.nbsemdepuisdernierepiaf}
          width={1 / 2}
          py={5}
        />
        <ProchainePiaf date={piaf.prochainepiaf} width={1 / 2} py={5} />
      </Flex>

      {process.env.GATSBY_FEATURE_FRISE_ENABLED && (
        <FriseCalendrier
          dateDerniere={piaf.dernierepiafeffectuee}
          dateProchaine={piaf.prochainepiaf}
          width={1}
          my={4}
        />
      )}

      <RecapGlobal
        ok={piaf.statutpiaf}
        dateAdhesion={piaf.debutdecompte}
        nbPiafAttendues={piaf.nbpiafattendues}
        nbPiafEffectuees={piaf.nbpiafeffectuees}
        mail={chouettos.mail}
        width={1}
        py={5}
      />

      <BrowseByBarcode preventScroll mt={5} />
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

    allGoogleSheetSuivi2020Row(filter: { email: { eq: $mail } }) {
      edges {
        node {
          nom
          prenom
          email

          dernierepiafeffectuee
          nbsemdepuisdernierepiaf
          prochainepiaf

          statutpiaf
          debutdecompte
          nbpiafeffectuees
          nbpiafattendues
        }
      }
    }
  }
`;
