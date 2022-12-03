import { VStack } from "@chakra-ui/react";

import { FilterForm } from "./components";

function App() {
  return (
    <VStack mt={10}>
      <FilterForm />
      <div>table goes here</div>
    </VStack>
  );
}

export default App;
