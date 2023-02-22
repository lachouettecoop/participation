import styled from "@emotion/styled/macro"
import { useDialog } from "src/providers/dialog"
import Alert from "@material-ui/lab/Alert"
import { Button } from "@material-ui/core"
import { useUser } from "src/providers/user"

import { Home } from "@material-ui/icons"

const LogoutWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
`

const StyledButton = styled(Button)`
  margin: 20px;
`

const AlertAccount = styled(Alert)`
  align-items: center;
`

interface Props {
  iframeSrc: any
  setIframeSrc: any
}

const Logout = ({ iframeSrc, setIframeSrc }: Props) => {
  const { logout, auth } = useUser()
  const { openQuestion } = useDialog()

  const confirmLogout = async () => {
    const ok = await openQuestion("Es-tu sûr·e de vouloir fermer la session ?")
    if (ok) {
      logout()
    }
  }

  if (!auth) {
    return null
  }

  return (
    <LogoutWrapper>
      {
        <StyledButton disabled={!!iframeSrc.label} onClick={confirmLogout}>
          Déconnexion
        </StyledButton>
      }
      {iframeSrc.label && (
        <StyledButton
          startIcon={<Home />}
          variant="contained"
          color="primary"
          onClick={() => {
            setIframeSrc({ label: "", url: "" })
            document.getElementById("codeInput")?.focus()
          }}
        >
          Quitter {iframeSrc.label} et revenir à Participation
        </StyledButton>
      )}
      {window.localStorage.lcc_defaultLogin && window.localStorage.lcc_defaultLogin !== auth?.user.email && (
        <AlertAccount severity="warning">Vous n&apos;êtes pas connecté avec le compte par défaut</AlertAccount>
      )}
    </LogoutWrapper>
  )
}

export default Logout
