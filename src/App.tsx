import { BrowserRouter } from "react-router-dom"
import styled from "@emotion/styled/macro"
import { Button, Typography } from "@material-ui/core"

import { DialogProvider } from "src/providers/dialog"
import { useUser } from "src/providers/user"
import Anonymous from "src/pages/anonymous"
import Authenticated from "src/pages/authenticated"
import { Assignment, CalendarToday, Chat, SwapHoriz } from "@material-ui/icons"

import { ReactComponent as Logo } from "src/images/logo_white.svg"
import { useState } from "react"
import Logout from "./components/Logout"

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  svg {
    width: 250px;
    height: 250px;
    margin: -20px 0;
  }
`
const Menu = styled.div`
  display: flex;
  margin-bottom: 10px;
  svg {
    width: 50px;
    height: 50px;
    margin: 0;
  }
`

const MenuItemButton = styled(Button)`
  display: flex;
  align-items: center;
  span {
    flex-direction: column;
  }
`

const IFrame = styled.div`
  position: fixed;
  top: 100px;
  width: 100vw;
  height: calc(100vh - 100px);
  z-index: 100;
`

const App = () => {
  const [iframeSrc, setIframeSrc] = useState({ label: "", url: "" })

  const { auth } = useUser()

  return (
    <BrowserRouter>
      <DialogProvider>
        <Logout iframeSrc={iframeSrc} setIframeSrc={setIframeSrc} />
        <Header>
          <Logo />
          {auth && (
            <Menu>
              <MenuItemButton
                onClick={() => {
                  setIframeSrc({ url: `https://planning.lachouettecoop.fr?random=${Date.now()}`, label: "Planning" })
                }}
              >
                <CalendarToday color="primary" fontSize="small" /> Planning
              </MenuItemButton>
              <MenuItemButton
                onClick={() =>
                  setIframeSrc({
                    url: `https://framaforms.org/inscription-reunions-daccueil-la-chouette-coop-1556050737?random=${Date.now()}`,
                    label: "Réunion d'accueil",
                  })
                }
              >
                <Assignment color="primary" fontSize="small" /> Réunion d&apos;accueil
              </MenuItemButton>
              <MenuItemButton
                onClick={() =>
                  setIframeSrc({
                    url: `https://framaforms.org/inscription-periode-dessai-la-chouette-coop-1675259293?random=${Date.now()}`,
                    label: "Période d'essai",
                  })
                }
              >
                <SwapHoriz color="primary" fontSize="small" /> Période d&apos;essai
              </MenuItemButton>
              <MenuItemButton
                onClick={() =>
                  setIframeSrc({
                    url:
                      "https://docs.google.com/forms/d/e/1FAIpQLSezjphy6KurmbI-2P2-FC9DTXsnGPzO_Om87knU7Ykfd9Sbqw/viewform",
                    label: "Demande Produit",
                  })
                }
              >
                <Chat color="primary" fontSize="small" /> Demande Produit
              </MenuItemButton>
            </Menu>
          )}
          <Typography variant="h1">Participation</Typography>
        </Header>
        {auth ? <Authenticated /> : <Anonymous />}
      </DialogProvider>
      {auth && iframeSrc.url && (
        <IFrame>
          <iframe src={iframeSrc.url} style={{ borderStyle: "none", width: "100%", height: "100%" }} />
        </IFrame>
      )}
    </BrowserRouter>
  )
}

export default App
