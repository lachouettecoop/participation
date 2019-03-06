import React from "react";
import { Text } from "rebass";
import Container from "./Container";

const RecapGlobal = ({
  nbPiafDepuis2017,
  nbPiafDepuis2018,
  nbPiafAttendues,
  mail,
  ...props
}) => {
  return (
    <Container
      {...props}
      helpTo="/recap-global"
      width={1}
      py={5}
      color="white"
      bg="primary"
      textAlign="center"
    >
      <Text fontSize={8}>
        {nbPiafDepuis2017} / {nbPiafAttendues}
      </Text>
      <Text>
        {nbPiafDepuis2017} PIAF effectuées et {nbPiafAttendues} PIAF attendues
        (depuis le 06/10/2017)
      </Text>
      <Text
        mt={4}
        fontSize={4}
      >{`dont ${nbPiafDepuis2018} depuis le 01/09/2018`}</Text>

      <Text fontSize={1}>
        Informations recoupées d’après votre adresse email : {mail}
      </Text>
    </Container>
  );
};

export default RecapGlobal;
