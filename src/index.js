import './index.css';
import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useQuery,
} from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import App from './App';
import reportWebVitals from './reportWebVitals';

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query GetRates {
        rates(currency: "USD") {
          currency
          name
        }
      }
    `,
  })
  .then((result) => console.log(result));

// Fetch data with useQuery
const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "AUD") {
      currency
      rate
      name
    }
  }
`;

function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.rates.map(({ currency, rate, name }) => (
    <div key={currency}>
      <p>
        {name}
        <br />
        {currency}: {rate}
      </p>
    </div>
  ));
}

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ExchangeRates />
    </ApolloProvider>
    ,
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
