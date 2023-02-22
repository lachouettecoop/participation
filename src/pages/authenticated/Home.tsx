import type { User } from "src/types/model"

import { FormEvent, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { useLazyQuery } from "@apollo/client"
import { Button, Container, TextField, List, ListItem, ListItemText } from "@material-ui/core"

import { useUser } from "src/providers/user"
import { USER_SEARCH } from "src/queries"
import { ErrorMessage } from "src/helpers/errors"
import styled from "@emotion/styled/macro"

const Row = styled.div`
  > div {
    margin-bottom: ${({ theme }) => theme.spacing(1)}px;
  }
  @media (min-width: 470px) {
    display: flex;
    > div {
      flex: 1;
      &:first-of-type {
        margin-right: ${({ theme }) => theme.spacing(1)}px;
      }
    }
  }
`

interface Result {
  users: User[]
}

const HomePage = () => {
  const { auth } = useUser<true>()
  const { push } = useHistory()
  const [search, { loading, error, data }] = useLazyQuery<Result>(USER_SEARCH)

  useEffect(() => {
    //Go to the bottom of the screen to see the search results
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "auto",
    })
  }, [data])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { elements } = event.currentTarget
    const { value: code } = elements.namedItem("code") as HTMLInputElement
    push("/user/" + code)
  }

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { elements } = event.currentTarget
    const { value: lastname } = elements.namedItem("lastname") as HTMLInputElement
    const { value: firstname } = elements.namedItem("firstname") as HTMLInputElement
    if (lastname || firstname) {
      search({ variables: { lastname, firstname } })
    } else {
      alert("Entrez au moins le début du nom ou du prénom.")
    }
  }

  return (
    <Container maxWidth="xs">
      <p>
        Grand Hibou : {auth.user.prenom} {auth.user.nom}
      </p>
      <form onSubmit={handleSubmit}>
        <TextField
          id="codeInput"
          name="code"
          label="Code-barres"
          fullWidth
          variant="outlined"
          margin="normal"
          autoFocus
        />
        <Button type="submit" variant="contained" color="primary" fullWidth size="large">
          Valider
        </Button>
      </form>
      <form onSubmit={handleSearch}>
        <p>Tu peux aussi chercher par nom, mais la ou le chouettos doit présenter sa carte de membre :</p>
        <Row>
          <TextField name="lastname" label="Nom" variant="outlined" fullWidth />
          <TextField name="firstname" label="Prénom" variant="outlined" fullWidth />
        </Row>
        <Button type="submit" variant="contained" color="primary" fullWidth size="large" disabled={loading}>
          Rechercher
        </Button>
        {data && (
          <List>
            {data.users
              .slice()
              .sort((left, right) => (left.nom > right.nom ? 1 : -1))
              .map(({ id, codeBarre, prenom, nom, email }) => (
                <ListItem key={id} button component={Link} to={`/user/${codeBarre}`}>
                  <ListItemText primary={`${prenom} ${nom}`} secondary={email} />
                </ListItem>
              ))}
          </List>
        )}
        {error && <ErrorMessage error={error} />}
      </form>
    </Container>
  )
}

export default HomePage
