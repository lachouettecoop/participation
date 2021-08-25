import type { PIAF } from "src/types/model"

import { ListItem, ListItemText } from "@material-ui/core"

import { formatDate, formatTime } from "src/helpers/date"

interface Props {
  piaf: PIAF
}

const UpcomingPiaf = ({ piaf }: Props) => {
  const start = piaf.creneau.debut
  const end = piaf.creneau.fin
  const title = piaf.creneau.titre

  return (
    <ListItem disableGutters>
      <ListItemText primary={`${formatDate(start)} de ${formatTime(start)} à ${formatTime(end)}`} secondary={title} />
    </ListItem>
  )
}

export default UpcomingPiaf
