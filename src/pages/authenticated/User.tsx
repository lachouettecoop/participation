import type { User } from "src/types/model"

import styled from "@emotion/styled/macro"
import { Box, Grid, Typography } from "@material-ui/core"
import { useQuery } from "@apollo/client"
import { useParams } from "react-router"

import { USER_BY_CODE } from "src/queries"
import { ErrorMessage } from "src/helpers/errors"
import BackButton from "src/components/BackButton"
import Loading from "src/components/Loading"
import ActivePiafs from "src/components/ActivePiafs"
import UpcomingPiafs from "src/components/UpcomingPiafs"

// TODO: use constants
// https://github.com/lachouettecoop/chouette-admin-chouettos/blob/master/src/Controller/PlanningController.php#L99-L105
const COLORS: Record<string, string> = {
  "très chouette": "#2ECC40",
  chouette: "#FF851B",
  "chouette en alerte": "#FF4136",
}

const StatusText = styled(Typography)<{ $status: string }>`
  color: ${({ $status }) => COLORS[$status]};
  &::first-letter {
    text-transform: uppercase;
  }
`
const Status = styled(Grid)`
  h3 {
    span {
      font-size: 0.5em;
    }
  }
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
    return <Loading />
  }

  if (error) {
    return <ErrorMessage error={error} />
  }

  if (!data || !data.users.length) {
    return null
  }

  const { enabled, id, prenom, nom, statut, nbPiafEffectuees, nbPiafAttendues } = data.users[0]

  return (
    <>
      <BackButton />
      <Box my={4}>
        <Typography variant="h2" align="center">
          {prenom} {nom}
        </Typography>
      </Box>
      {enabled ? (
        <Grid container spacing={2}>
          <Status item xs={12} md={6}>
            <Typography variant="h2">Votre statut</Typography>
            <StatusText variant="h3" $status={statut}>
              {statut}
            </StatusText>
            <Typography variant="h3">
              {nbPiafEffectuees}/{nbPiafAttendues} <span>PIAFs attendues</span>
            </Typography>
          </Status>
          <Grid item xs={12} md={6}>
            <ActivePiafs userId={id} />
            <UpcomingPiafs userId={id} />
          </Grid>
        </Grid>
      ) : (
        <Typography align="center">Utilisateur non activé</Typography>
      )}
    </>
  )
}

export default UserPage
