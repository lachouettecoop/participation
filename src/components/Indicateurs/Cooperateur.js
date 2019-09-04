import React from "react";
import { Text } from "rebass";
import Container from "./Container";
import format from "date-fns/format";

const makeDateFromFrench = french => {
  const [d, m, Y] = french.split("/");
  return new Date(+Y, m - 1, +d);
};

const Cooperateur = ({ subscribedOn, ...props }) => {
  return (
    <Container
      {...props}
      helpTo="/cooperateur"
      width={1}
      py={2}
      color="white"
      bg={subscribedOn ? "green" : "orange"}
      textAlign="center"
    >
      <Text fontSize={4}>
        {subscribedOn
          ? "Coopérat·eur·rice"
          : "Pensez à souscrire aux parts sociales !"}
      </Text>
      {subscribedOn && (
        <Text fontSize={2}>{`depuis le ${format(
          makeDateFromFrench(subscribedOn),
          "DD.MM.YYYY"
        )}`}</Text>
      )}

      <Text fontSize={1} mt={2}>
        Information recoupée d’après votre adresse email
      </Text>
    </Container>
  );
};

export default Cooperateur;
