import React from "react";
import { Text } from "rebass";

const ProchainePiaf = ({ date, ...props }) => {
  return (
    <Text
      {...props}
      color="white"
      bg={date === "-" ? "orange" : "green"}
      textAlign="center"
    >
      <Text fontSize={8}>
        {date.replace(`/${new Date().getFullYear()}`, "")}
      </Text>
      <Text>pour votre prochaine PIAF</Text>
      <Text fontSize={4}>
        {date === "-" ? "Pensez à vous inscrire !" : "Trop Chouette, merci ;-)"}
      </Text>
    </Text>
  );
};

export default ProchainePiaf;
