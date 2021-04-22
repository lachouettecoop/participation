import { BrowserRouter } from "react-router-dom"
import styled from "@emotion/styled/macro"
import { Typography } from "@material-ui/core"

import { useUser } from "src/providers/user"

import Anonymous from "src/pages/anonymous"
import Authenticated from "src/pages/authenticated"
import { DialogProvider } from "src/providers/dialog"

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
