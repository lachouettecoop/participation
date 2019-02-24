import React, { useRef, useEffect } from "react";
import { navigate } from "gatsby";
import { Box, Heading, Text } from "rebass";

import { FaBarcode, FaArrowCircleRight } from "react-icons/fa";
import IconButton from "../ui/IconButton";
import FormGroup from "../ui/FormGroup";

const BrowseByBarcode = () => {
  const barcodeElement = useRef(null);
  const handleSubmitBarcode = e => {
    e.preventDefault();
    navigate(`/chouettos/${barcodeElement.current.value}`);
  };

  useEffect(() => barcodeElement.current.focus());

  return (
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
  );
};

export default BrowseByBarcode;
