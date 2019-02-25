import React from "react";
import { Box, Text } from "rebass";

const OptionalInfo = ({ color }) => (
  <Text as="span" color={color} ml={2}>
    (optionnel)
  </Text>
);

const FormGroup = ({
  htmlFor,
  label,
  help,
  optional,
  children,
  secondaryColor = "darkbrown"
}) => (
  <Box my={3} alignItems="center" justifyContent="space-between">
    <Text>
      <label htmlFor={htmlFor}>
        {label}
        {optional && <OptionalInfo color={secondaryColor} />}
      </label>
      {help && (
        <Text color={secondaryColor} fontSize={1} css={{ fontStyle: "italic" }}>
          {help}
        </Text>
      )}
    </Text>
    <Text mt={2}>{children}</Text>
  </Box>
);

export default FormGroup;
