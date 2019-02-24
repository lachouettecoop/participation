import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import { Text } from "rebass";

import LCCTheme from "../LCCTheme";
import PageHead from "../ui/PageHead";
import Container from "../ui/Container";
import Seo from "./seo";
import FeedbackButton from "./FeedbackButton";

import "./layout.css";

const Layout = ({ children, title }) => (
  <LCCTheme>
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            buildTime
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <Seo title={title} />
          <FeedbackButton />
          <PageHead title={title || data.site.siteMetadata.title} />
          <Container>
            <main>{children}</main>
          </Container>
          <Text as="footer" mt={4} p={2} bg="paleyellow" fontSize={0}>
            <Container>
              <em>
                Les informations publiées sur ce site sont celles en date du{" "}
                {new Date(data.site.buildTime).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })}
                .
              </em>
            </Container>
          </Text>
        </>
      )}
    />
  </LCCTheme>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
