import React from "react";
import { Text } from "rebass";

const DernierePiaf = ({ nbSemaines, date, ...props }) => {
  return (
    <Text
      {...props}
      color="white"
      bg={nbSemaines <= 4 ? "green" : "orange"}
      textAlign="center"
    >
      <Text fontSize={8}>{nbSemaines}</Text>
      <Text>semaines depuis la dernière PIAF</Text>
      <Text fontSize={4}>{`(${date})`}</Text>
    </Text>
  );
};

export default DernierePiaf;
