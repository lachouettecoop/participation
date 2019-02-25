import React from "react";
import { FaSpinner } from "react-icons/fa";
import { Box, Heading, Text } from "rebass";
import { useZulipBot } from "../hooks/zulip";
import Container from "../ui/Container";
import SendMessageToStream from "./Zulip/SendMessageToStream";

const FeedbackModal = () => {
  const zulip = useZulipBot(
    process.env.GATSBY_ZULIP_URL,
    process.env.GATSBY_ZULIP_BOT_EMAIL,
    process.env.GATSBY_ZULIP_BOT_APIKEY
  );

  return (
    <Container>
      <Box color="white">
        <Heading mb={4}>Contacter le BdM au sujet de cette page</Heading>
        <Text as="p">
          Vous avez un doute, une question sur une information affichée sur
          cette page ou souhaitez contacter le BdM à ce sujet ?
        </Text>
        <Text as="p">
          Remplissez le formulaire ci-dessous et nous traiterons la demande.
        </Text>

        <hr />
        {zulip ? (
          <SendMessageToStream
            zulip={zulip}
            stream="Grp - Bureau des Membres"
          />
        ) : (
          <Text>
            <FaSpinner /> Chargement en cours…
          </Text>
        )}
      </Box>
    </Container>
  );
};

export default FeedbackModal;
