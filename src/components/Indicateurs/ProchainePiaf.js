import React from "react";
import { Text } from "rebass";
import Container from "./Container";

const ProchainePiaf = ({ date, ...props }) => {
  return (
    <Container
      {...props}
      helpTo="/prochaine-piaf"
      color="white"
      bg={date === "-" ? "orange" : "green"}
      textAlign="center"
    >
      <Text fontSize={8}>
        {date.replace(`/${new Date().getFullYear()}`, "").replace(/\//gi, ".")}
      </Text>
      <Text>pour votre prochaine PIAF</Text>
      <Text fontSize={4}>
        {date === "-" ? "Pensez à vous inscrire !" : "Trop Chouette, merci ;-)"}
      </Text>
    </Container>
  );
};

export default ProchainePiaf;
