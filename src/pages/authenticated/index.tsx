import { Redirect, Route, Switch, useLocation } from "react-router-dom"
import { Button } from "@material-ui/core"
import styled from "@emotion/styled/macro"

import HomePage from "src/pages/authenticated/Home"
import { getParams } from "src/helpers/request"
import { useUser } from "src/providers/user"

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
    <>
      <LogoutButton onClick={logout}>Déconnexion</LogoutButton>
      <Switch>
        <Route path="/home">
          <HomePage />
        </Route>
        <Redirect to={next || "/home"} />
      </Switch>
    </>
  )
}

export default Authenticated
