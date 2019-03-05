import React from "react";
import { Text } from "rebass";

const RecapGlobal = ({
  ok,
  nbPiafDepuis2017,
  nbPiafDepuis2018,
  nbPiafAttendues,
  mail,
  ...props
}) => {
  return (
    <Text
      {...props}
      width={1}
      py={5}
      color="white"
      bg={ok === "OK" ? "green" : "red"}
      textAlign="center"
    >
      <Text fontSize={8}>
        {nbPiafDepuis2017} / {nbPiafAttendues}
      </Text>
      <Text>PIAF effectuées depuis le 06/10/2017 vs PIAF attendues</Text>
      <Text
        fontSize={4}
      >{`dont ${nbPiafDepuis2018} depuis le 01/09/2018`}</Text>

      <Text fontSize={1} mt={4}>
        Informations recoupées d’après votre adresse email : {mail}
      </Text>
    </Text>
  );
};

export default RecapGlobal;
