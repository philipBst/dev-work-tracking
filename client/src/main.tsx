import React from "react";
import ReactDOM from "react-dom/client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { MultiSelectTheme } from "chakra-multiselect";

import App from "./App";

import "./index.css";

const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme,
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
