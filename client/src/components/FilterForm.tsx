import { useState } from "react";
import { Button, HStack, Input, Select, Text, VStack } from "@chakra-ui/react";
import { MultiSelect, Option } from "chakra-multiselect";

export const options: Option[] = [
  {
    value: "KAHOOT",
    label: "KAHOOT",
  },
  {
    value: "JOT DREAM",
    label: "JOT DREAM",
  },
  {
    value: "SURVEY MONKEY",
    label: "SURVEY MONKEY",
  },
];

export const FilterForm = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  return (
    <HStack alignItems="end">
      <VStack>
        <Text>Start Time</Text>
        <Input type="datetime-local" onChange={(e) => {}}></Input>
      </VStack>
      <VStack>
        <Text>End Time</Text>
        <Input type="datetime-local" onChange={(e) => {}}></Input>
      </VStack>
      <VStack>
        <Text>Choose Projects</Text>
        <MultiSelect
          options={options}
          value={selectedItems}
          onChange={(e) => setSelectedItems(e as string[])}
          maxWidth={400}
        />
      </VStack>
      <Button variant="solid" onClick={() => {}}>
        Filter
      </Button>
      <VStack>
        <Text>Frequency</Text>
        <Select placeholder="Select Frequency" onChange={(e) => {}}>
          <option value="weekly">Weekly</option>
          <option value="bi-weekly">Bi Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="bi-monthly">Bi Monthly</option>
        </Select>
      </VStack>
    </HStack>
  );
};

export default FilterForm;
