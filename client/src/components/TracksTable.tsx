import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

import { flexRender, HeaderGroup, RowModel } from "@tanstack/react-table";

export type TrackingTableProps = {
  getHeaderGroups?: () => HeaderGroup<any>[];
  getRowModel?: () => RowModel<any>;
};

const TracksTable: React.FC<TrackingTableProps> = ({
  getHeaderGroups,
  getRowModel,
}) => (
  <Table variant="simple">
    <Thead>
      {getHeaderGroups?.().map((headerGroup) => (
        <Tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <Th key={header.id} colSpan={header.colSpan}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </Th>
          ))}
        </Tr>
      ))}
    </Thead>
    <Tbody>
      {getRowModel?.().rows.map((row) => (
        <Tr key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <Td key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </Td>
          ))}
        </Tr>
      ))}
    </Tbody>
  </Table>
);

export default TracksTable;
