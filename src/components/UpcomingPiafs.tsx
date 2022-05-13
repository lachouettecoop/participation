import type { PIAF } from "src/types/model"

import { useQuery } from "@apollo/client"
import { Typography, List, Box } from "@material-ui/core"
import { addDays } from "date-fns"

import { PIAFS } from "src/queries"
import { ErrorMessage } from "src/helpers/errors"
import { queryDate } from "src/helpers/date"
import UpcomingPiaf from "src/components/UpcomingPiaf"
import Loading from "src/components/Loading"

interface Results {
  piafs: PIAF[]
}

interface Props {
  userId: string
}

const orderPiafsByDate = (left: PIAF, right: PIAF) => (left.creneau.debut > right.creneau.debut ? 1 : -1)

const UpcomingPiafs = ({ userId }: Props) => {
  const now = new Date()
  const { loading, error, data } = useQuery<Results>(PIAFS, {
    variables: {
      userId,
      after: queryDate(addDays(now, 1)),
    },
  })

  if (loading) {
    return <Loading height={150} />
  }

  if (error) {
    return <ErrorMessage error={error} />
  }

  const piafs = data?.piafs.filter(({ statut }) => statut !== "remplacement").sort(orderPiafsByDate)

  return (
    <Box mb={4}>
      <Typography variant="h2">Tes PIAF suivantes</Typography>
      <List>
        {piafs?.length ? (
          piafs.map((piaf) => <UpcomingPiaf piaf={piaf} key={piaf.id} />)
        ) : (
          <p>Aucune PIAF à venir. Inscris-toi sur le planning !</p>
        )}
      </List>
    </Box>
  )
}

export default UpcomingPiafs
