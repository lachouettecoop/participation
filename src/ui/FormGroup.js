import React from "react";
import { Box, Text } from "rebass";

const OptionalInfo = () => (
  <Text as="span" color="darkbrown" ml={2}>
    (optionnel)
  </Text>
);

const FormGroup = ({ htmlFor, label, help, optional, children }) => (
  <Box my={3} alignItems="center" justifyContent="space-between">
    <Text>
      <label htmlFor={htmlFor}>
        {label}
        {optional && <OptionalInfo />}
      </label>
      {help && (
        <Text color="darkbrown" fontSize={1} css={{ fontStyle: "italic" }}>
          {help}
        </Text>
      )}
    </Text>
    <Text mt={2}>{children}</Text>
  </Box>
);

export default FormGroup;
