import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { Heading, Box, Text } from "rebass";

import Container from "./Container";
import BackHome from "./BackHome";
import Logo from "../ui/Logo";

import { Match } from "@reach/router";
import { isOpened } from "../components/FeedbackButton";

const PageHead = ({ title, children }) => (
  <Box
    bg="primary"
    color="white"
    py={4}
    mb={4}
    css={{
      borderTop: "5px solid #ba7c40",
      boxShadow: "0 2px 6px 0 hsla(0,0%,0%,0.2)"
    }}
  >
    <Text textAlign="center" mb={4}>
      <Match path="/">
        {({ match: isHomePage }) =>
          isHomePage ? (
            <Logo height={"20vh"} />
          ) : (
            <Link to="/">
              <Logo height={"10vh"} />
              <br />
              <Match path="/chouettos/:id">
                {({ match: isChouettosPage, location }) => (
                  <BackHome
                    autoRedirect={isChouettosPage && !isOpened(location)}
                  />
                )}
              </Match>
            </Link>
          )
        }
      </Match>
    </Text>
    <Container>
      <Heading as="h1">{title}</Heading>
      {children}
    </Container>
  </Box>
);

PageHead.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node
};

export default PageHead;
