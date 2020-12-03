import { FormEvent, useState } from "react"
import styled from "styled-components"
import apollo from "helpers/apollo"
import { gql } from "@apollo/client"
import Image from "next/image"

import { post } from "helpers/request"

const Main = styled.main`
  margin: 5vh auto;
  max-width: 800px;
  p {
    line-height: 1.5;
    font-size: 1.5rem;
  }
  code,
  pre {
    background: #fafafa;
    border-radius: 5px;
    padding: 0.75rem;
    font-size: 1.1rem;
    font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New,
      monospace;
  }
`
const Form = styled.form`
  input,
  button {
    margin: 5px;
    padding: 5px;
  }
`

const TEST_QUERY = gql`
  query {
    piafs {
      edges {
        node {
          role {
            libelle
          }
          piaffeur {
            username
          }
          creneau {
            date
            creneauGenerique {
              jour
              frequence
            }
          }
          visible
          remplacement
        }
      }
    }
  }
`

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState()

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const body = new FormData(event.currentTarget)
    setLoading(true)
    try {
      const data = await post("login_api", body)
      setResult(data)
    } catch (error) {
      alert(error)
    }
    setLoading(false)
  }

  const handleTest = async () => {
    setLoading(true)
    try {
      const response = await apollo.query({
        query: TEST_QUERY,
      })
      setResult(response.data)
    } catch (error) {
      alert(error)
    }
    setLoading(false)
  }

  return (
    <Main>
      <Image src="/logo.png" width={200} height={200} />
      <h1>Participation</h1>
      <p>
        <button onClick={handleTest} disabled={loading}>
          Test query GraphQL
        </button>
      </p>
      {result ? (
        <p>Connecté !</p>
      ) : (
        <Form onSubmit={handleLogin}>
          <input name="username" placeholder="E-mail" />
          <input type="password" name="password" placeholder="Mot de passe" />
          <button type="submit" disabled={loading}>
            Se connecter
          </button>
        </Form>
      )}
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </Main>
  )
}
