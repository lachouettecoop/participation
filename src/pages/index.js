import React from "react";
import { Link, useStaticQuery, graphql, navigate } from "gatsby";
import { Box, Heading, Text, Flex } from "rebass";
import { FaBarcode, FaArrowCircleRight } from "react-icons/fa";

import useFuzzyList from "../hooks/useFuzzyList";
import Layout from "../components/layout";
import FormGroup from "../ui/FormGroup";
import IconButton from "../ui/IconButton";

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

  const barcodeElement = React.useRef(null);
  const handleSubmitBarcode = e => {
    e.preventDefault();
    navigate(`/chouettos/${barcodeElement.current.value}`);
  };

  React.useEffect(() => barcodeElement.current.focus(), [data]);

  const [filteredChouettos, nameFilter, setNameFilter] = useFuzzyList(
    data.allChouettos.edges,
    { keys: ["node.firstname", "node.lastname"] }
  );

  return (
    <Layout title="Contrôle de la Participation">
      <Box>
        <Heading>Rechercher un·e Chouettos</Heading>
        <form onSubmit={handleSubmitBarcode}>
          <FormGroup htmlFor="barcode" label="Numéro de carte">
            <>
              <Text mr={2} fontSize={4} as="span">
                <FaBarcode />
              </Text>
              <input
                name="barcode"
                type="text"
                placeholder="1214890129299"
                size="13"
                ref={barcodeElement}
              />
            </>
          </FormGroup>
          <IconButton icon={FaArrowCircleRight} variant="primary" type="submit">
            Voir
          </IconButton>
        </form>
      </Box>

      <Box my={6}>
        <Heading>Liste nominative</Heading>
        <FormGroup htmlFor="nameFilter" label="Chercher par nom/prénom">
          <input
            name="nameFilter"
            type="text"
            placeholder="Jean TIBOU"
            onChange={e => setNameFilter(e.target.value)}
            value={nameFilter}
          />
        </FormGroup>
        <Flex flexWrap="wrap" mt={4} justifyContent="space-between">
          {filteredChouettos.map(
            ({ node: { barcode, firstname, lastname } }) => (
              <Box
                my={2}
                width={1 / 3.2}
                bg="paleyellow"
                key={barcode + lastname}
              >
                <Link to={`/chouettos/${barcode}`}>
                  <Text
                    p={3}
                    textAlign="center"
                  >{`${lastname.toUpperCase()} ${firstname}`}</Text>
                </Link>
              </Box>
            )
          )}
        </Flex>
      </Box>
    </Layout>
  );
};

export default IndexPage;
