import type { User } from "src/types/model"

import styled from "@emotion/styled/macro"
import { Box, Grid, Typography, Button } from "@material-ui/core"
import { useQuery } from "@apollo/client"
import { useParams } from "react-router"
import { useState } from "react"

import { USER_BY_CODE, USER_UPDATE_STOP_ABSENCE, USER_SET_AWAITING_PARTICIPATION_GROUP } from "src/queries"
import { ErrorMessage } from "src/helpers/errors"
import BackButton from "src/components/BackButton"
import Loading from "src/components/Loading"
import ActivePiafs from "src/components/ActivePiafs"
import UpcomingPiafs from "src/components/UpcomingPiafs"
import SendEmail from "src/components/SendEmail"

import apollo from "src/helpers/apollo"
import { handleError } from "src/helpers/errors"
import { useDialog } from "src/providers/dialog"
import { MAIL_COMMISSION_PARTICIPATION } from "src/utils/constants"

// https://style.lachouettecoop.fr/#/couleurs
// TODO: use constants
// https://github.com/lachouettecoop/chouette-admin-chouettos/blob/master/src/Controller/PlanningController.php#L99-L105
const COLORS: Record<string, string> = {
  "très chouette": "#2ECC40",
  chouette: "#FF851B",
  "chouette en alerte": "#FF4136",
}

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
  const [openSendEmailDialog, setOpenSendEmailDialog] = useState(false)

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
    attenteCommissionParticipation,
  } = data.users[0]

  const user = data.users[0]

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

  const handleCloseSendEmailDialog = () => {
    setOpenSendEmailDialog(false)
  }

  const handleOpenSendEmailDialog = () => {
    setOpenSendEmailDialog(true)
  }

  const setUserAsAwaitingResult = async () => {
    await apollo.mutate({ mutation: USER_SET_AWAITING_PARTICIPATION_GROUP, variables: { id: id } })
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
                <Typography variant="h2">Je suis</Typography>
                {!attenteCommissionParticipation && (
                  <StatusText variant="h3" $status={statut}>
                    {statut}
                  </StatusText>
                )}
                {attenteCommissionParticipation && (
                  <StatusText variant="h2" $status={statut}>
                    {"en attente de la décision de la commission de participation et je peux faire mes courses"}
                  </StatusText>
                )}
              </>
            )}
            {!attenteCommissionParticipation && (
              <Typography variant="h3">
                {nbPiafEffectuees}/{nbPiafAttendues} <span>PIAF attendues</span>
              </Typography>
            )}
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
            {MAIL_COMMISSION_PARTICIPATION &&
              !user?.attenteCommissionParticipation &&
              user?.statut.toLowerCase() == "chouette en alerte" && (
                <>
                  <Typography>
                    Ce statut t’empêche de faire des courses. Si tu souhaites revenir faire tes courses et PIAF, tu peux
                    saisir la commission participation qui examine les cas particuliers et recherche des solutions. Pour
                    joindre la commission, tu peux cliquer sur le bouton ci-dessous
                  </Typography>
                  <Button variant="contained" color="primary" size="large" onClick={handleOpenSendEmailDialog}>
                    joindre la commission
                  </Button>
                </>
              )}
          </Status>
          <Grid item xs={12} md={6}>
            <ActivePiafs userId={id} />
            <UpcomingPiafs userId={id} />
          </Grid>
          {user && MAIL_COMMISSION_PARTICIPATION && (
            <SendEmail
              show={openSendEmailDialog}
              handleClose={handleCloseSendEmailDialog}
              user={user}
              title="Si tu confirmes ton souhait, la commission recevra un mail et prendra contact avec toi. Ton statut sera mis en attente de la décision de la commission. En attendant, tu pourras faire tes courses."
              dialogContent="Tu peux laisser un commentaire si tu le souhaites."
              emailAddress={MAIL_COMMISSION_PARTICIPATION}
              emailSubject={`Saisie commission participation ${user.prenom} ${user.nom}`}
              callback={setUserAsAwaitingResult}
            />
          )}
        </Grid>
      ) : (
        <Typography align="center">Utilisateur non activé</Typography>
      )}
    </>
  )
}

export default UserPage
