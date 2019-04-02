import React from "react";
import { Text } from "rebass";
import Container from "./Container";
import max from "date-fns/max";
import format from "date-fns/format";

const makeDateFromFrench = french => {
  const [d, m, Y] = french.split("/");
  return new Date(+Y, m - 1, +d);
};

const RecapGlobal = ({
  ok,
  dateAdhesion,
  nbPiafDepuis2018,
  nbPiafAttendues,
  mail,
  ...props
}) => {
  const dateDebutComptage = max(
    makeDateFromFrench(dateAdhesion),
    makeDateFromFrench("01/09/2018")
  );

  return (
    <Container
      {...props}
      helpTo="/recap-global"
      width={1}
      py={5}
      color="white"
      bg={ok === "OK" ? "green" : "red"}
      textAlign="center"
    >
      <Text fontSize={8}>
        {nbPiafDepuis2018} / {nbPiafAttendues}
      </Text>
      <Text>
        {nbPiafDepuis2018} PIAF effectuées et {nbPiafAttendues} PIAF attendues
      </Text>
      <Text mt={4} fontSize={4}>{`depuis le ${format(
        dateDebutComptage,
        "DD.MM.YYYY"
      )}`}</Text>

      <Text fontSize={1}>
        Informations recoupées d’après votre adresse email : {mail}
      </Text>
    </Container>
  );
};

export default RecapGlobal;
