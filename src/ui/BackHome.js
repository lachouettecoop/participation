import { navigate } from "gatsby";
import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import IconButton from "./IconButton";

const BackHome = ({ autoRedirect = false }) => {
  const [redirectInS, setRedirectInS] = useState(
    process.env.GATSBY_AUTOREDIRECT_DELAY_IN_S || 30
  );

  useEffect(() => {
    if (!autoRedirect) {
      return;
    }
    if (redirectInS <= 0) {
      navigate("/");
      return;
    }

    const timerID = setInterval(() => setRedirectInS(v => v - 1), 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  }, [redirectInS, autoRedirect]);

  return (
    <IconButton icon={FaHome} variant="secondary">
      Retour à l’accueil {autoRedirect && `(${redirectInS})`}
    </IconButton>
  );
};

export default BackHome;
