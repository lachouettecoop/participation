import React from "react";
import { FaInfo } from "react-icons/fa";
import { Box, Flex, Heading, Link, Text } from "rebass";
import useZulip from "../hooks/useZulip";
import Container from "../ui/Container";
import LoginForm from "./LoginForm";
import Me from "./Zulip/Me";

const FeedbackModal = () => {
  const ZULIP_URL = "https://lachouettecoop.zulipchat.com/";
  const [zulip, doLogin, doLogout] = useZulip(ZULIP_URL);

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
          <Me zulip={zulip} onLogout={doLogout} />
        ) : (
          <LoginForm onSubmit={doLogin}>
            <Box bg="primary" p={4}>
              <Text as="p">
                Veuillez vous connecter avec vos identifiants{" "}
                <Link href={ZULIP_URL}>Zulip</Link> pour pouvoir remonter une
                information.
              </Text>
              <Flex justifyContent="space-between" alignItems="center">
                <Text textAlign="center" mr={3}>
                  <FaInfo size="2em" />
                </Text>
                <Text>
                  Votre session sera automatiquement fermée lorsque vous
                  fermerez votre navigateur. Pas la peine de penser à vous
                  déconnecter !
                </Text>
              </Flex>
            </Box>
          </LoginForm>
        )}
      </Box>
    </Container>
  );
};

export default FeedbackModal;
