import React, { useState } from "react";
import { FaQuestionCircle, FaWindowClose } from "react-icons/fa";
import { Box, Button, Text } from "rebass";
import FeedbackModal from "./FeedbackModal";

const FeedbackButton = () => {
  const [opened, setOpened] = useState(false);
  return (
    <Box
      bg="paleviolet"
      css={`
        transition: all 0.1s ease-in;
        position: fixed;
        z-index: 1001;

        ${opened
          ? `
            height: 100vh;
            width: 100vw;
            top: 0;
            left: 0;
            overflow-y: auto;
          `
          : `
            transform: translateX(44%) rotate(-90deg);
            top: 50%;
            right: -1px;
            opacity: 0.5;
            &:hover {
              opacity: 1;
              transform: translateX(42%) rotate(-90deg);
            }
        `}
      `}
    >
      <Button
        bg="paleviolet"
        color="primary"
        onClick={() => setOpened(!opened)}
        borderRadius={0}
        fontSize={3}
        width={opened ? 1 : "auto"}
        mb={opened ? 4 : "auto"}
        css={{
          boxShadow: "-2px -2px 10px rgba(0, 0, 0, 0.8)"
        }}
      >
        {opened ? (
          <Text textAlign="right" my={2} mr={4}>
            Fermer <FaWindowClose />
          </Text>
        ) : (
          <Text p={1}>
            Une question, un problème 
            <FaQuestionCircle />
          </Text>
        )}
      </Button>
      {opened && <FeedbackModal />}
    </Box>
  );
};

export default FeedbackButton;
