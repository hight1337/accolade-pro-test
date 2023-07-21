import React from "react";
// ui-components
import { Container } from "@chakra-ui/react";
// components
import AppHeader from "./components/AppHeader";
import LiftsList from "./components/LiftsList";

function App() {
  return (
    <Container maxW="container.xl" maxWidth="1200" margin="0 auto">
      <AppHeader />
      <LiftsList />
    </Container>
  );
}

export default App;
