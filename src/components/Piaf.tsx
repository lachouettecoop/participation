import type { PIAF } from "src/types/model"

import { useState } from "react"
import { Box, Button } from "@material-ui/core"
import { Check } from "@material-ui/icons"

import apollo from "src/helpers/apollo"
import { FILL } from "src/queries"
import { handleError } from "src/helpers/errors"
import { formatTime } from "src/helpers/date"

interface Props {
  piaf: PIAF
}

const Piaf = ({ piaf }: Props) => {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    try {
      await apollo.mutate({ mutation: FILL, variables: { id: piaf.id } })
    } catch (error) {
      handleError(error)
    }
    setLoading(false)
  }

  return (
    <Box marginY={2}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleClick}
        disabled={piaf.pourvu || loading}
        endIcon={piaf.pourvu ? <Check /> : null}
      >
        {formatTime(piaf.creneau.debut)}—{formatTime(piaf.creneau.fin)} : {piaf.creneau.titre}
      </Button>
    </Box>
  )
}

export default Piaf
