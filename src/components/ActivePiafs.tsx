import type { PIAF } from "src/types/model"

import { useQuery } from "@apollo/client"
import { Box, Typography } from "@material-ui/core"
import styled from "@emotion/styled/macro"
import { addDays } from "date-fns"

import { PIAFS } from "src/queries"
import { ErrorMessage } from "src/helpers/errors"
import { queryDate } from "src/helpers/date"
import ActivePiaf from "src/components/ActivePiaf"
import Loading from "src/components/Loading"

interface Results {
  piafs: PIAF[]
}

interface Props {
  userId: string
}

const RedText = styled(Typography)`
  color: red;
`

const ActivePiafs = ({ userId }: Props) => {
  const now = new Date()
  const { loading, error, data } = useQuery<Results>(PIAFS, {
    variables: {
      userId,
      after: queryDate(now),
      before: queryDate(addDays(now, 1)),
    },
  })

  if (loading) {
    return <Loading height={150} />
  }

  if (error) {
    return <ErrorMessage error={error} />
  }

  if (!data || !data.piafs.length) {
    return null
  }

  const activePiafs = data.piafs.filter((p) => p.statut === "occupe")
  if (!activePiafs.length) {
    return null
  }

  return (
    <Box mb={4}>
      <Typography variant="h2">Tu es ici pour faire ta PIAF ?</Typography>
      <p>Si oui, clique dessus pour valider ta présence :</p>
      {activePiafs.map((piaf) => (
        <ActivePiaf piaf={piaf} key={piaf.id} />
      ))}
      <RedText variant="h6">La PIAF sera comptabilisée demain</RedText>
    </Box>
  )
}

export default ActivePiafs
