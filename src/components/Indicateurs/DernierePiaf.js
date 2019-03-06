import React from "react";
import { Text } from "rebass";
import Container from "./Container";

const AucunePiaf = props => (
  <Container {...props} color="primary" bg="greyblue">
    <Text fontSize={4}>Pas encore de PIAF effectuées</Text>
  </Container>
);

const DernierePiaf = ({ nbSemaines, date, ...props }) => {
  const ok = nbSemaines <= 4;
  const commonProps = {
    ...props,
    textAlign: "center",
    helpTo: "/derniere-piaf"
  };

  if (ok && date === "-") {
    return <AucunePiaf {...commonProps} />;
  }
  return (
    <Container {...commonProps} color="white" bg={ok ? "green" : "orange"}>
      <Text fontSize={8}>{nbSemaines}</Text>
      <Text>semaines depuis la dernière PIAF</Text>
      <Text fontSize={4}>{`(${date})`}</Text>
    </Container>
  );
};

export default DernierePiaf;
