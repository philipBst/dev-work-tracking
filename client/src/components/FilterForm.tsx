import { useState } from "react";
import { Button, HStack, Input, Select, Text, VStack } from "@chakra-ui/react";
import { MultiSelect, Option } from "chakra-multiselect";

import { Config, Filter } from "../types";

// this should come from api
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

export type FilterFormProps = {
  config: React.MutableRefObject<Config>;
  onFilter: () => void;
};

export const FilterForm: React.FC<FilterFormProps> = ({ config, onFilter }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const changeSelectedItems = (values: string[]) => {
    config.current.projects = values;
    setSelectedItems(values);
  };

  return (
    <HStack alignItems="end">
      <VStack>
        <Text>Start Time</Text>
        <Input
          type="datetime-local"
          onChange={(e) => (config.current.start_time = e.target.value)}
        ></Input>
      </VStack>
      <VStack>
        <Text>End Time</Text>
        <Input
          type="datetime-local"
          onChange={(e) => (config.current.end_time = e.target.value)}
        ></Input>
      </VStack>
      <VStack>
        <Text>Choose Projects</Text>
        <MultiSelect
          options={options}
          value={selectedItems}
          onChange={(e) => changeSelectedItems(e as string[])}
          maxWidth={400}
        />
      </VStack>
      <Button variant="solid" onClick={onFilter}>
        Filter
      </Button>
      <VStack>
        <Text>Frequency</Text>
        <Select
          placeholder="Select Frequency"
          onChange={(e) => {
            config.current.frequency = e.target.value as Filter;
            onFilter();
          }}
        >
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
