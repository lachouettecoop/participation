import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

const link = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API + "/api/graphql",
})

const authLink = setContext((operation, previous) => {
  const token = localStorage.getItem("token")
  if (!token) {
    return previous
  }
  return {
    ...previous,
    headers: {
      ...previous.headers,
      "X-Auth-Token": token,
    },
  }
})

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
  ssrMode: !process.browser,
})

export default client
