import React from "react";
import { graphql } from "gatsby";
import { Text, Flex } from "rebass";

import Layout from "../components/layout";
import Barcode from "../ui/Barcode";
import Page404 from "../pages/404";

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
          2414890133171
        </Barcode>
      </Text>

      <Flex flexWrap="wrap" justifyContent="space-between" my={4}>
        <Text
          width={1 / 2}
          py={5}
          color="white"
          bg={piaf.nbtafok === "OK" ? "green" : "red"}
          textAlign="center"
        >
          <Text fontSize={8}>{piaf.nbsemdepuisderniertaf}</Text>
          <Text>semaines depuis la dernière PIAF</Text>
          <Text fontSize={4}>{`(${piaf.derniertafeffectue})`}</Text>
        </Text>

        <Text
          width={1 / 2}
          py={5}
          color="white"
          bg={piaf.prochaintaf === "-" ? "orange" : "green"}
          textAlign="center"
        >
          <Text fontSize={8}>
            {piaf.prochaintaf.replace(`/${new Date().getFullYear()}`, "")}
          </Text>
          <Text>pour votre prochaine PIAF</Text>
          <Text fontSize={4}>
            {piaf.prochaintaf === "-"
              ? "Pensez à vous inscrire !"
              : "Trop Chouette, merci ;-)"}
          </Text>
        </Text>
      </Flex>
      <Text width={1} py={5} color="white" bg="primary" textAlign="center">
        <Text fontSize={8}>{piaf.nbtafeffectuesdepuisle2017}</Text>
        <Text>PIAF effectuées depuis le 06/10/2017</Text>
        <Text fontSize={4}>{`dont ${
          piaf.nbtafeffectuesdepuisle2018
        } depuis le 01/09/2018`}</Text>

        <Text fontSize={1} mt={4}>
          Informations recoupées d’après votre adresse email : {chouettos.mail}
        </Text>
      </Text>
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
        }
      }
    }
  }
`;
