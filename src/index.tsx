import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import "bulma/css/bulma.css";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import * as ReactDOM from "react-dom";
import App from "./App";

import * as serviceWorker from "./registerServiceWorker";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: process.env.REACT_APP_BACKEND_URI
  })
});
ReactDOM.render(
  <ApolloProvider client={client}>
    <div className={"container"}>
      <App />
    </div>
  </ApolloProvider>,
  document.getElementById("root")
);
serviceWorker.unregister();
