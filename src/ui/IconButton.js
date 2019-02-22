import React from "react";
import { Flex, Button, Text } from "rebass";

const IconButton = ({ icon: IconComponent, children, ...props }) => (
  <Button {...props}>
    <Flex alignItems="center" as="span">
      <IconComponent />
      <Text as="span" ml={2}>
        {children}
      </Text>
    </Flex>
  </Button>
);

export default IconButton;
