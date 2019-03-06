import React from "react";
import { MDXProvider } from "@mdx-js/tag";
import { Heading, Text, Link } from "rebass";
import Layout from "./layout";

const MDXLayout = props => (
  <Layout title={props.pageContext.frontmatter.title}>
    <MDXProvider
      components={{
        h1: props => <Heading {...props} as="h1" my={4} />,
        h2: props => <Heading {...props} as="h2" mt={4} mb={3} />,
        h3: props => <Heading {...props} as="h3" mt={3} mb={2} />,
        li: props => <Text {...props} as="li" />,
        p: props => <Text {...props} as="p" />,
        a: Link
      }}
    >
      {props.children}
    </MDXProvider>
  </Layout>
);

export default MDXLayout;
