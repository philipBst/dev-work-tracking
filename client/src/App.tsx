import { VStack } from "@chakra-ui/react";

import { FilterForm } from "./components";

function App() {
  return (
    <VStack>
      <FilterForm />
      <div>table goes here</div>
    </VStack>
  );
}

export default App;
