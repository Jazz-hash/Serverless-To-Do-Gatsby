import React from "react"

import fetch from "cross-fetch"
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client"

export const client = new ApolloClient({
  link: {
    uri: "/.netlify/functions/todo",
    fetch,
  },
  cache: new InMemoryCache(),
})

export const WrapRootElement = ({ element }) => {
  return <ApolloProvider client={client}>{element}</ApolloProvider>
}
