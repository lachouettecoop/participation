import { useEffect } from "react"
import { BrowserRouter } from "react-router-dom"
import styled from "@emotion/styled/macro"
import { Typography } from "@material-ui/core"

import { useUser } from "src/providers/user"
import { DialogProvider } from "src/providers/dialog"

import Anonymous from "src/pages/anonymous"
import Authenticated from "src/pages/authenticated"

import { ReactComponent as Logo } from "src/images/logo_white.svg"

const Header = styled.div`
  text-align: center;
  svg {
    width: 250px;
    height: 250px;
    margin: -20px 0;
  }
`

const App = () => {
  const { auth } = useUser()

  useEffect(() => {
    const ok = window.confirm(`ATTENTION ! Cet outil n'est pas encore officiel !
Il affiche la participation en utilisant les données du nouvel outil planning, qui sera en service à partir du 29 novembre.
Clique sur Annuler pour être redirigé·e vers le planning actuel.`)

    if (!ok) {
      window.location.href = "https://espace-membres.lachouettecoop.fr/page/tafs"
    }
  }, [])

  return (
    <BrowserRouter>
      <Header>
        <Logo />
        <Typography variant="h1">Participation</Typography>
      </Header>
      <DialogProvider>{auth ? <Authenticated /> : <Anonymous />}</DialogProvider>
    </BrowserRouter>
  )
}

export default App
