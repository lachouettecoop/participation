import React from "react";
import { Link } from "gatsby";
import { FaQuestionCircle } from "react-icons/fa";
import { Text } from "rebass";

const Container = ({ helpTo, children, ...props }) => {
  return (
    <Text
      {...props}
      css={`
        position: relative;
      `}
    >
      <Text
        fontSize={3}
        css={`
          position: absolute;
          top: 5px;
          right: 5px;
          opacity: 0.8;
          z-index: 1001;
          &:hover {
            opacity: 1;
          }
        `}
      >
        <Link
          to={helpTo}
          css={`
            color: white;
          `}
        >
          <FaQuestionCircle />
        </Link>
      </Text>
      {children}
    </Text>
  );
};

export default Container;
