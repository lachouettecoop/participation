import type { User } from "src/types/model"

import styled from "@emotion/styled/macro"
import { Box, Grid, Typography, Button } from "@material-ui/core"
import { useQuery } from "@apollo/client"
import { useParams } from "react-router"

import { USER_BY_CODE, USER_UPDATE_STOP_ABSENCE } from "src/queries"
import { ErrorMessage } from "src/helpers/errors"
import BackButton from "src/components/BackButton"
import Loading from "src/components/Loading"
import ActivePiafs from "src/components/ActivePiafs"
import UpcomingPiafs from "src/components/UpcomingPiafs"

import apollo from "src/helpers/apollo"
import { handleError } from "src/helpers/errors"
import { useDialog } from "src/providers/dialog"

// https://style.lachouettecoop.fr/#/couleurs
// TODO: use constants
// https://github.com/lachouettecoop/chouette-admin-chouettos/blob/master/src/Controller/PlanningController.php#L99-L105
const COLORS: Record<string, string> = {
  "très chouette": "#2ECC40",
  chouette: "#FF851B",
  "chouette en alerte": "#FF4136",
}

const MAX_DONE_PIAFS_DISPLAYED = 10

const StatusText = styled(Typography)<{ $status?: string }>`
  color: ${({ $status, theme }) => ($status && COLORS[$status.toLowerCase()]) || theme.palette.secondary.main};
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
const AbsenceText = styled(Typography)`
  color: red;
`

interface Params {
  code: string
}

interface Results {
  users: User[]
}

const UserPage = () => {
  const { code } = useParams<Params>()
  const { openQuestion } = useDialog()

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

  const {
    enabled,
    id,
    prenom,
    nom,
    statut,
    nbPiafEffectuees,
    nbPiafAttendues,
    absenceLongueDureeSansCourses,
  } = data.users[0]

  const done = nbPiafEffectuees > MAX_DONE_PIAFS_DISPLAYED ? `+${MAX_DONE_PIAFS_DISPLAYED}` : nbPiafEffectuees

  const handleClick = async () => {
    const ok = await openQuestion(
      "Tu souhaites revenir faire tes PIAF et tes courses ? Super ! Confirme-le ici et l'effet sera immédiat. Pense à te rendre sur le planning pour t’inscrire à nouveau sur des créneaux de PIAF."
    )
    if (!ok) {
      return
    }
    try {
      await apollo.mutate({ mutation: USER_UPDATE_STOP_ABSENCE, variables: { id: id } })
    } catch (errorUpdate) {
      handleError(errorUpdate as Error)
    }
  }

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
            {!absenceLongueDureeSansCourses && (
              <>
                <Typography variant="h2">Votre statut</Typography>
                <StatusText variant="h3" $status={statut}>
                  {statut}
                </StatusText>
              </>
            )}
            <Typography variant="h3">
              {done}/{nbPiafAttendues} <span>PIAF attendues</span>
            </Typography>
            <Box>
              {absenceLongueDureeSansCourses && (
                <>
                  <AbsenceText variant="h5">
                    Actuellement en pause de PIAF, pour pouvoir faire des courses, je dois cliquer sur le bouton
                    ci-dessous
                  </AbsenceText>
                  <Button variant="contained" color="primary" size="large" onClick={handleClick}>
                    Je reprends ma participation
                  </Button>
                </>
              )}
            </Box>
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
