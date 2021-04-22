import { gql } from "@apollo/client"

export const USER_BY_ID = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      enabled
      username
      rolesChouette {
        id
        roleUniqueId
        libelle
      }
      nom
      prenom
      email
      telephone
      actif
      statuts {
        id
        libelle
        actif
        dateDebut
        dateFin
      }
    }
  }
`

export const USER_BY_CODE = gql`
  query($code: String!) {
    users(codeBarre: $code) {
      id
      enabled
      username
      rolesChouette {
        id
        roleUniqueId
        libelle
      }
      nom
      prenom
      email
      telephone
      actif
      statuts {
        id
        libelle
        actif
        dateDebut
        dateFin
      }
    }
  }
`

export const PIAFS = gql`
  query PIAFS($userId: String, $after: String, $before: String, $statut: String) {
    piafs(piaffeur: $userId, creneau_debut: { after: $after, before: $before }, statut: $statut) {
      id
      statut
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
      clientMutationId
    }
  }
`
