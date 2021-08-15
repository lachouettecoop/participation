import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { Button } from "@material-ui/core"
import styled from "@emotion/styled/macro"

const INITIAL_TIMER_SECONDS = 30

const PositionnedButton = styled(Button)`
  position: absolute;
  top: 8px;
  left: 8px;
`

const BackButton = () => {
  const [timer, setTimer] = useState(INITIAL_TIMER_SECONDS)
  const { goBack } = useHistory()

  useEffect(() => {
    if (timer <= 0) {
      goBack()
      return
    }
    const timeout = setTimeout(() => setTimer(timer - 1), 1000)
    return () => {
      clearTimeout(timeout)
    }
  }, [timer, goBack])

  useEffect(() => {
    const onKeyDown = ({ key }: KeyboardEvent) => {
      if (key === "Escape") {
        goBack()
      }
    }
    document.addEventListener("keydown", onKeyDown, false)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
    }
  })

  return <PositionnedButton onClick={goBack}>Retour (Echap – {timer})</PositionnedButton>
}

export default BackButton
