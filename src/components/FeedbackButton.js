import React, { useState } from "react";
import { FaQuestionCircle, FaWindowClose } from "react-icons/fa";
import { Box, Button, Text } from "rebass";
import Container from "../ui/Container";

const FeedbackModal = () => (
  <Container>
    <Box>ICI UN FORMULAIRE</Box>
  </Container>
);

const FeedbackButton = () => {
  const [opened, setOpened] = useState(true);
  return (
    <Box
      bg="red"
      css={`
        transition: all 0.1s ease-in;
        position: fixed;
        z-index: 1;

        ${opened
          ? `
            height: 100vh;
            width: 100vw;
            top: 0;
            left: 0;
          `
          : `
            transform: translateX(42%) rotate(-90deg);
            top: 50%;
            right: 0;
            opacity: 0.5;
            &:hover {
              opacity: 1;
              transform: translateX(35%) rotate(-90deg);
            }
        `}
      `}
    >
      <Button
        bg="red"
        color="white"
        onClick={() => setOpened(!opened)}
        borderRadius={0}
        fontSize={3}
        width={opened ? 1 : "auto"}
      >
        {opened ? (
          <Text textAlign="right" my={2} mr={4}>
            Fermer <FaWindowClose />
          </Text>
        ) : (
          <Text p={3}>
            Un problème 
            <FaQuestionCircle />
          </Text>
        )}
      </Button>
      {opened && <FeedbackModal />}
    </Box>
  );
};

export default FeedbackButton;
