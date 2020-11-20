import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import 'dayjs/locale/es';
import { ConfigProvider } from 'antd';
import esES from 'antd/es/locale/es_ES';

import './index.less';
import GlobalFonts from './Assets/Fonts';
import App from './App';
import theme from './theme';
import * as serviceWorker from './serviceWorker';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BASE_URL || 'https://askme-api-dev.herokuapp.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ConfigProvider locale={esES}>
        <GlobalFonts />
        <ThemeProvider theme={theme}>
          <Router>
            <App />
          </Router>
        </ThemeProvider>
      </ConfigProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
