import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Button, Card, Flex, Text } from "rebass";
import FormGroup from "../ui/FormGroup";

const Success = () => (
  <Card bg="primary" color="white" p={4} my={4}>
    <Flex alignContent="center">
      <Text fontSize={6} mr={4}>
        <FaCheckCircle />
      </Text>
      <Text>
        Votre message a bien été envoyé au BdM. Merci de nous avoir remonté
        cette information, nous allons faire de notre mieux pour y apporter une
        solution.
      </Text>
    </Flex>
  </Card>
);

const Error = ({ children }) => (
  <Card bg="maroon" color="white" p={4} my={4}>
    <Flex alignContent="center">
      <Text fontSize={6} mr={4}>
        <FaTimesCircle />
      </Text>
      <Text>
        Une erreur est survenue lors de l’envoi du message. Veuillez réessayer
        et si le problème persiste contactez nous autrement en remontant ce
        problème également !
        <br />
        Voici le message d’erreur : {children}
      </Text>
    </Flex>
  </Card>
);

const Contact = () => {
  const [subject, setSubject] = useState("");
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");

  const [formState, setFormState] = useState({ state: "ready", message: "" });
  const canBeSent = subject && author && message;

  const handleSubmit = e => {
    e.preventDefault();

    const data = new FormData()
    data.append("Module ", "Participation")
    data.append("Objet ", subject)
    data.append("Auteur·e ", author)
    data.append("Origine ", window.location.toString())
    data.append("Message ", message)

    setFormState({ state: "loading", message: "" });

    fetch(process.env.GATSBY_CONTACT_FORM_ACTION, {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    }).then(() => {
      setFormState({ state: "success", message: "" })
    }).catch((error) => {
      setFormState({ state: "error", message: error.message })
    })
  };

  if (formState.state === "success") {
    return <Success />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      css={
        formState.state === "loading"
          ? // https://stackoverflow.com/a/22608493
            `pointer-events: none; opacity: 0.5;`
          : ""
      }
    >
      {formState.state === "error" && <Error>{formState.message}</Error>}
      <FormGroup htmlFor="subject" label="Sujet">
        <input
          name="subject"
          type="text"
          placeholder="Nombre de PIAF incorrect pour Jean TIBOU"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          size={40}
        />
      </FormGroup>
      <FormGroup
        htmlFor="author"
        label="Envoyé par"
        help="Merci de nous dire qui vous êtes au cas où nous ayons plus de questions."
        secondaryColor="primary"
      >
        <input
          name="author"
          type="text"
          placeholder="Lalie Corne"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
      </FormGroup>
      <FormGroup
        htmlFor="message"
        label="Votre message"
        help={`Veuillez expliquer le problème ici, afin que le BdM ait
          suffisamment d’informations pour pouvoir le corriger.
          Un lien vers cette page sera automatiquement inclus dans le message,
          de manière à permettre d’accéder à la page posant problème.
        `}
        secondaryColor="primary"
      >
        <textarea
          cols={40}
          rows={10}
          name="message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          css={`
            padding: 0.5em;
          `}
        />
      </FormGroup>
      <Button
        type="submit"
        variant={canBeSent ? "primary" : "disabled"}
        disabled={!canBeSent}
      >
        {formState.state === "loading" ? "Envoi en cours …" : "Envoyer"}
      </Button>
    </form>
  );
};

export default Contact;
