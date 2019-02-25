import { useCallback, useState, useEffect } from "react";
import { useSessionStorage } from "react-use";
import zulip from "zulip-js";

export const useZulipUser = (realm, sessionStorageKey = "zulip-user") => {
  const [user, setUser] = useSessionStorage(sessionStorageKey);
  const [instance, setInstance] = useState(null);
  const doLogin = useCallback((username, password) => {
    setUser({ username, password });
  });
  const doLogout = useCallback(() => {
    setUser(undefined);
  });

  useEffect(() => {
    if (user && user.username && user.password) {
      zulip({
        username: user.username,
        password: user.password,
        realm
      })
        .then(setInstance)
        .catch(e => {
          // TODO: Gérer un message d’erreur en cas d’identifiants incorrects
          console.log("pabon", e);
        });
    } else {
      setInstance(null);
    }
  }, [user]);

  return [instance, doLogin, doLogout];
};

export const useZulipBot = (realm, botUsername, botApiKey) => {
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    zulip({
      username: botUsername,
      apiKey: botApiKey,
      realm
    })
      .then(setInstance)
      .catch(e => {
        // TODO: Gérer un message d’erreur en cas d’identifiants incorrects
        console.log("pabon", e);
      });
  });

  return instance;
};
