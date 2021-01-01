import React from "react";
import { Box, Heading, Text } from "rebass";
import Container from "../ui/Container";
import Contact from "./Contact";

const FeedbackModal = () => {
  return (
    <Container>
      <Box color="primary">
        <Heading mb={4}>Contacter le BdM au sujet de cette page</Heading>
        <Text as="p">
          Vous avez un doute, une question sur une information affichée sur
          cette page ou souhaitez contacter le BdM à ce sujet ?
        </Text>
        <Text as="p">
          Remplissez le formulaire ci-dessous et nous traiterons la demande.
        </Text>

        <hr />
        <Contact />
      </Box>
    </Container>
  );
};

export default FeedbackModal;
