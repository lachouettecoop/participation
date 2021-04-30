import { gql } from "@apollo/client"

export const USER_BY_ID = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      enabled
      rolesChouette {
        id
        roleUniqueId
        libelle
      }
      nom
      prenom
      email
    }
  }
`

export const USER_BY_CODE = gql`
  query($code: String!) {
    users(codeBarre: $code) {
      id
      enabled
      rolesChouette {
        id
        roleUniqueId
        libelle
      }
      nom
      prenom
      email
      telephone
      statut
      nbPiafEffectuees
      nbPiafAttendues
    }
  }
`

export const USER_SEARCH = gql`
  query($lastname: String, $firstname: String) {
    users(nom: $lastname, prenom: $firstname) {
      id
      codeBarre
      enabled
      rolesChouette {
        id
        roleUniqueId
        libelle
      }
      nom
      prenom
      email
    }
  }
`

export const PIAFS = gql`
  query PIAFS($userId: String, $after: String, $before: String, $statut: String) {
    piafs(piaffeur: $userId, creneau_debut: { after: $after, before: $before }, statut: $statut) {
      id
      statut
      pourvu
      creneau {
        id
        titre
        debut
        fin
      }
      piaffeur {
        id
        prenom
        nom
        username
      }
      role {
        id
        roleUniqueId
        libelle
      }
    }
  }
`

export const FILL = gql`
  mutation($id: ID!) {
    updatePiaf(input: { id: $id, pourvu: true }) {
      piaf {
        id
        pourvu
      }
      clientMutationId
    }
  }
`
