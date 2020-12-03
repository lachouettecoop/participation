import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client"

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API + "/api/graphql",
  credentials: "include",
  cache: new InMemoryCache(),
  ssrMode: !process.browser,
})

export default client
