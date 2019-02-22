import React from "react";
import { Image } from "rebass";
import src from "./logo.jpg";

const Logo = props => {
  return <Image {...props} src={src} alt="Logo de La Chouette Coop" />;
};

export default Logo;
