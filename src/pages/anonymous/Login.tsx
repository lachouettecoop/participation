import { FormEvent, useState } from "react"
import { Container, TextField, Button } from "@material-ui/core"

import { useUser, LoginResponse } from "src/providers/user"
import { post } from "src/helpers/request"
import { handleError } from "src/helpers/errors"

const LoginPage = () => {
  const [loading, setLoading] = useState(false)

  const { login } = useUser()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const body = new FormData(event.currentTarget)
    setLoading(true)
    try {
      const auth: LoginResponse = await post("login_api", body)
      await login(auth)
    } catch (error) {
      handleError(error as Error)
    }
    setLoading(false)
  }

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <p>Cette application permet de gérer l’accueil du magasin. Il faut être Grand Hibou pour se connecter.</p>
        <TextField
          type="email"
          name="username"
          defaultValue={window.localStorage.lcc_defaultLogin || ""}
          label="E-mail"
          fullWidth
          variant="outlined"
        />
        <TextField
          type="password"
          name="password"
          defaultValue={window.localStorage.lcc_defaultPassword || ""}
          label="Mot de passe"
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <Button type="submit" fullWidth size="large" variant="contained" color="primary" disabled={loading}>
          Connexion
        </Button>
      </form>
    </Container>
  )
}

export default LoginPage
