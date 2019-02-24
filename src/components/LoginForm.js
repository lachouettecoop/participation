import React, { useState } from "react";
import { FaArrowCircleRight, FaAt, FaKey } from "react-icons/fa";
import { Text } from "rebass";
import FormGroup from "../ui/FormGroup";
import IconButton from "../ui/IconButton";

const LoginForm = ({ children, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      {children}
      <FormGroup htmlFor="email" label="Email">
        <>
          <Text mr={2} as="span">
            <FaAt />
          </Text>
          <input
            name="email"
            type="email"
            placeholder="jean.tibou@exemple.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </>
      </FormGroup>
      <FormGroup htmlFor="password" label="Mot de passe">
        <>
          <Text mr={2} as="span">
            <FaKey />
          </Text>
          <input
            name="password"
            type="password"
            placeholder="secret"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </>
      </FormGroup>
      <IconButton icon={FaArrowCircleRight} variant="primary" type="submit">
        Se connecter
      </IconButton>
    </form>
  );
};

export default LoginForm;
