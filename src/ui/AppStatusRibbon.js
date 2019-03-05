import React from "react";
import { Box, Text } from "rebass";

const beforeAfterCss = {
  content: "",
  width: "100%",
  display: "block",
  position: "absolute",
  bottom: "1px",
  top: "auto",
  left: 0,
  height: "1px",
  background: "#fff"
};

const AppStatusRibbon = props => {
  const ribbonSideInPx = 150;
  const textOffsetInPx = 40;

  return (
    <Box
      css={{
        position: "fixed",
        top: 0,
        right: 0,
        width: `${ribbonSideInPx}px`,
        height: `${ribbonSideInPx}px`,
        overflow: "hidden",
        zIndex: 1000
      }}
    >
      <Text
        {...props}
        fontSize={3}
        fontWeight="bold"
        textAlign="center"
        py={1}
        css={{
          textTransform: "uppercase",

          width: `${ribbonSideInPx + textOffsetInPx}px`,
          position: "absolute",
          top: `${textOffsetInPx}px`,
          right: `-${textOffsetInPx}px`,
          transform: "rotate(45deg)",
          boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.8)",

          "::before": beforeAfterCss,
          "::after": beforeAfterCss
        }}
      />
    </Box>
  );
};

export default AppStatusRibbon;
