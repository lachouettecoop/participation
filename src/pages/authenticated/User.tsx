import type { User } from "src/types/model"

import styled from "@emotion/styled/macro"
import { Box, CircularProgress, Grid, Typography } from "@material-ui/core"
import { useQuery } from "@apollo/client"
import { useParams } from "react-router"

import { USER_BY_CODE } from "src/queries"
import { ErrorMessage } from "src/helpers/errors"
import Piafs from "src/components/Piafs"

const Loading = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`

interface Params {
  code: string
}

interface Results {
  users: User[]
}

const UserPage = () => {
  const { code } = useParams<Params>()

  const { loading, error, data } = useQuery<Results>(USER_BY_CODE, { variables: { code } })

  if (loading) {
    return (
      <Loading>
        <CircularProgress />
      </Loading>
    )
  }

  if (error) {
    return <ErrorMessage error={error} />
  }

  if (!data || !data.users.length) {
    return null
  }

  const { enabled, id, prenom, nom, statuts } = data.users[0]

  if (!enabled) {
    return null // we could also show a message
  }

  return (
    <>
      <Box my={4}>
        <Typography variant="h2" align="center">
          {prenom} {nom}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          Votre statut : {statuts.find(({ actif }) => actif)?.libelle}
        </Grid>
        <Grid item xs={12} md={4}>
          14/12
        </Grid>
        <Grid item xs={12} md={4}>
          <Piafs userId={id} />
        </Grid>
      </Grid>
    </>
  )
}

export default UserPage
