import React from "react";
import { Text } from "rebass";
import Container from "./Container";
import format from "date-fns/format";

const makeDateFromFrench = (french) => {
  const [d, m, Y] = french.split("/");
  return new Date(+Y, m - 1, +d);
};

const RecapGlobal = ({
  ok,
  dateAdhesion,
  nbPiafEffectuees,
  nbPiafAttendues,
  mail,
  ...props
}) => {
  const dateDebutComptage = makeDateFromFrench(dateAdhesion);

  let color = "green";
  if (ok === "Chouette en alerte") color = "red";
  else if (ok === "Chouette") color = "orange";

  return (
    <Container
      {...props}
      helpTo="/recap-global"
      width={1}
      py={5}
      color="white"
      bg={color}
      textAlign="center"
    >
      <Text fontSize={8}>
        {nbPiafEffectuees} / {nbPiafAttendues}
      </Text>
      <Text>
        {nbPiafEffectuees} PIAF effectuées sur {nbPiafAttendues} PIAF attendues
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
