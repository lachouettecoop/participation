import React, { useEffect, useState } from "react";
import { FaExchangeAlt, FaSpinner } from "react-icons/fa";
import { Box, Text } from "rebass";
import IconButton from "../../ui/IconButton";

const Me = ({ zulip, onLogout }) => {
  const [me, setMe] = useState();
  useEffect(() => {
    zulip.users.me.getProfile().then(setMe);
  }, [zulip]);

  return me ? (
    <Box>
      <Text as="span" mr={2}>
        Vous êtes connecté en tant que <strong>{me.full_name}</strong>
      </Text>
      <IconButton onClick={onLogout} bg="darkbrown" icon={FaExchangeAlt}>
        Changer d’utilisateur
      </IconButton>
    </Box>
  ) : (
    <Text>
      <FaSpinner /> Chargement en cours…
    </Text>
  );
};

export default Me;
