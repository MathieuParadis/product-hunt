import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: "https://api.producthunt.com/v2/api/graphql",
  cache: new InMemoryCache(), 
  headers: {
    authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
  }
})

export default client;
