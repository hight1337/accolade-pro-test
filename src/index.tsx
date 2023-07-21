import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// store
import { Provider } from "react-redux";
import { store } from "./store";
// apollo
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/client";
// ui-kit
import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <App />
        </Provider>
      </ApolloProvider>
    </ChakraProvider>
  </React.StrictMode>
);
