import { useEffect, useState } from "react";
import { VStack } from "@chakra-ui/react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";

import { FilterForm, TracksTable } from "./components";

import { getAllTracks } from "./services/tracks.service";

import { TableData } from "./types";

const preFetch = (() => getAllTracks())();

const initialTableData: TableData = { columns: [], data: [] };

function App() {
  const [table, setTable] = useState<TableData>(initialTableData);

  const { getHeaderGroups, getRowModel } = useReactTable({
    columns: table.columns,
    data: table.data,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    preFetch.then((data) => console.log(data));
  }, []);

  return (
    <VStack mt={10}>
      <FilterForm />
      <TracksTable
        getHeaderGroups={getHeaderGroups}
        getRowModel={getRowModel}
      />
    </VStack>
  );
}

export default App;
