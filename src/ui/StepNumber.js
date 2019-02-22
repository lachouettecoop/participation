import React from "react";
import { Text } from "rebass";

const StepNumber = ({ children, variant, ...props }) => (
  <Text
    {...props}
    fontSize={5}
    color={variant === "active" ? "primary" : "palegreen"}
  >
    {children}
  </Text>
);

export default StepNumber;
