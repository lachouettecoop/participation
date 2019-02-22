import React from "react";
import { Text, Button } from "rebass";

const SubmitButton = ({ children, error }) => (
  <Text>
    {error && (
      <Text bg="red" color="white" width={[1, 2 / 3]} p={3} mt={2}>
        {error}
      </Text>
    )}
    <Button variant="primary" type="submit" mt={2} mx="auto">
      {children}
    </Button>
  </Text>
);

export default SubmitButton;
