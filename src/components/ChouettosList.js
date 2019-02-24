import { Link } from "gatsby";
import React from "react";
import { Box, Flex, Text } from "rebass";

const ChouettosList = ({ chouettos }) => (
  <Flex flexWrap="wrap" mt={4} justifyContent="space-between">
    {chouettos.map(({ node: { barcode, firstname, lastname } }) => (
      <Box my={2} width={1 / 3.2} bg="paleyellow" key={barcode + lastname}>
        <Link to={`/chouettos/${barcode}`}>
          <Text
            p={3}
            textAlign="center"
          >{`${lastname.toUpperCase()} ${firstname}`}</Text>
        </Link>
      </Box>
    ))}
  </Flex>
);

export default ChouettosList;
