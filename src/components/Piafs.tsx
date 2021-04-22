import type { PIAF } from "src/types/model"

import { useQuery } from "@apollo/client"
import { CircularProgress } from "@material-ui/core"
import { endOfDay, startOfDay } from "date-fns"

import { PIAFS } from "src/queries"
import { ErrorMessage } from "src/helpers/errors"
import { queryDate } from "src/helpers/date"

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
      after: queryDate(startOfDay(now)),
      before: queryDate(endOfDay(now)),
    },
  })

  if (loading) {
    return <CircularProgress />
  }

  if (error) {
    return <ErrorMessage error={error} />
  }

  if (!data || !data.piafs.length) {
    return null
  }

  return <div>{JSON.stringify(data)}</div>
}

export default Piafs
