import React from "react";
import { Text } from "rebass";

const ImportantText = ({ children, ...props }) => (
  <Text
    as="p"
    pl={2}
    py={2}
    css={{
      borderLeft: `3px solid #ba7c40` // TODO Use the design token for darkbrown color
    }}
    {...props}
  >
    {children}
  </Text>
);

export default ImportantText;
