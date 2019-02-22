import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";

import LCCTheme from "../LCCTheme";
import PageHead from "../ui/PageHead";
import Container from "../ui/Container";
import Seo from "./seo";

import "./layout.css";

const Layout = ({ children, title }) => (
  <LCCTheme>
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <Seo title={title} />
          <PageHead title={title || data.site.siteMetadata.title} />
          <Container>
            <main>{children}</main>
          </Container>
        </>
      )}
    />
  </LCCTheme>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
