import { Redirect, Route, Switch, useLocation } from "react-router-dom"
import { Button, Container } from "@material-ui/core"
import styled from "@emotion/styled/macro"

import { getParams } from "src/helpers/request"
import { useUser } from "src/providers/user"

import HomePage from "src/pages/authenticated/Home"
import UserPage from "src/pages/authenticated/User"

const LogoutButton = styled(Button)`
  position: absolute;
  top: 8px;
  right: 8px;
`

const Authenticated = () => {
  const { search } = useLocation()
  const { next } = getParams(search)
  const { logout } = useUser()

  return (
    <Container>
      <LogoutButton onClick={logout}>Déconnexion</LogoutButton>
      <Switch>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/user/:code">
          <UserPage />
        </Route>
        <Redirect to={next || "/home"} />
      </Switch>
    </Container>
  )
}

export default Authenticated
