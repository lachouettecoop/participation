import React from "react";
import { Text } from "rebass";

const AucunePiaf = props => (
  <Text {...props} color="primary" bg="greyblue">
    <Text fontSize={4}>Pas encore de PIAF effectuées</Text>
  </Text>
);

const DernierePiaf = ({ nbSemaines, date, ...props }) => {
  const ok = nbSemaines <= 4;
  const commonProps = {
    ...props,
    textAlign: "center"
  };

  if (ok && date === "-") {
    return <AucunePiaf {...commonProps} />;
  }
  return (
    <Text {...commonProps} color="white" bg={ok ? "green" : "orange"}>
      <Text fontSize={8}>{nbSemaines}</Text>
      <Text>semaines depuis la dernière PIAF</Text>
      <Text fontSize={4}>{`(${date})`}</Text>
    </Text>
  );
};

export default DernierePiaf;
