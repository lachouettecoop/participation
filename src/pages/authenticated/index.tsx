import { Redirect, Route, Switch, useLocation } from "react-router-dom"
import { Container } from "@material-ui/core"

import { getParams } from "src/helpers/request"

import HomePage from "src/pages/authenticated/Home"
import UserPage from "src/pages/authenticated/User"

const Authenticated = () => {
  const { search } = useLocation()
  const { next } = getParams(search)

  return (
    <Container>
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
