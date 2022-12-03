import { VStack } from "@chakra-ui/react";

import { FilterForm, TracksTable } from "./components";

function App() {
  return (
    <VStack mt={10}>
      <FilterForm />
      <TracksTable />
    </VStack>
  );
}

export default App;
