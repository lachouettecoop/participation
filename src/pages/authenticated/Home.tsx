import { FormEvent } from "react"
import { Container, TextField } from "@material-ui/core"
import { useHistory } from "react-router-dom"

import { useUser } from "src/providers/user"

const HomePage = () => {
  const { auth } = useUser<true>()
  const { push } = useHistory()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { value } = event.currentTarget.elements.namedItem("code") as HTMLInputElement
    push("/user/" + value)
  }

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <p>
          Grand Hibou : {auth.user.prenom} {auth.user.nom}
        </p>
        <TextField name="code" label="Code-barres" fullWidth variant="outlined" margin="normal" autoFocus />
      </form>
    </Container>
  )
}

export default HomePage
