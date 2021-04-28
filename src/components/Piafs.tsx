import type { PIAF } from "src/types/model"

import { useQuery } from "@apollo/client"
import { Typography } from "@material-ui/core"
import { addDays } from "date-fns"

import { PIAFS } from "src/queries"
import { ErrorMessage } from "src/helpers/errors"
import { queryDate } from "src/helpers/date"
import Piaf from "src/components/Piaf"
import Loading from "src/components/Loading"

interface Results {
  piafs: PIAF[]
}

interface Props {
  userId: string
}

const Piafs = ({ userId }: Props) => {
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

  return (
    <div>
      <Typography variant="h2">Vous êtes ici pour faire votre PIAF ?</Typography>
      <p>Si oui, cliquez dessus pour valider votre présence :</p>
      {data.piafs.map((piaf) => (
        <Piaf piaf={piaf} key={piaf.id} />
      ))}
    </div>
  )
}

export default Piafs
